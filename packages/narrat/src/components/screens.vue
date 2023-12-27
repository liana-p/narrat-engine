<template>
  <div
    class="viewport"
    id="narrat-viewport"
    :style="viewportStyle"
    v-if="inGame"
  >
    <div
      v-for="(layer, index) in layers"
      :key="layer.screen ?? ''"
      class="layer-container"
    >
      <NarratTransition
        v-if="layer.transition"
        :name="layer.transition.transition"
        :duration="layer.transition.duration"
        :delay="layer.transition.delay"
        @complete="() => transitionComplete(index)"
      >
        <template v-slot:oldElement>
          <Layer
            v-if="layer.transition.oldScreen"
            :layer="layer.transition.oldScreen"
            :layerIndex="index"
            :transitioning="true"
          />
        </template>
        <template v-slot:newElement>
          <Layer
            v-if="layer.screen"
            :layer="layer.screen"
            :layerIndex="index"
            :transitioning="true"
          />
        </template>
      </NarratTransition>
      <Layer
        :layer="layer.screen"
        v-else-if="layer.screen"
        :layerIndex="index"
        :transitioning="false"
        :activeInteractive="activeInteractive"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCommonConfig, getScreenConfig } from '@/config';
import {
  computed,
  CSSProperties,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import { useMain } from '../stores/main-store';
import { useScreens } from '@/stores/screens-store';
import Layer from './screen-layer.vue';
import NarratTransition from './transitions/NarratTransition.vue';
import { useInputs } from '@/stores/inputs-store';
import { clamp } from '@/utils/math-utils';
import { useScreenObjects } from '@/stores/screen-objects-store';
import { InteractiveScreenElement } from './screens/screen-types';

const inputsListener = computed(() => useInputs().inGameInputListener);

const main = useMain();
const screensStore = useScreens();
const screenObjectStore = useScreenObjects();

const interactiveIndex = ref(0);

const layers = computed(() => {
  return screensStore.nonEmptyLayers;
});

const interactivesList = computed(() => {
  const interactives: InteractiveScreenElement[] = [];
  return layers.value.reduce((acc, layer, index) => {
    const screenConfig = getScreenConfig(layer.screen!);
    const buttons = screenConfig.buttons;
    if (buttons) {
      for (const button of buttons) {
        if (screensStore.isButtonClickable(button as string)) {
          acc.push({
            id: button as string,
            type: 'button',
            layer: index,
          });
        }
      }
    }
    const screenObjects = screenObjectStore.tree.filter((o) => {
      return o.layer === index;
    });
    for (const screenObject of screenObjects) {
      if (screenObjectStore.isScreenObjectClickable(screenObject)) {
        acc.push({
          id: screenObject.id,
          type: 'screenObject',
          layer: index,
        });
      }
    }
    return acc;
  }, interactives);
});

const activeInteractive = computed(() => {
  if (interactivesList.value.length === 0) {
    return null;
  }
  let index = interactiveIndex.value;
  if (index > interactivesList.value.length - 1) {
    index = interactivesList.value.length - 1;
  }
  return interactivesList.value[index];
});

const layoutWidth = computed(() => {
  return getCommonConfig().layout.backgrounds.width;
});
const layoutHeight = computed(() => {
  return getCommonConfig().layout.backgrounds.height;
});
const inGame = computed(() => {
  return main.isInGame;
});

function transitionComplete(index: number) {
  screensStore.finishTransition(index);
}
const viewportStyle = computed<CSSProperties>(() => {
  const width = layoutWidth.value;
  const height = layoutHeight.value;
  return {
    height: `${height}px`,
    width: `${width}px`,
  };
});

onMounted(() => {
  nextTick(() => {
    if (inputsListener.value) {
      const actions = inputsListener.value.actions;
      actions.previousTab = {
        press: () => {
          if (interactiveIndex.value > 0) {
            interactiveIndex.value--;
          } else {
            interactiveIndex.value = interactivesList.value.length - 1;
          }
          interactiveIndex.value = clamp(
            interactiveIndex.value,
            0,
            interactivesList.value.length - 1,
          );
        },
      };
      actions.left = actions.previousTab;
      actions.nextTab = {
        press: () => {
          if (interactiveIndex.value < interactivesList.value.length - 1) {
            interactiveIndex.value++;
          } else {
            interactiveIndex.value = 0;
          }
          interactiveIndex.value = clamp(
            interactiveIndex.value,
            0,
            interactivesList.value.length - 1,
          );
        },
      };
      actions.right = actions.nextTab;
      actions.viewportSelect = {
        press: () => {
          if (activeInteractive.value) {
            const active = activeInteractive.value;
            if (active.type === 'button') {
              screensStore.clickOnButton(active.id);
            } else if (active.type === 'screenObject') {
              screenObjectStore.clickObject(
                screenObjectStore.getObject(active.id),
              );
            }
          }
        },
      };
    }
  });
});
onUnmounted(() => {
  if (inputsListener.value) {
    const listener = inputsListener.value;
    /* eslint-disable vue/no-mutating-props */
    delete listener.actions.previousTab;
    delete listener.actions.left;

    delete listener.actions.nextTab;
    delete listener.actions.right;
    /* eslint-enable vue/no-mutating-props */
  }
});
</script>
<style>
.viewport {
  position: relative;
}
.layer-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
