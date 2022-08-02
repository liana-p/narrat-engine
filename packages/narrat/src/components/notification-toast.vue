<template>
  <transition-group name="notification" tag="div" class="notifications-holder">
    <div
      class="notification"
      v-for="(notification, id) in notifications"
      :key="id"
    >
      <h3 v-html="notification.text"></h3>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { useNotifications } from '@/stores/notification-store';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    ...mapState(useNotifications, ['notifications']),
  },
});
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
}

.notification {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 15px;
  background: var(--notifications-bg);
  width: 40vh;
  text-align: center;
}
</style>
