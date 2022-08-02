import { useNotifications } from '@/stores/notification-store';
import { CommandPlugin } from './command-plugin';

export const notifyPlugin = new CommandPlugin<{ text: string }>(
  'notify',
  [{ name: 'text', type: 'string' }],
  async (cmd) => {
    const { text } = cmd.options;
    useNotifications().addNotification(text);
  },
);

export const disableNotifications = new CommandPlugin<{}>(
  'disable_notifications',
  [],
  async (cmd) => {
    useNotifications().disableNotifications();
  },
);

export const enableNotifications = new CommandPlugin<{}>(
  'enable_notifications',
  [],
  async (cmd) => {
    useNotifications().enableNotifications();
  },
);
