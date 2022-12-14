import { runSkillCheck } from '@/vm/vm-helpers';
import { getSkillCheckText } from '@/utils/skillchecks';
import { runCommand, runExpression } from '../vm';
import {
  CommandParserFunction,
  CommandParsingContext,
  CommandPlugin,
  CommandRunner,
  generateParser,
} from './command-plugin';
import { Parser } from '@/types/parser';
import {
  AddDialogParams,
  DialogChoice,
  useDialogStore,
} from '@/stores/dialog-store';
import { ParserContext } from '../vm-parser';
import { MachineBlock, useVM } from '@/stores/vm-store';
import { useSkills } from '@/stores/skills';

export const runChoice: CommandRunner<
  ChoiceOptions,
  StaticChoiceOptions
> = async (cmd) => {
  // Hack for us to be able to find that command again on playerAnswered
  const { prompt, choices } = cmd.staticOptions;
  // For each possible choice, we run the choice prompt expression which will return us the info we need to generate the choice options
  const choiceResults = [];
  for (const [, choice] of choices.entries()) {
    const choiceResult = await runExpression<ChoicePromptReturn>(choice.prompt);
    choiceResults.push(choiceResult);
  }
  // Lazy hack to store those results for after the player answers.
  (cmd.options as any).choiceResults = choiceResults;
  // Convert the results into dialog options
  const dialogChoices = choiceResults
    .map((res, index) => {
      let allowed = true;
      if (res.skillCheck) {
        allowed = res.skillCheck?.allowed ?? false;
      }
      const result: DialogChoice = {
        choice: res.text!,
        originalIndex: index,
        allowed,
      };
      return result;
    })
    // Choices that have a null text are options that didn't pass conditions, or hidden skill checks
    .filter((el) => el.choice);
  const res = await runCommand(prompt, dialogChoices);
  return await onChoicePlayerAnswered(cmd, res);
};

export function parseChoiceOption(
  ctx: CommandParsingContext,
  choice: Parser.Line,
): BranchingChoiceInfo {
  if (!choice.branch) {
    ctx.parserContext.error(
      choice.line,
      `Choice option doesn't have any branch to go to (${choice.code} - ${choice.line})`,
    );
  }
  let skillBranches;
  let mainBranch;
  const branch = choice.branch!;
  if (choice.expression[1] === 'roll') {
    if (!branch[0].branch || !branch[1].branch) {
      ctx.parserContext.error(
        choice.line,
        `Choice option with a skill roll needs success and failure branches (${choice.code} - ${choice.line})`,
      );
    }
    skillBranches = {
      success: ctx.processCommandsFunction(
        ctx.parserContext,
        branch[0].branch!,
        choice,
      ),
      failure: ctx.processCommandsFunction(
        ctx.parserContext,
        branch[1].branch!,
        choice,
      ),
    };
  } else {
    mainBranch = ctx.processCommandsFunction(ctx.parserContext, branch, choice);
  }

  const choiceInfo: BranchingChoiceInfo = {
    prompt: ctx.processCommandsFunction(ctx.parserContext, [choice], choice)[0],
    branch: mainBranch,
    skillBranches,
  };
  return choiceInfo;
}

export interface BranchingChoiceInfo {
  prompt: Parser.ParsedExpression;
  branch?: Parser.Branch;
  skillBranches?: {
    success: Parser.Branch;
    failure: Parser.Branch;
  };
}
export interface StaticChoiceOptions {
  choices: BranchingChoiceInfo[];
  prompt: Parser.ParsedExpression;
}

export interface ChoiceOptions {}

export const choiceParser: CommandParserFunction<
  ChoiceOptions,
  StaticChoiceOptions
> = (ctx, parsed) => {
  let newLine = ctx.currentLine;
  generateParser('choice', []);
  const { line } = ctx;
  const command = parsed.command;
  if (!line.branch! || line.branch!.length < 2) {
    ctx.parserContext.error(
      line.line,
      `Choice menu needs to have at least one option`,
    );
  }
  const prompt = line.branch![0];
  if (!prompt) {
    ctx.parserContext.error(ctx.line.line, `Choice prompt is missing `);
  }
  const choices = line.branch!.slice(1);
  const prompts = choices.map((choice, index) => {
    if (!choice.branch) {
      ctx.parserContext.error(
        choice.line,
        `Choice option doesn't have any branch to go to (${choice.code})`,
      );
    }
    choice = getChoiceOptionLineFromChoicePrompt(ctx.parserContext, choice);
    return parseChoiceOption(ctx, choice);
  });
  command.staticOptions = {
    prompt: ctx.processCommandsFunction(ctx.parserContext, [prompt], line)[0],
    choices: prompts,
  };
  newLine++;
  return {
    newLine,
  };
};

