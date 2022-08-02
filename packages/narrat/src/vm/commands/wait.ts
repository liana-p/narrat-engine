import { timeout } from '@/utils/promises';
import { CommandPlugin } from './command-plugin';

export const waitCommand = CommandPlugin.FromOptions<{ duration: number }>({
  keyword: 'wait',
  argTypes: [{ name: 'duration', type: 'number' }],
  runner: async (cmd) => {
    await timeout(cmd.options.duration);
  },
});
