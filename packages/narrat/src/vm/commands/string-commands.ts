import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

// export const add: CommandRunner = async (cmd) => {
//   const addKey = cmd.args[0];
//   const addValue = cmd.args[1];
//   const vm = useVM();
//   vm.addInstruction(addKey, addValue as any);
//   return vm.nextLine();
// };

export const stringConcatPlugin = new CommandPlugin<{ a: number; b: number }>(
  'concat',
  'any',
  async (cmd) => {
    if (cmd.args.length < 2) {
      commandRuntimeError(cmd, `requires at least two arguments`);
    }
    return cmd.args.reduce((acc: string, curr) => {
      if (typeof curr === 'string') {
        return `${acc}${curr}`;
      }
      commandRuntimeError(cmd, `requires all arguments to be strings`);
      return acc;
    }, '');
  },
);

// write a string join plugin where the first arg is the join character
export const stringJoinPlugin = new CommandPlugin<{ a: number; b: number }>(
  'join',
  'any',
  async (cmd) => {
    const joiner = cmd.args[0];
    if (cmd.args.length < 3) {
      commandRuntimeError(cmd, `requires at least 3 arguments`);
    }
    return cmd.args.slice(1).reduce((acc: string, curr) => {
      if (typeof curr === 'string') {
        return `${acc}${joiner}${curr}`;
      }
      commandRuntimeError(cmd, `requires all arguments to be strings`);
      return acc;
    }, '');
  },
);
