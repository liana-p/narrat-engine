import { CommandPlugin } from './command-plugin';

// export const add: CommandRunner = async (cmd) => {
//   const addKey = cmd.args[0];
//   const addValue = cmd.args[1];
//   const vm = useVM();
//   vm.addInstruction(addKey, addValue as any);
//   return vm.nextLine();
// };

export const minPlugin = CommandPlugin.FromOptions<{
  min: number;
  value: number;
}>({
  keyword: 'min',
  argTypes: [
    { name: 'min', type: 'number' },
    { name: 'value', type: 'number' },
  ],
  runner: async (cmd) => {
    const { min, value } = cmd.options;
    if (value < min) {
      return value;
    }
    return min;
  },
});

export const maxPlugin = CommandPlugin.FromOptions<{
  max: number;
  value: number;
}>({
  keyword: 'max',
  argTypes: [
    { name: 'max', type: 'number' },
    { name: 'value', type: 'number' },
  ],
  runner: async (cmd) => {
    const { max, value } = cmd.options;
    if (value > max) {
      return value;
    }
    return max;
  },
});

export const clampPlugin = CommandPlugin.FromOptions<{
  min: number;
  max: number;
  value: number;
}>({
  keyword: 'clamp',
  argTypes: [
    { name: 'min', type: 'number' },
    { name: 'max', type: 'number' },
    { name: 'value', type: 'number' },
  ],
  runner: async (cmd) => {
    const { min, max, value } = cmd.options;
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  },
});

export const floorPlugin = CommandPlugin.FromOptions<{
  value: number;
}>({
  keyword: 'floor',
  argTypes: [{ name: 'value', type: 'number' }],
  runner: async (cmd) => {
    const { value } = cmd.options;
    return Math.floor(value);
  },
});

export const ceilPlugin = CommandPlugin.FromOptions<{
  value: number;
}>({
  keyword: 'ceil',
  argTypes: [{ name: 'value', type: 'number' }],
  runner: async (cmd) => {
    const { value } = cmd.options;
    return Math.ceil(value);
  },
});

export const roundPlugin = CommandPlugin.FromOptions<{
  value: number;
}>({
  keyword: 'round',
  argTypes: [{ name: 'value', type: 'number' }],
  runner: async (cmd) => {
    const { value } = cmd.options;
    return Math.round(value);
  },
});

export const sqrtPlugin = CommandPlugin.FromOptions<{
  value: number;
}>({
  keyword: 'sqrt',
  argTypes: [{ name: 'value', type: 'number' }],
  runner: async (cmd) => {
    const { value } = cmd.options;
    return Math.sqrt(value);
  },
});

export const powPlugin = CommandPlugin.FromOptions<{
  base: number;
  exponent: number;
}>({
  keyword: '^',
  argTypes: [
    { name: 'base', type: 'number' },
    { name: 'exponent', type: 'number' },
  ],
  runner: async (cmd) => {
    const { base, exponent } = cmd.options;
    return Math.pow(base, exponent);
  },
});
