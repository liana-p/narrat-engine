import { useNotifications } from '@/stores/notification-store';
import { CommandPlugin } from './command-plugin';

export const notifyPlugin = new CommandPlugin<{
  text: string;
  description?: string;
  icon?: string;
}>(
  'notify',
  [
    { name: 'text', type: 'string' },
    { name: 'description', type: 'string', optional: true },
    { name: 'icon', type: 'string', optional: true },
  ],
  async (cmd) => {
    const { text, icon, description } = cmd.options;
    useNotifications().addNotification(text, description, icon);
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
