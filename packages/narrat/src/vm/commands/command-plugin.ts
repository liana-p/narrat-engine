import { Parser } from '../../types/parser';
import { ParserContext } from '../vm-parser';
import { DialogChoice } from '@/stores/dialog-store';
import { isExpression, isVariable } from '../vm-helpers';
import { useVM } from '@/stores/vm-store';

export type CommandRunner<Options, StaticOptions = {}> = (
  cmd: Parser.Command<Options, StaticOptions>,
  choices?: DialogChoice[],
) => Promise<any>;

export type CommandParserFunction<Options, StaticOptions = {}> = (
  ctx: CommandParsingContext,
  command: Parser.ParsedExpression<Options, StaticOptions>,
) => {
  newLine: number;
};
export type ProcessCommandsFunction = (
  ctx: ParserContext,
  lines: Parser.Line[],
  parentLine: Parser.Line | undefined,
) => Parser.Branch;

export interface CommandParsingContext {
  parserContext: ParserContext;
  processCommandsFunction: ProcessCommandsFunction;
  line: Parser.Line;
  lines: Parser.Line[];
  currentLine: number;
}

export type OnPlayerAnswered<Options, StaticOptions> = (
  cmd: Parser.Command<Options, StaticOptions>,
  choice: number | string,
) => Promise<any>;

export interface CommandPluginOptions<Options, StaticOptions = {}> {
  keyword: string;
  argTypes: ArgTypes;
  runner: CommandRunner<Options, StaticOptions>;
  // Automatically generate a simple parser if not provided
  parser?: CommandParserFunction<Options, StaticOptions>;
  // Optional callback for running logic when the player picks an option
  onPlayerAnswered?: OnPlayerAnswered<Options, StaticOptions>;
  // If this is set, the command will end after the player anser callback and return what's returned there. If false, it will return what the runner returns. Default: false
  returnAfterPlayerAnswer?: boolean;
}

export class CommandPlugin<Options, StaticOptions = {}> {
  keyword: string;
  runner: CommandRunner<Options, StaticOptions>;
  argTypes: ArgTypes;
  parser: CommandParserFunction<Options, StaticOptions>;
  onPlayerAnswered?: OnPlayerAnswered<Options, StaticOptions>;
  returnAfterPlayerAnswer: boolean;
  constructor(
    keyword: string,
    argTypes: ArgTypes,
    runner: CommandRunner<Options, StaticOptions>,
    parser?: CommandParserFunction<Options, StaticOptions>,
  ) {
    this.keyword = keyword;
    this.runner = runner;
    this.argTypes = argTypes;
    if (!parser) {
      this.parser = generateParser(this.keyword, this.argTypes);
    } else {
      this.parser = parser;
    }
    this.returnAfterPlayerAnswer = false;
  }

  async run(
    cmd: Parser.Command<Options, StaticOptions>,
    choices?: DialogChoice[],
  ): Promise<any> {
    let res = await this.runner(cmd, choices);
    if (this.returnAfterPlayerAnswer) {
      res = await new Promise((resolve, reject) => {
        useVM().waitForPlayerAnswer(cmd);
        cmd.finishCommand = resolve;
      });
    }
    return res;
  }

  async processPlayerAnswer(
    cmd: Parser.Command<Options, StaticOptions>,
    choice: number | string,
  ): Promise<any> {
    let res: any = choice;
    if (this.onPlayerAnswered) {
      res = await this.onPlayerAnswered(cmd, choice);
    }
    if (this.returnAfterPlayerAnswer && cmd.finishCommand) {
      cmd.finishCommand(res);
    }
    return res;
  }

  static FromOptions<Options, StaticOptions = {}>(
    options: CommandPluginOptions<Options, StaticOptions>,
  ) {
    const plugin = new CommandPlugin<Options, StaticOptions>(
      options.keyword,
      options.argTypes,
      options.runner,
      options.parser,
    );
    plugin.onPlayerAnswered = options.onPlayerAnswered;
    plugin.returnAfterPlayerAnswer = options.returnAfterPlayerAnswer ?? false;
    return plugin;
  }
}

export type ArgTypes = ArgumentDescription[] | 'any';
export interface ArgumentDescription {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'any' | 'rest';
  optional?: boolean;
}
export function generateParser<Options, StaticOptions = {}>(
  keyword: string,
  argTypes: ArgTypes,
): CommandParserFunction<Options, StaticOptions> {
  let expectedArgCount: number[] = [];
  if (argTypes !== 'any') {
    expectedArgCount = [];
    let hasRest = false;
    const optionalArgs = argTypes.reduce((total, argType) => {
      if (argType.type === 'rest') {
        hasRest = true;
      }
      if (argType.optional) {
        total++;
      }
      return total;
    }, 0);
    if (optionalArgs >= 1) {
      expectedArgCount.push(argTypes.length - optionalArgs);
    } else {
      expectedArgCount.push(argTypes.length);
    }
    expectedArgCount.push(argTypes.length);
    if (hasRest) {
      expectedArgCount[1] = Infinity;
    }
  }
  return (
    ctx: CommandParsingContext,
    parsed: Parser.ParsedExpression<Options, StaticOptions>,
  ) => {
    const returnValue = {
      newLine: ctx.currentLine + 1,
    };
    const args = parsed.command.args;
    if (argTypes !== 'any') {
      // if args.length is between expectedArgCount[0] and expectedArgCount[1], it's ok

      if (
        args.length < expectedArgCount[0] ||
        args.length > expectedArgCount[1]
      ) {
        console.log('Error details');
        console.log(parsed.command);
        console.log(args);
        ctx.parserContext.error(
          ctx.line.line,
          `Command ${keyword}: Expected ${expectedArgCount.join(
            ' to ',
          )} arguments but got ${args.length}`,
        );
        return returnValue;
      }
    }
    parsed.command.commandType = keyword;
    // todo: check types of args
    if (argTypes !== 'any') {
      let reachedRest = false;
      parsed.command.args.forEach((arg, index) => {
        if (reachedRest) return;
        const argType = argTypes[index];
        if (argType.type === 'rest') {
          reachedRest = true;
          return;
        }
        if (!isExpression(arg) && !isVariable(arg)) {
          // Only run this if the arg isn't an expression, as expressions aren't currently typed
          // eslint-disable-next-line valid-typeof
          const isValid =
            argType.type === 'any' ||
            // eslint-disable-next-line valid-typeof
            typeof arg === argType.type;
          if (!isValid) {
            ctx.parserContext.error(
              ctx.line.line,
              `Command ${keyword}: Argument #${index + 1} (${
                argType.name
              }) should be a ${
                argType.type
              }, but got type ${typeof arg}: ${JSON.stringify(arg)}`,
            );
          }
        }
      });
    }
    return {
      newLine: ctx.currentLine + 1,
    };
  };
}
