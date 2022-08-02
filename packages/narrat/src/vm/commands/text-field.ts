import { AddDialogParams, useDialogStore } from '@/stores/dialog-store';
import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

// Write a CommandPlugin for running a label using the runLabelFunction of the useVM store
export const textFieldPlugin = CommandPlugin.FromOptions<{ prompt: string }>({
  keyword: 'text_field',
  argTypes: [{ name: 'prompt', type: 'string' }],
  returnAfterPlayerAnswer: true,
  runner: async (cmd) => {
    const dialog: AddDialogParams = {
      speaker: 'game',
      text: cmd.options.prompt,
      textField: true,
      interactive: true,
    };
    useDialogStore().addDialog(dialog);
  },
});

textFieldPlugin.onPlayerAnswered = async (cmd, choice) => {
  if (typeof choice !== 'string') {
    commandRuntimeError(cmd, `The player's answer should be a string`);
  }
  return choice;
};

export const textFieldPromptPlugin = CommandPlugin.FromOptions<{
  prompt: string;
}>({
  keyword: 'text_field_prompt',
  argTypes: [{ name: 'prompt', type: 'string' }],
  runner: async (cmd) => {
    const dialog: AddDialogParams = {
      speaker: 'game',
      text: cmd.options.prompt,
      textField: true,
      interactive: true,
    };
    useDialogStore().addDialog(dialog);
  },
});

// const customTextPrompt: Parser.ParsedLabel = {
//   branch: [
//     {
//       code: `text_field_prompt ${cmd.options.prompt}`,
//       command: {
//         commandType: 'text_field_prompt',
//         operator: 'text_field_prompt',
//         args: [cmd.options.prompt],
//         options: {
//           prompt: cmd.options.prompt,
//         },
//         staticOptions: {},
//       },
//       fileName: 'generated_code',
//       line: 0,
//     },
//   ],
//   args: [],
// };
// const customStack: AddStackOptions = {
//   currentIndex: 0,
//   branchData: customTextPrompt,
//   label: 'any',
//   args: [],
//   onComplete: (returnValue) => {
//     return returnValue;
//   },
// };
// useVM().runCustomStack(customStack);
// });
