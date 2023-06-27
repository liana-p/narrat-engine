/* eslint-disable eqeqeq */
import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

// export const add: CommandRunner = async (cmd) => {
//   const addKey = cmd.args[0];
//   const addValue = cmd.args[1];
//   const vm = useVM();
//   vm.addInstruction(addKey, addValue as any);
//   return vm.nextLine();
// };

export const equalPlugin = new CommandPlugin<{ a: number; b: number }>(
  '==',
  'any',
  async (cmd) => {
    if (cmd.args.length < 1) {
      commandRuntimeError(cmd, `requires at least 1 arguments`);
    }
    let previousValue = cmd.args[0];
    let allEqual = true;
    for (const arg of cmd.args) {
      if (arg != previousValue) {
        allEqual = false;
        break;
      } else {
        previousValue = arg;
      }
    }
    return allEqual;
  },
);

export const greaterThanPlugin = new CommandPlugin<{ a: number; b: number }>(
  '>',
  [
    { name: 'a', type: 'any' },
    { name: 'b', type: 'any' },
  ],
  async (cmd) => {
    const { a, b } = cmd.options;
    return a > b;
  },
);

export const lesserThanPlugin = new CommandPlugin<{ a: number; b: number }>(
  '<',
  [
    { name: 'a', type: 'any' },
    { name: 'b', type: 'any' },
  ],
  async (cmd) => {
    const { a, b } = cmd.options;
    return a < b;
  },
);

export const greaterOrEqualPlugin = new CommandPlugin<{ a: number; b: number }>(
  '>=',
  [
    { name: 'a', type: 'any' },
    { name: 'b', type: 'any' },
  ],
  async (cmd) => {
    const { a, b } = cmd.options;
    return a >= b;
  },
);

export const lesserOrEqualPlugin = new CommandPlugin<{ a: number; b: number }>(
  '<=',
  [
    { name: 'a', type: 'any' },
    { name: 'b', type: 'any' },
  ],
  async (cmd) => {
    const { a, b } = cmd.options;
    return a <= b;
  },
);

export const notEqualPlugin = new CommandPlugin<{ a: number; b: number }>(
  '!=',
  [
    { name: 'a', type: 'any' },
    { name: 'b', type: 'any' },
  ],
  async (cmd) => {
    const { a, b } = cmd.options;
    return a != b;
  },
);

export const notPlugin = new CommandPlugin<{ a: number; b: number }>(
  '!',
  [{ name: 'a', type: 'any' }],
  async (cmd) => {
    const { a } = cmd.options;
    return !a;
  },
);

// Create an andPlugin and an orPlugin
export const andPlugin = new CommandPlugin<{ a: number; b: number }>(
  '&&',
  'any',
  async (cmd) => {
    const args = cmd.args;
    if (cmd.args.length < 2) {
      commandRuntimeError(cmd, 'requires at least two arguments');
    }
    return args.reduce((acc, curr) => acc && curr, true);
  },
);

export const orPlugin = new CommandPlugin<{ a: number; b: number }>(
  '||',
  'any',
  async (cmd) => {
    if (cmd.args.length < 2) {
      commandRuntimeError(cmd, 'requires at least two arguments');
    }
    return cmd.args.reduce((acc, curr) => acc || curr, false);
  },
);

export const ternaryPlugin = new CommandPlugin<{
  a: boolean;
  b: any;
  c: any;
}>(
  '?',
  [
    { name: 'a', type: 'any' },
    { name: 'b', type: 'any' },
    { name: 'c', type: 'any' },
  ],
  async (cmd) => {
    const { a, b, c } = cmd.options;
    return a ? b : c;
  },
);
