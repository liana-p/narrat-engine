import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

export const randomIntPlugin = new CommandPlugin<{ a: number; b: number }>(
  'random',
  [
    { name: 'a', type: 'number' },
    { name: 'b', type: 'number' },
  ],
  async (cmd) => {
    const { a, b } = cmd.options;
    if (typeof a !== 'number' || typeof b !== 'number') {
      commandRuntimeError(
        cmd,
        `random command needs two numbers as parameters`,
      );
      return 0;
    }
    return Math.floor(Math.random() * (b - a + 1)) + a;
  },
);

export const randomFloatPlugin = new CommandPlugin<{ a: number; b: number }>(
  'random_float',
  [
    { name: 'a', type: 'number' },
    { name: 'b', type: 'number' },
  ],
  async (cmd) => {
    const { a, b } = cmd.options;
    if (typeof a !== 'number' || typeof b !== 'number') {
      commandRuntimeError(
        cmd,
        `random_float command needs two numbers as parameters`,
      );
      return 0;
    }
    return Math.random() * (b - a) + a;
  },
);

export const randomFromArgsPlugin = new CommandPlugin<{}>(
  'random_from_args',
  [],
  async (cmd) => {
    const args = cmd.args;
    if (!args || !args.length) {
      commandRuntimeError(
        cmd,
        `random_from_args command needs at least one argument`,
      );
      return 0;
    }
    return args[Math.floor(Math.random() * args.length)];
  },
);
