<template>
  <div class="auto-play-feedback-container" v-if="autoPlayText">
    <div class="auto-play-feedback" :class="autoPlayClass">
      {{ autoPlayText }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog-store';
import { computed } from 'vue';

const dialog = useDialogStore();
const autoPlay = computed(() => dialog.playMode === 'auto');
const skip = computed(() => dialog.playMode === 'skip');

const autoPlayClass = computed(() => {
  if (autoPlay.value) {
    return 'auto-play-feedback-auto';
  } else if (skip.value) {
    return 'auto-play-feedback-skip';
  }
  return {};
});

const autoPlayText = computed(() => {
  if (autoPlay.value) {
    return 'Auto Play';
  } else if (skip.value) {
    return 'Skip';
  }
  return '';
});
</script>
<style>
.auto-play-feedback-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}

.auto-play-feedback {
  font-size: 1.2rem;
}

@keyframes auto-feedback {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.auto-play-feedback-auto {
  animation: auto-feedback 1.5s ease-in-out alternate-reverse infinite;
}

.auto-play-feedback-skip {
  animation: auto-feedback 1.5s ease-in-out alternate-reverse infinite;
}
</style>
