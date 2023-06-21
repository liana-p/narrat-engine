import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';
import { useSettings } from '@/stores/settings-store';

export const getSettingPlugin = CommandPlugin.FromOptions<{
  setting: string;
}>({
  keyword: 'get_setting',
  argTypes: [{ name: 'setting', type: 'string' }],
  runner: async (cmd) => {
    const { setting } = cmd.options;
    if (!setting) {
      commandRuntimeError(cmd, `get_setting command needs a setting id`);
    }
    return useSettings().getSetting(setting);
  },
});

export const setSettingPlugin = CommandPlugin.FromOptions<{
  setting: string;
  value: any;
}>({
  keyword: 'set_setting',
  argTypes: [
    { name: 'setting', type: 'string' },
    { name: 'value', type: 'any' },
  ],
  runner: async (cmd) => {
    const { setting, value } = cmd.options;
    if (!setting) {
      commandRuntimeError(cmd, `set_setting command needs a setting id`);
    }
    useSettings().setSetting(setting, value);
  },
});
