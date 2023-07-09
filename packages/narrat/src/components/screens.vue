<template>
  <div
    class="viewport"
    id="narrat-viewport"
    :style="viewportStyle"
    v-if="inGame"
  >
    <div v-for="(layer, index) in layers" :key="index" class="layer-container">
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
import { getConfig, getScreenConfig } from '@/config';
import {
  computed,
  CSSProperties,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import { useRenderingStore } from '../stores/rendering-store';
import { useMain } from '../stores/main-store';
import { useScreens } from '@/stores/screens-store';
import Layer from './screen-layer.vue';
import NarratTransition from './transitions/NarratTransition.vue';
import { InputListener } from '@/stores/inputs-store';
import { clamp } from '@/utils/math-utils';

const props = defineProps<{
  inputListener: InputListener | null;
}>();
const rendering = useRenderingStore();
const main = useMain();
const screensStore = useScreens();
const interactiveIndex = ref(0);

const layers = computed(() => {
  return screensStore.nonEmptyLayers;
});

const interactivesList = computed(() => {
  return screensStore.interactivesList;
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

const layoutMode = computed(() => {
  return rendering.layoutMode;
});
const layoutWidth = computed(() => {
  return getConfig().layout.backgrounds.width;
});
const layoutHeight = computed(() => {
  return getConfig().layout.backgrounds.height;
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
  if (layoutMode.value === 'vertical') {
    // width = window.innerWidth;
    // const ratio = width / layoutWidth.value;
    // height = layoutHeight.value * ratio;
  }
  return {
    height: `${height}px`,
    width: `${width}px`,
  };
});

onMounted(() => {
  nextTick(() => {
    if (props.inputListener) {
      const actions = props.inputListener.actions;
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
      actions.up = actions.previousTab;
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
      actions.down = actions.nextTab;
    }
  });
});
onUnmounted(() => {
  if (props.inputListener) {
    // eslint-disable-next-line vue/no-mutating-props
    delete props.inputListener.actions.previousTab;
    // eslint-disable-next-line vue/no-mutating-props
    delete props.inputListener.actions.nextTab;
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
