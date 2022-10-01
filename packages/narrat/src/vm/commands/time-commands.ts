import { CommandPlugin } from './command-plugin';
import { getPlayTime } from '@/utils/time-helpers';
import { useMain } from '@/lib';
export const nowPlugin = CommandPlugin.FromOptions<{}>({
  keyword: 'time_now',
  argTypes: [],
  runner: async (_) => {
    return Date.now();
  },
});

export const totalPlaytimePlugin = CommandPlugin.FromOptions<{}>({
  keyword: 'total_playtime',
  argTypes: [],
  runner: async (cmd) => {
    return useMain().totalPlayTime;
  },
});

export const sessionPlaytimePlugin = CommandPlugin.FromOptions<{}>({
  keyword: 'session_playtime',
  argTypes: [],
  runner: async (cmd) => {
    return useMain().sessionPlayTime;
  },
});
