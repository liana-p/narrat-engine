<template>
  <transition-group name="notification" tag="div" class="notifications-holder">
    <div
      class="notification tile"
      v-for="(notification, id) in notifications"
      :key="id"
    >
      <img
        :src="getAssetUrl(notification.icon)"
        v-if="notification.icon"
        class="notification-icon"
        :style="notificationStyle(notification)"
      />
      <span v-html="notification.text" class="notification-text"></span>
      <p
        v-html="notification.description"
        v-if="notification.description"
        class="notification-description"
      ></p>
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
import {
  NotificationState,
  useNotifications,
} from '@/stores/notification-store';
import { computed } from 'vue';
import { getAssetUrl } from '@/config';

const notificationsStore = useNotifications();
const notifications = computed(() => notificationsStore.notifications);
const notificationStyle = (notification: NotificationState) => {
  if (notification.description) {
    return {
      marginTop: '10px',
    };
  }
};
</script>

<style>
.notifications-holder {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  pointer-events: none;
  z-index: 2;
}

.notification {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 9px;
  width: 400px;
  text-align: left;
}

.notification-icon {
  float: left;
  width: var(--notification-icon-size);
  height: var(--notification-icon-size);
  margin-right: 10px;
}
.notification-text {
  color: var(--notifications-text-color);
  font-size: 1.2rem;
  font-weight: 600;
}

.notification-description {
  margin-top: 10px;
  color: var(--notifications-description-color);
  font-size: 1rem;
  font-style: italic;
}
</style>
