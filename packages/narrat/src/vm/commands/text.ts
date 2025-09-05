import {
  ArgTypes,
  CommandParserFunction,
  CommandPlugin,
  generateParser,
} from './command-plugin';
import { textCommand } from '../vm-helpers';
import { useConfig } from '@/stores/config-store';
import { useVM } from '@/stores/vm-store';
import { timeout } from '@/utils/promises';
import { PlayerAnsweredChoiceMode, playerAnswered } from '../vm';
import { Parser } from '@/types/parser';
import { useDialogStore } from '@/stores/dialog-store';
export interface BaseTextCommandArgs {
  text: string;
  delay?: number;
  autoAdvance?: boolean;
}
export class BaseTextCommand<
  Options extends BaseTextCommandArgs,
> extends CommandPlugin<Options> {
  static async ManageAutoAdvance(cmd: Parser.Command<TalkArgs>) {
    await useVM().waitForEndTextAnimation();
    await timeout(cmd.options.delay || 0);
    if (cmd.options.autoAdvance) {
      playerAnswered(0, PlayerAnsweredChoiceMode.Default);
    } else {
      useDialogStore().makeLastDialogInteractive();
    }
  }

  static ShouldBeInteractive(cmd: Parser.Command<TalkArgs>) {
    return !cmd.options.delay && !cmd.options.autoAdvance;
  }
}
export interface TalkArgs {
  speaker: string;
  pose: string;
  text: string;
  delay?: number;
  autoAdvance?: boolean;
}
export const textCommandArgs: ArgTypes = [
  {
    name: 'speaker',
    type: 'string',
  },
  {
    name: 'pose',
    type: 'string',
  },
  {
    name: 'text',
    type: 'string',
  },
  {
    name: 'delay',
    type: 'number',
    optional: true,
  },
  {
    name: 'autoAdvance',
    type: 'boolean',
    optional: true,
  },
];
export const talkCommand = BaseTextCommand.FromOptions<TalkArgs>({
  keyword: 'talk',
  argTypes: textCommandArgs,
  runner: async (cmd, choices) => {
    const interactive = BaseTextCommand.ShouldBeInteractive(cmd);
    await textCommand({
      speaker: cmd.options.speaker,
      pose: cmd.options.pose,
      cssClass: 'talk-command',
      text: `"${cmd.options.text}"`,
      choices,
      interactive,
    });
    if (!interactive) {
      BaseTextCommand.ManageAutoAdvance(cmd);
    }
  },
  returnAfterPlayerAnswer: true,
});

export const thinkCommand = BaseTextCommand.FromOptions<TalkArgs>({
  keyword: 'think',
  argTypes: textCommandArgs,
  runner: async (cmd, choices) => {
    const interactive = BaseTextCommand.ShouldBeInteractive(cmd);
    await textCommand({
      speaker: cmd.options.speaker,
      pose: cmd.options.pose,
      cssClass: 'think-command',
      text: `${cmd.options.text}`,
      choices,
      interactive,
    });
    if (!interactive) {
      BaseTextCommand.ManageAutoAdvance(cmd);
    }
  },
  returnAfterPlayerAnswer: true,
});

export const narrateCommand = BaseTextCommand.FromOptions<TalkArgs>({
  keyword: 'narrate',
  argTypes: textCommandArgs.slice(2, 5),
  runner: async (cmd, choices) => {
    const interactive = BaseTextCommand.ShouldBeInteractive(cmd);
    await textCommand({
      speaker: useConfig().gameCharacter,
      cssClass: 'text-command',
      text: `${cmd.options.text}`,
      choices,
      interactive,
    });
    if (!interactive) {
      BaseTextCommand.ManageAutoAdvance(cmd);
    }
  },
  returnAfterPlayerAnswer: true,
});

export const textParser = (): CommandParserFunction<{}, { text: string }> => {
  const parser = generateParser<{}, { text: string }>('text', []);
  return (ctx, parsed) => {
    const result = parser(ctx, parsed);
    parsed.command.staticOptions = {
      text: parsed.code.substring(1, parsed.code.length - 1),
    };
    return result;
  };
};
export const textCommandPlugin = CommandPlugin.FromOptions<
  {},
  { text: string }
>({
  keyword: 'text',
  argTypes: [],
  runner: async (cmd, choices) => {
    await textCommand({
      speaker: useConfig().gameCharacter,
      cssClass: 'text-command',
      text: cmd.staticOptions.text,
      choices,
      interactive: true,
    });
  },
  parser: textParser(),
  returnAfterPlayerAnswer: true,
});
