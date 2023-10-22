<template>
  <div
    class="viewport-layer"
    :id="`viewport-layer-${currentScreen}`"
    :style="containerStyle"
    v-if="inGame"
  >
    <video
      class="viewport-layer-background"
      :id="`viewport-layer-background-${currentScreen}`"
      :style="videoStyle"
      v-if="video"
      autoplay
      :loop="video.loop === false ? false : true"
      :muted="video.muted ? true : false"
    >
      <source :src="getAssetUrl(screenConfig.background)" />
    </video>
    <div
      class="viewport-layer-background"
      :id="`viewport-layer-background-${currentScreen}`"
      :style="backgroundStyle"
      v-else
    ></div>
    <ViewportButton
      v-for="button in screenButtons"
      :key="button"
      :id="button"
      :layerSelected="isLayerSelected"
      :transitioning="transitioning"
      :activeInteractive="activeInteractive"
    ></ViewportButton>
    <ScreenObject
      v-for="screenObject in screenObjects"
      :key="screenObject.id"
      :screenObject="screenObject"
      :transitioning="transitioning"
      :layerSelected="isLayerSelected"
      :activeInteractive="activeInteractive"
    />
  </div>
</template>

<script setup lang="ts">
import {
  getAssetUrl,
  getCommonConfig,
  getImageUrl,
  getScreenConfig,
} from '@/config';
import { computed, CSSProperties } from 'vue';
import { useMain } from '../stores/main-store';
import { useScreenObjects } from '@/stores/screen-objects-store';
import { error } from '@/utils/error-handling';
import ScreenObject from './screen-objects/screen-object.vue';
import ViewportButton from './screens/viewport-button.vue';
import { EMPTY_SCREEN } from '@/constants';
import { InteractiveScreenElement } from './screens/screen-types';

const props = defineProps<{
  layer: string;
  layerIndex: number;
  transitioning: boolean;
  activeInteractive?: InteractiveScreenElement | null;
}>();
const main = useMain();
const screenObjectsStore = useScreenObjects();

const isLayerSelected = computed(() => {
  if (
    props.activeInteractive &&
    props.activeInteractive.layer === props.layerIndex
  ) {
    return true;
  }
  return false;
});

const screenObjects = computed(() => {
  return screenObjectsStore.tree.filter((o) => o.layer === props.layerIndex);
});
const layoutWidth = computed(() => {
  return getCommonConfig().layout.backgrounds.width;
});
const layoutHeight = computed(() => {
  return getCommonConfig().layout.backgrounds.height;
});
const currentScreen = computed(() => {
  return props.layer!;
});

const screenConfig = computed(() => {
  const conf = getScreenConfig(currentScreen.value);
  if (!conf) {
    error(`Screen ${currentScreen.value} doesn't have a config`);
  }
  return conf;
});

const inGame = computed(() => {
  return main.isInGame;
});

// Buttons
const screenButtons = computed(() => {
  return (screenConfig.value.buttons || []) as string[];
});

const video = computed(() => {
  return screenConfig.value.video;
});
const containerStyle = computed<CSSProperties>(() => {
  return {
    width: `${layoutWidth.value}px`,
    height: `${layoutHeight.value}px`,
  };
});
const backgroundStyle = computed<CSSProperties>(() => {
  let backgroundImage: string | undefined = `url(${getImageUrl(
    screenConfig.value.background,
  )})`;
  if (screenConfig.value.background === EMPTY_SCREEN) {
    backgroundImage = undefined;
  }
  return {
    backgroundImage,
    position: 'absolute',
    left: 0,
    top: 0,
    width: `${layoutWidth.value}px`,
    height: `${layoutHeight.value}px`,
  };
});

const videoStyle = computed<CSSProperties>(() => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: `${layoutWidth.value}px`,
    height: `${layoutHeight.value}px`,
  };
});
</script>

<style>
.viewport {
  position: relative;
}

.viewport-layer {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
