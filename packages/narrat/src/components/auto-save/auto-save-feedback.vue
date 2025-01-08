<template>
  <Transition name="fade">
    <div class="auto-save-feedback-container" v-if="autosaving">
      <div
        class="auto-save-feedback-background"
        v-if="autosaveConfig?.backgroundImage"
        :style="backgroundStyle"
      ></div>
      <div class="auto-save-feedback-text" v-if="autosaveConfig?.text">
        {{ autosaveConfig?.text }}
      </div>
      <div
        class="auto-save-feedback-foreground"
        v-if="autosaveConfig?.foregroundImage"
        :style="foregroundStyle"
      ></div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { useMain } from '@/stores/main-store';
import { useDialogStore } from '@/stores/dialog-store';
import { computed } from 'vue';
import { getCommonConfig, getImageUrl } from '@/config';

const main = useMain();
const autosaving = computed(() => main.autosaveFeedback);
const autosaveConfig = computed(() => getCommonConfig().saves.autosaveFeedback);

const backgroundStyle = computed(() => {
  if (!autosaveConfig.value?.backgroundImage) {
    return {};
  }
  return {
    backgroundImage: `url(${getImageUrl(autosaveConfig.value?.backgroundImage)})`,
  };
});

const foregroundStyle = computed(() => {
  if (!autosaveConfig.value?.foregroundImage) {
    return {};
  }
  return {
    backgroundImage: `url(${getImageUrl(autosaveConfig.value?.foregroundImage)})`,
  };
});
</script>
<style>
.auto-save-feedback-container {
  position: absolute;
  top: 30px;
  left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
}

.auto-save-feedback-text {
  font-size: 1rem;
  text-align: center;
  z-index: 2;
  color: goldenrod;
}

.auto-save-feedback-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  transform-origin: center center;
  animation: spinner 3s linear reverse infinite;
  z-index: 1;
}

.auto-save-feedback-foreground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  background-size: contain;
  animation: spinner 1.5s linear infinite;
  z-index: 3;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
