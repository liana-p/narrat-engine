import { timeout } from '@/utils/promises';
import { processText } from '@/utils/string-helpers';
import { writeText } from '@/vm/vm-helpers';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { getConfig } from '../config';

export interface NotificationState {
  id: string;
  text: string;
  description?: string;
  icon?: string;
}

export interface NotificationsState {
  notifications: NotificationState[];
  enabled: boolean;
}

export const useNotifications = defineStore('notifications', {
  state: () => ({ notifications: [], enabled: true }) as NotificationsState,
  actions: {
    async addNotification(text: string, description?: string, icon?: string) {
      if (!this.enabled) {
        return;
      }
      text = processText(text);
      const id = `${Date.now()}-${Math.random() * 10000}`;
      this.notifications.push({
        id,
        text,
        description,
        icon,
      });
      if (getConfig().notifications.alsoPrintInDialogue) {
        writeText(`[NOTIFICATION] ${text}`);
      }
      await timeout(getConfig().notifications.timeOnScreen * 1000);
      this.deleteNotification(id);
    },
    deleteNotification(id: string) {
      const notification = this.findNotifications(id);
      if (notification) {
        this.notifications.splice(this.notifications.indexOf(notification), 1);
      }
    },
    findNotifications(id: string) {
      return this.notifications.find((n) => n.id === id);
    },
    disableNotifications() {
      this.enabled = false;
      for (const id in this.notifications) {
        this.deleteNotification(id);
      }
    },
    enableNotifications() {
      this.enabled = true;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotifications, import.meta.hot));
}
