import { useVM } from '@/stores/vm-store';
import { commandRuntimeError } from './command-helpers';
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

export const unshiftCommand = CommandPlugin.FromOptions<{
  array: any[];
  value: any;
}>({
  keyword: 'unshift',
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
    array.unshift(value);
    return array;
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
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'rest', type: 'rest', optional: true },
  ],
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

export const arrayFindIndexCommand = CommandPlugin.FromOptions<{
  array: any[];
  predicateLabel: string;
}>({
  keyword: 'array_find_index',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'predicateLabel', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { array, predicateLabel } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    for (const [index, element] of array.entries()) {
      const predicateResult = await useVM().runLabelFunction(
        predicateLabel,
        element,
        index,
        array,
        ...cmd.args.slice(2),
      );
      if (predicateResult === true) {
        return index;
      }
    }
    return -1;
  },
});

export const arrayFindCommand = CommandPlugin.FromOptions<{
  array: any[];
  predicateLabel: string;
}>({
  keyword: 'array_find',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'predicateLabel', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { array, predicateLabel } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    for (const [index, element] of array.entries()) {
      const predicateResult = await useVM().runLabelFunction(
        predicateLabel,
        element,
        index,
        array,
        ...cmd.args.slice(2),
      );
      if (predicateResult === true) {
        return element;
      }
    }
    return null;
  },
});

export const arrayFilterCommand = CommandPlugin.FromOptions<{
  array: any[];
  predicateLabel: string;
}>({
  keyword: 'array_filter',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'predicateLabel', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { array, predicateLabel } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    const result = [];
    for (const [index, element] of array.entries()) {
      const predicateResult = await useVM().runLabelFunction(
        predicateLabel,
        element,
        index,
        array,
        ...cmd.args.slice(2),
      );
      if (predicateResult === true) {
        result.push(element);
      }
    }
    return result;
  },
});

export const arrayMapCommand = CommandPlugin.FromOptions<{
  array: any[];
  mapperLabel: string;
}>({
  keyword: 'array_map',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'mapperLabel', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { array, mapperLabel } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    const result = [];
    for (const [index, element] of array.entries()) {
      const predicateResult = await useVM().runLabelFunction(
        mapperLabel,
        element,
        index,
        array,
        ...cmd.args.slice(2),
      );
      result.push(predicateResult);
    }
    return result;
  },
});

export const arrayReduceCommand = CommandPlugin.FromOptions<{
  array: any[];
  reducerLabel: string;
  initValue: any;
}>({
  keyword: 'array_reduce',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'reducerLabel', type: 'string' },
    { name: 'initValue', type: 'any' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { array, reducerLabel, initValue } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    let result = initValue;
    for (const [index, element] of array.entries()) {
      result = await useVM().runLabelFunction(
        reducerLabel,
        result,
        element,
        index,
        array,
        ...cmd.args.slice(3),
      );
    }
    return result;
  },
});

export const arraySomeCommand = CommandPlugin.FromOptions<{
  array: any[];
  predicateLabel: string;
}>({
  keyword: 'array_some',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'predicateLabel', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { array, predicateLabel } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    for (const [index, element] of array.entries()) {
      const predicateResult = await useVM().runLabelFunction(
        predicateLabel,
        element,
        index,
        array,
        ...cmd.args.slice(2),
      );
      if (predicateResult === true) {
        return true;
      }
    }
    return false;
  },
});

export const arrayEveryCommand = CommandPlugin.FromOptions<{
  array: any[];
  predicateLabel: string;
}>({
  keyword: 'array_every',
  argTypes: [
    { name: 'array', type: 'any' },
    { name: 'predicateLabel', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { array, predicateLabel } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    for (const [index, element] of array.entries()) {
      const predicateResult = await useVM().runLabelFunction(
        predicateLabel,
        element,
        index,
        array,
        ...cmd.args.slice(2),
      );
      if (predicateResult !== true) {
        return false;
      }
    }
    return true;
  },
});

export const arrayEntriesCommand = CommandPlugin.FromOptions<{
  array: any[];
}>({
  keyword: 'array_entries',
  argTypes: [{ name: 'array', type: 'any' }],
  runner: async (cmd) => {
    const { array } = cmd.options;
    if (!Array.isArray(array)) {
      commandRuntimeError(cmd, `requires an array argument`);
    }
    return array.entries();
  },
});

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
