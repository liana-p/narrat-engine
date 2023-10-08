import { JUMP_SIGNAL, RETURN_SIGNAL, STOP_SIGNAL } from '@/constants';
import { useMain } from '@/stores/main-store';
import { SetFrameOptions, useVM } from '@/stores/vm-store';
import { error } from '@/utils/error-handling';
import { commandLog, commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';
import { vm } from '../vm';

export const jumpCommand = CommandPlugin.FromOptions<{ label: string }>({
  keyword: 'jump',
  argTypes: 'any',
  runner: async (cmd) => {
    if (cmd.args.length < 1 || typeof cmd.args[0] !== 'string') {
      commandRuntimeError(cmd, `requires a label argument`);
    }
    const label = cmd.args[0] as string;
    const vmStore = useVM();
    const newStack: SetFrameOptions = {
      branchData: vm.script[label],
      label,
      args: cmd.args.splice(1),
      currentIndex: 0,
    };
    if (!vm.script[label]) {
      error(`Trying to jump but label ${label} not found`);
      return;
    }
    vmStore.jumpTarget = newStack;
    // await vm.runFrame();
    return JUMP_SIGNAL;
  },
});

export const runLabelPlugin = CommandPlugin.FromOptions<{ label: string }>({
  keyword: 'run',
  argTypes: 'any',
  runner: async (cmd) => {
    if (cmd.args.length < 1 || typeof cmd.args[0] !== 'string') {
      commandRuntimeError(cmd, `run command needs a label to argument run`);
    }
    const label = cmd.args[0] as string;
    const res = await useVM().runLabelFunction(label, ...cmd.args.slice(1));
    return res;
  },
});

export const defineVariablePlugin = CommandPlugin.FromOptions<{
  name: string;
  value: any;
}>({
  keyword: 'var',
  argTypes: [
    { name: 'name', type: 'string' },
    { name: 'value', type: 'any' },
  ],
  runner: async (cmd) => {
    const { name, value } = cmd.options;
    useVM().addScopedVariable(name, value);
  },
});

export const returnPlugin = CommandPlugin.FromOptions<{ value: any }>({
  keyword: 'return',
  argTypes: [{ name: 'value', type: 'any' }],
  runner: async (cmd) => {
    const { value } = cmd.options;
    useVM().setReturnValue(value);
    return RETURN_SIGNAL;
  },
});

export const logPlugin = CommandPlugin.FromOptions<{ value: any }>({
  keyword: 'log',
  argTypes: 'any',
  runner: async (cmd) => {
    commandLog(cmd, ...cmd.args);
  },
});

export const returnMainMenuPlugin = CommandPlugin.FromOptions<{}>({
  keyword: 'menu_return',
  argTypes: [],
  runner: async (cmd) => {
    useMain().menuReturn();
    return STOP_SIGNAL;
  },
});

export const savePlugin = CommandPlugin.FromOptions<{ name?: string }>({
  keyword: 'save',
  argTypes: [{ name: 'name', type: 'string', optional: true }],
  runner: async (cmd) => {
    await useMain().manualSave({ saveName: cmd.options.name });
  },
});

export const savePromptPlugin = CommandPlugin.FromOptions<{ name?: string }>({
  keyword: 'save_prompt',
  argTypes: [{ name: 'name', type: 'string', optional: true }],
  runner: async (cmd) => {
    await useMain().manualSave({
      saveName: cmd.options.name,
      withPrompt: true,
    });
  },
});

export const resetGlobalPlugin = CommandPlugin.FromOptions<{}>({
  keyword: 'reset_global_save',
  argTypes: [],
  runner: async (cmd) => {
    await useMain().resetGlobalSave();
  },
});

export const newCommandPlugin = CommandPlugin.FromOptions<{ name?: string }>({
  keyword: 'new',
  argTypes: [
    { name: 'name', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const toInstantiate = cmd.options.name;
    if (toInstantiate === 'Array') {
      return [...cmd.args.slice(1)];
    }
    if (toInstantiate === 'Object') {
      return {};
    }
  },
});
