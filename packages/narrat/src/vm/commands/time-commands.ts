import { CommandPlugin } from './command-plugin';
import { useMain } from '@/stores/main-store';
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

// Create toDays, toHours, toMinutes, toSeconds command plugins that convert a timestamp in miliseconds to those units
export const toDaysPlugin = CommandPlugin.FromOptions<{ time: number }>({
  keyword: 'to_days',
  argTypes: [{ name: 'time', type: 'number' }],
  runner: async (cmd) => {
    return Math.floor(cmd.options.time / 86400000);
  },
});

export const toHoursPlugin = CommandPlugin.FromOptions<{ time: number }>({
  keyword: 'to_hours',
  argTypes: [{ name: 'time', type: 'number' }],
  runner: async (cmd) => {
    return Math.floor(cmd.options.time / 3600000);
  },
});

export const toMinutesPlugin = CommandPlugin.FromOptions<{ time: number }>({
  keyword: 'to_minutes',
  argTypes: [{ name: 'time', type: 'number' }],
  runner: async (cmd) => {
    return Math.floor(cmd.options.time / 60000);
  },
});

export const toSecondsPlugin = CommandPlugin.FromOptions<{ time: number }>({
  keyword: 'to_seconds',
  argTypes: [{ name: 'time', type: 'number' }],
  runner: async (cmd) => {
    return Math.floor(cmd.options.time / 1000);
  },
});
