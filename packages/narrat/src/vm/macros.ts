import { useVM } from '@/stores/vm-store';
import { ArgTypes, CommandPlugin } from './commands/command-plugin';
import { vm } from './vm';
import { commandRuntimeError } from './commands/command-helpers';

export function createMacro(name: string, argTypes: ArgTypes, label: string) {
  const generatedCommand = CommandPlugin.FromOptions<any>({
    keyword: name,
    argTypes,
    runner: async (cmd) => {
      const res = await useVM().runLabelFunction(label, ...cmd.args);
      return res;
    },
  });
  vm.addCommand(generatedCommand);
}

export const createMacroCommand = CommandPlugin.FromOptions<any>({
  keyword: 'create_macro',
  argTypes: 'any',
  runner: async (cmd) => {
    if (cmd.args.length < 2) {
      commandRuntimeError(
        cmd,
        `create_macro command needs at least a name and a label`,
      );
    }
    const macroName = cmd.args[0] as string;
    const label = cmd.args[1] as string;
    const argNames = cmd.args.slice(2) as string[];
    const argTypes = argNames.map((name) => ({
      name,
      type: 'any',
    })) as ArgTypes;
    createMacro(macroName, argTypes, label);
  },
});
