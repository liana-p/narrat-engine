import { useVM } from '@/stores/vm-store';
import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

export const objectEntriesCommand = CommandPlugin.FromOptions<{
  obj: any;
}>({
  keyword: 'object_entries',
  argTypes: [{ name: 'obj', type: 'any' }],
  runner: async (cmd) => {
    const obj = cmd.options.obj;
    if (typeof obj !== 'object') {
      commandRuntimeError(cmd, `Requires an object argument.`);
      return [];
    }
    return Object.entries(obj);
  },
});

export const objectKeysCommand = CommandPlugin.FromOptions<{
  obj: any;
}>({
  keyword: 'object_keys',
  argTypes: [{ name: 'obj', type: 'any' }],
  runner: async (cmd) => {
    const obj = cmd.options.obj;
    if (typeof obj !== 'object') {
      commandRuntimeError(cmd, `Requires an object argument.`);
      return [];
    }
    return Object.keys(obj);
  },
});

export const objectValuesCommand = CommandPlugin.FromOptions<{
  obj: any;
}>({
  keyword: 'object_values',
  argTypes: [{ name: 'obj', type: 'any' }],
  runner: async (cmd) => {
    const obj = cmd.options.obj;
    if (typeof obj !== 'object') {
      commandRuntimeError(cmd, `Requires an object argument.`);
      return [];
    }
    return Object.values(obj);
  },
});

export const objectHasCommand = CommandPlugin.FromOptions<{
  obj: any;
  key: string;
}>({
  keyword: 'object_has',
  argTypes: [
    { name: 'obj', type: 'any' },
    { name: 'key', type: 'string' },
  ],
  runner: async (cmd) => {
    const { obj, key } = cmd.options;
    if (typeof obj !== 'object') {
      commandRuntimeError(cmd, `Requires an object argument.`);
      return false;
    }
    return Object.hasOwn(obj, key);
  },
});

export const forOfCommand = CommandPlugin.FromOptions<{
  target: any;
  predicateLabel: string;
}>({
  keyword: 'for_of',
  argTypes: [
    { name: 'target', type: 'any' },
    { name: 'predicateLabel', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { target, predicateLabel } = cmd.options;
    if (typeof target !== 'object') {
      commandRuntimeError(cmd, `Requires an object argument.`);
      return false;
    }
    for (const val of target) {
      await useVM().runLabelFunction(predicateLabel, val, ...cmd.args.slice(2));
    }
  },
});

export const forInCommand = CommandPlugin.FromOptions<{
  target: any;
  predicateLabel: string;
}>({
  keyword: 'for_in',
  argTypes: [
    { name: 'target', type: 'any' },
    { name: 'predicateLabel', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { target, predicateLabel } = cmd.options;
    if (typeof target !== 'object') {
      commandRuntimeError(cmd, `Requires an object argument.`);
      return false;
    }
    for (const key in target) {
      await useVM().runLabelFunction(
        predicateLabel,
        key,
        target[key],
        ...cmd.args.slice(2),
      );
    }
  },
});
