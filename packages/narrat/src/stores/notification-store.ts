import { timeout } from '@/utils/promises';
import { processText } from '@/utils/string-helpers';
import { writeText } from '@/vm/vm-helpers';
import { defineStore } from 'pinia';
import { getConfig } from '../config';

export interface NotificationState {
  text: string;
}

export interface NotificationsState {
  notifications: {
    [key: string]: NotificationState;
  };
  enabled: boolean;
}

// Generate a pinia store named notifications with a state using the type NotificationsState, and save type NotificationsSave, with actions:
// addNotification(text: string): Adds a new notification to the state, and deletes it after a timeout
// deleteNotification(id: string): Deletes a notification from the state
export const useNotifications = defineStore('notifications', {
  state: () => ({ notifications: {}, enabled: true } as NotificationsState),
  actions: {
    async addNotification(text: string) {
      if (!this.enabled) {
        return;
      }
      text = processText(text);
      const id = `${Date.now()}-${Math.random() * 10000}`;
      this.notifications[id] = {
        text,
      };
      if (getConfig().notifications.alsoPrintInDialogue) {
        writeText(`[NOTIFICATION] ${text}`);
      }
      await timeout(getConfig().notifications.timeOnScreen * 1000);
      this.deleteNotification(id);
    },
    deleteNotification(id: string) {
      delete this.notifications[id];
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
