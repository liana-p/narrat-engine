import { useVM } from '@/stores/vm-store';
import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';
import { findDataHelper, newFindDataHelper } from '@/utils/data-helpers';

export const callMethod = CommandPlugin.FromOptions<{
  target: any;
  method: string;
  args: any[];
}>({
  keyword: 'call_js_method',
  argTypes: [
    { name: 'target', type: 'any' },
    { name: 'method', type: 'string' },
    { name: 'args', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { target, method } = cmd.options;
    const args = cmd.args.slice(2);
    let targetObject = target;
    if (typeof target === 'string') {
      const result = newFindDataHelper<any>(window, window, target, '');
      if (!result) {
        commandRuntimeError(cmd, `target object not found`);
        return null;
      }
      targetObject = result[0][result[1]];
    }
    if (typeof targetObject !== 'object') {
      commandRuntimeError(
        cmd,
        `target object not found when trying to call js method ${method} on ${target}`,
      );
      return null;
    }
    if (typeof method !== 'string') {
      commandRuntimeError(cmd, `method name must be a string`);
      return null;
    }
    if (typeof targetObject[method] !== 'function') {
      commandRuntimeError(cmd, `method ${method} not found on target object`);
      return null;
    }
    return await targetObject[method](...args);
  },
});

export const runJS = CommandPlugin.FromOptions<{ code: string }>({
  keyword: 'run_js',
  argTypes: [{ name: 'code', type: 'string' }],
  runner: async (cmd) => {
    const { code } = cmd.options;
    // eslint-disable-next-line no-new-func
    const generatedFunction = Function(`return (${code})`);
    return generatedFunction();
  },
});
