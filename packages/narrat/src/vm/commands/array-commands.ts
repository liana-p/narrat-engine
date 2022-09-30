import { JUMP_SIGNAL, RETURN_SIGNAL, STOP_SIGNAL } from '@/constants';
import { useMain } from '@/stores/main-store';
import { SetFrameOptions, useVM } from '@/stores/vm-store';
import { error } from '@/utils/error-handling';
import { commandLog, commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

export const shuffleCommand = CommandPlugin.FromOptions<{ array: any[] }>({
  keyword: 'shuffle',
  argTypes: [{ name: 'array', type: 'any' }],
  runner: async (cmd) => {
    const array = cmd.options.array;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
      return;
    }
    shuffleArray(array);
    return array;
  },
});

export const pushCommand = CommandPlugin.FromOptions<{
  array: any[];
  value: any;
}>({
  keyword: 'push',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'value', type: 'any' },
  ],
  runner: async (cmd) => {
    const { array, value } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
      return;
    }
    array.push(value);
    return array;
  },
});

// Create array popCommand, joinCommand, concatCommand, includesCommand, reverseCommand, shiftCommand, sliceCommand
export const popCommand = CommandPlugin.FromOptions<{ array: any[] }>({
  keyword: 'pop',
  argTypes: [{ name: 'array', type: 'any' }],
  runner: async (cmd) => {
    const { array } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
      return;
    }
    return array.pop();
  },
});

export const shiftCommand = CommandPlugin.FromOptions<{ array: any[] }>({
  keyword: 'shift',
  argTypes: [{ name: 'array', type: 'any' }],
  runner: async (cmd) => {
    const { array } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
      return;
    }
    return array.shift();
  },
});

export const joinCommand = CommandPlugin.FromOptions<{
  array: any[];
  separator?: string;
}>({
  keyword: 'array_join',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'separator', type: 'string', optional: true },
  ],
  runner: async (cmd) => {
    const { array, separator } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
      return;
    }
    if (typeof separator !== 'undefined' && typeof separator !== 'string') {
      commandRuntimeError(cmd, `array join string separator must be a string`);
      return;
    }
    array.join(separator);
    return array;
  },
});

export const concatCommand = CommandPlugin.FromOptions<{ array: any[] }>({
  keyword: 'array_concat',
  argTypes: [{ name: 'array', type: 'any' }],
  runner: async (cmd) => {
    const { array } = cmd.options;
    const args = cmd.args;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
      return;
    }
    for (const arg of args) {
      if (!Array.isArray(arg)) {
        commandRuntimeError(cmd, `All concat arguments should be arrays`);
        return;
      }
    }
    return array.concat(...args.slice(1));
  },
});

export const includesCommand = CommandPlugin.FromOptions<{
  array: any[];
  searchElement: any;
}>({
  keyword: 'includes',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'searchElement', type: 'string' },
  ],
  runner: async (cmd) => {
    const { array, searchElement } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    if (typeof searchElement === 'undefined') {
      commandRuntimeError(cmd, `requires a search element argument`);
    }
    return array.includes(searchElement);
  },
});

export const reverseCommand = CommandPlugin.FromOptions<{ array: any[] }>({
  keyword: 'reverse',
  argTypes: [{ name: 'array', type: 'any' }],
  runner: async (cmd) => {
    const { array } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    array.reverse();
    return array;
  },
});

// Create the commandPlugins for array sliceCommand and spliceCommand
export const sliceCommand = CommandPlugin.FromOptions<{
  array: any[];
  start: number;
  end?: number;
}>({
  keyword: 'slice',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'start', type: 'number' },
    { name: 'end', type: 'number', optional: true },
  ],
  runner: async (cmd) => {
    const { array, start, end } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    if (typeof start !== 'number') {
      commandRuntimeError(cmd, `requires a start index argument`);
    }
    if (typeof end !== 'undefined' && typeof end !== 'number') {
      commandRuntimeError(
        cmd,
        `end index argument must be a number if present`,
      );
    }
    return array.slice(start, end);
  },
});

export const spliceCommand = CommandPlugin.FromOptions<{
  array: any[];
  start: number;
  end?: number;
}>({
  keyword: 'splice',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'start', type: 'number' },
    { name: 'end', type: 'number', optional: true },
  ],
  runner: async (cmd) => {
    const { array, start, end } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    if (typeof start !== 'number') {
      commandRuntimeError(cmd, `requires a start index argument`);
    }
    if (typeof end !== 'undefined' && typeof end !== 'number') {
      commandRuntimeError(
        cmd,
        `end index argument must be a number if present`,
      );
    }
    return array.splice(start, end);
  },
});

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
