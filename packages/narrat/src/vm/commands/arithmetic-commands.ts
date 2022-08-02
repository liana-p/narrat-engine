import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

// export const add: CommandRunner = async (cmd) => {
//   const addKey = cmd.args[0];
//   const addValue = cmd.args[1];
//   const vm = useVM();
//   vm.addInstruction(addKey, addValue as any);
//   return vm.nextLine();
// };

export const additionPlugin = new CommandPlugin<{ a: number; b: number }>(
  '+',
  'any',
  async (cmd) => {
    if (cmd.args.length < 2) {
      commandRuntimeError(cmd, `requires at least two arguments`);
    }
    return cmd.args.reduce((acc: number, curr) => {
      if (typeof curr === 'number') {
        return acc + curr;
      }
      commandRuntimeError(cmd, `requires all arguments to be numbers`);
      return acc;
    }, 0);
  },
);

export const substractionPlugin = new CommandPlugin<{ a: number; b: number }>(
  '-',
  'any',
  async (cmd) => {
    if (cmd.args.length < 2) {
      commandRuntimeError(cmd, `requires at least two arguments`);
    }
    return cmd.args.slice(1).reduce((acc: number, curr) => {
      if (typeof curr === 'number') {
        return acc - curr;
      }
      commandRuntimeError(cmd, `requires all arguments to be numbers`);
      return acc;
    }, cmd.args[0] as number);
  },
);

export const negPlugin = new CommandPlugin<{ a: number }>(
  'neg',
  [{ name: 'a', type: 'number' }],
  async (cmd) => {
    if (cmd.args.length !== 1) {
      commandRuntimeError(cmd, `requires one argument`);
    }
    return -cmd.options.a;
  },
);

export const absPlugin = new CommandPlugin<{ a: number }>(
  'abs',
  [{ name: 'a', type: 'number' }],
  async (cmd) => {
    if (cmd.args.length !== 1) {
      commandRuntimeError(cmd, `requires one argument`);
    }
    return Math.abs(cmd.options.a);
  },
);

// Write multiplicationPlugin and divisionPlugin
export const multiplicationPlugin = new CommandPlugin<{ a: number; b: number }>(
  '*',
  'any',
  async (cmd) => {
    if (cmd.args.length < 2) {
      commandRuntimeError(cmd, `requires at least two arguments`);
    }
    return cmd.args.reduce((acc: number, curr) => {
      if (typeof curr === 'number') {
        return acc * curr;
      }
      commandRuntimeError(cmd, `requires all arguments to be numbers`);
      return acc;
    }, 1);
  },
);

export const divisionPlugin = new CommandPlugin<{ a: number; b: number }>(
  '/',
  'any',
  async (cmd) => {
    if (cmd.args.length < 2) {
      commandRuntimeError(cmd, `requires at least two arguments`);
    }
    const res = (cmd.args[0] as number) / (cmd.args[1] as number);
    return cmd.args.slice(2).reduce((acc: number, curr) => {
      if (typeof curr === 'number') {
        return acc / curr;
      }
      commandRuntimeError(cmd, `requires all arguments to be numbers`);
      return acc;
    }, res);
  },
);
