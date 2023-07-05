import {
  CommandParserFunction,
  CommandPlugin,
  generateParser,
} from './command-plugin';
import { textCommand } from '../vm-helpers';
import { useConfig } from '@/stores/config-store';

export interface TalkArgs {
  speaker: string;
  pose: string;
  text: string;
}
export const talkCommand = CommandPlugin.FromOptions<TalkArgs>({
  keyword: 'talk',
  argTypes: [
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
  ],
  runner: async (cmd, choices) => {
    await textCommand({
      speaker: cmd.options.speaker,
      pose: cmd.options.pose,
      cssClass: 'talk-command',
      text: `"${cmd.options.text}"`,
      choices,
      interactive: true,
    });
  },
  returnAfterPlayerAnswer: true,
});

export const thinkCommand = CommandPlugin.FromOptions<TalkArgs>({
  keyword: 'think',
  argTypes: [
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
  ],
  runner: async (cmd, choices) => {
    await textCommand({
      speaker: cmd.options.speaker,
      pose: cmd.options.pose,
      cssClass: 'think-command',
      text: `${cmd.options.text}`,
      choices,
      interactive: true,
    });
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