export const choicePlugin = CommandPlugin.FromOptions<
  ChoiceOptions,
  StaticChoiceOptions
>({
  keyword: 'choice',
  argTypes: [],
  runner: runChoice,
  parser: choiceParser,
});

const onChoicePlayerAnswered = async (
  command: Parser.Command<ChoiceOptions, StaticChoiceOptions>,
  playerChoice: string | number,
) => {
  const choiceIndex = playerChoice as number;
  // The player has answered, we now need to go to the right branch and perform any needed skill checks
  const vmStore = useVM();
  const { choices } = command.staticOptions;
  const choice = choices[choiceIndex];
  const choicePromptResult = (command.options as any).choiceResults[
    choiceIndex
  ] as ChoicePromptReturn;
  let playerText: string | null = choicePromptResult.text;
  let newBranch: Parser.Branch | undefined;
  if (choicePromptResult.skillCheck) {
    playerText = null;
    const result = runSkillCheck({
      skill: choicePromptResult.skillCheck.skillId,
      value: choicePromptResult.skillCheck.difficulty,
      id: choicePromptResult.skillCheck.skillCheckId,
      hideAfterRoll: choicePromptResult.skillCheck.hideAfterRoll,
      repeatable: choicePromptResult.skillCheck.repeatable,
    });
    if (result.succeeded) {
      newBranch = choice.skillBranches!.success;
    } else {
      newBranch = choice.skillBranches!.failure;
    }
  } else {
    newBranch = choice.branch!;
  }
  if (playerText) {
    // If the choice involves printing a player dialog, show it
    const dialog: AddDialogParams = {
      speaker: 'player',
      text: playerText,
      interactive: false,
    };
    useDialogStore().addDialog(dialog);
  }
  if (newBranch) {
    const newBlock: MachineBlock = {
      currentIndex: 0,
      branchData: {
        branch: newBranch,
      },
    };
    return await vmStore.addAndRunBlock(newBlock);
  }
};

// Turns a choice prompt (Which is normally just text + an optional condition) into a proper choice prompt command so it can be parsed properly
function getChoiceOptionLineFromChoicePrompt(
  ctx: ParserContext,
  choice: Parser.Line,
) {
  const generatedCode = `choicePrompt ${choice.code}`;
  const newLine: Parser.Line = {
    code: generatedCode,
    indentation: choice.indentation,
    line: choice.line,
    branch: choice.branch,
    expression: ['choicePrompt', ...choice.expression],
  };
  return newLine;
}

export interface ChoicePromptOptions {
  promptText: string;
  condition: boolean;
}

export interface ChoicePromptReturnValue {
  text: string | null;
  skillCheck?: {
    allowed: boolean;
    skillId: string;
    skillCheckId: string;
    difficulty: number;
    hideAfterRoll?: boolean;
    repeatable?: boolean;
  };
}
export type ChoicePromptReturn = ChoicePromptReturnValue;
/** Custom "fake" instruction generated on choice prompts to process their optional conditions */
export const choicePromptCommandPlugin = new CommandPlugin<ChoicePromptOptions>(
  'choicePrompt',
  'any',
  // Will return null if the choice prompt should not be used (failed condition or hidden skillcheck). Otherwise, returns the info needed to display the prompt + later run the skillcheck
  async (cmd): Promise<ChoicePromptReturn> => {
    const args = cmd.args;
    if (args[0] === 'roll') {
      const skillCheckId = args[1] as string;
      const skillId = args[2] as string;
      const difficulty = args[3] as number;
      const skillText = args[4] as string;
      let mode: any = false;
      if (args.length > 5) {
        mode = args[5] as string;
      }
      let hideAfterRoll = false;
      let repeatable = false;
      if (mode === 'hideAfterRoll') {
        hideAfterRoll = true;
      }
      if (mode === 'repeatable') {
        repeatable = true;
      }
      const state = useSkills().getSkillCheck(skillCheckId);
      if (state.hidden) {
        return {
          text: null,
        };
      }
      const skillCheckAllowed =
        !state.happened || (state.happened && state.succeeded) || repeatable;
      const { difficultyText } = getSkillCheckText({
        skill: skillId,
        skillCheckId,
        value: difficulty,
      });
      const text = `${difficultyText} ${skillText}`;
      return {
        text,
        skillCheck: {
          allowed: skillCheckAllowed,
          skillId,
          skillCheckId,
          difficulty,
          hideAfterRoll,
          repeatable,
        },
      };
    } else if (args.length > 1 && args[1] === 'if') {
      const text = args[0] as string;
      let condition = true;
      if (args.length > 2) {
        condition = args[2] as boolean;
      }
      if (condition) {
        return {
          text,
        };
      } else {
        return {
          text: null,
        };
      }
    } else {
      return {
        text: args[0] as string,
      };
    }
  },
);
