<template>
  <div
    class="viewport-layer"
    :id="`viewport-layer-${currentScreen}`"
    :style="layerStyle"
    v-if="inGame"
  >
    <!-- Note: This is not a button because of a firefox bug where disabled buttons eat keyboard events, breaking the global keyboard listener -->
    <div
      v-for="(button, index) in screenButtons"
      :key="index"
      tabindex="-1"
      class="viewport-button"
      :class="getButtonClass(button as string)"
      :id="`viewport-button-${button}`"
      @click="clickOnButton(button as string)"
      :style="getButtonStyle(button as string)"
      v-html="getButtonText(button as string)"
    ></div>
    <ScreenObject
      v-for="screenObject in screenObjects"
      :key="screenObject.id"
      :screenObject="screenObject"
      :transitioning="transitioning"
      :selected="isScreenObjectSelected(screenObject)"
    />
  </div>
</template>

<script setup lang="ts">
import {
  getConfig,
  getButtonConfig,
  getImageUrl,
  getScreenConfig,
} from '@/config';
import { computed, CSSProperties } from 'vue';
import { useMain } from '../stores/main-store';
import { ButtonStateValue, useScreens } from '@/stores/screens-store';
import { useVM } from '@/stores/vm-store';
import {
  ScreenObjectState,
  useScreenObjects,
} from '@/stores/screen-objects-store';
import { processText } from '@/utils/string-helpers';
import { audioEvent } from '@/utils/audio-loader';
import { error } from '@/utils/error-handling';
import ScreenObject from './screen-objects/screen-object.vue';
import { EMPTY_SCREEN } from '@/constants';
import { InteractiveScreenElement } from './screens/screen-types';

const props = defineProps<{
  layer: string;
  layerIndex: number;
  transitioning: boolean;
  activeInteractive?: InteractiveScreenElement | null;
}>();
const vmStore = useVM();
const main = useMain();
const screensStore = useScreens();
const screenObjectsStore = useScreenObjects();

const isLayerSelected = computed(() => {
  return (
    props.activeInteractive &&
    props.activeInteractive.layer === props.layerIndex
  );
});

function isButtonSelected(button: string) {
  if (!isLayerSelected.value) {
    return false;
  }
  const active = props.activeInteractive!;
  if (active.type === 'button' && active.id === button) {
    return true;
  }
  return false;
}
function isScreenObjectSelected(screenObject: ScreenObjectState) {
  if (!isLayerSelected.value) {
    return false;
  }
  const active = props.activeInteractive!;
  if (active.type === 'screenObject' && active.id === screenObject.id) {
    return true;
  }
  return false;
}

const screenObjects = computed(() => {
  return screenObjectsStore.tree.filter((o) => o.layer === props.layerIndex);
});
const layoutWidth = computed(() => {
  return getConfig().layout.backgrounds.width;
});
const layoutHeight = computed(() => {
  return getConfig().layout.backgrounds.height;
});
const currentScreen = computed(() => {
  return props.layer!;
});
const buttonsState = computed(() => {
  return screensStore.buttons;
});

const screenConfig = computed(() => {
  const conf = getScreenConfig(currentScreen.value);
  if (!conf) {
    console.log(currentScreen);
    error(`Screen ${currentScreen.value} doesn't have a config`);
  }
  return conf;
});

const inGame = computed(() => {
  return main.isInGame;
});

// Buttons
const screenButtons = computed(() => {
  return screenConfig.value.buttons || [];
});
function getButtonImageUrl(button: string): string | undefined {
  const config = getButtonConfig(button);
  const background = config.background;
  if (!background) {
    return undefined;
  }
  return getImageUrl(background);
}

function getButtonState(button: string): ButtonStateValue {
  return screensStore.getButtonState(button);
}

function getButtonClass(button: string): { [key: string]: boolean } {
  const state = getButtonState(button);
  const css: any = {};
  if (isButtonSelected(button)) {
    css.selected = true;
  }
  if (screensStore.isButtonClickable(button)) {
    css.interactable = true;
  } else {
    css.disabled = true;
    if (state === 'greyed') {
      css.greyed = true;
    } else if (state === 'hidden' || state === false) {
      css.hidden = true;
    }
  }
  const conf = getButtonConfig(button);
  if (conf.cssClass) {
    css[conf.cssClass] = true;
  }
  return css;
}
function getButtonStyle(button: string): CSSProperties {
  const config = getButtonConfig(button);
  const style: CSSProperties = {};
  const state = getButtonState(button);
  if (config.position.width) {
    style.width = `${config.position.width}px`;
  }
  if (config.position.height) {
    style.height = `${config.position.height}px`;
  }
  if (config.background) {
    style.backgroundImage = `url(${getButtonImageUrl(button)})`;
  }
  let left = config.position.left;
  let top = config.position.top;
  if (config.anchor) {
    left = config.position.left - config.position.width! * config.anchor.x;
    top = config.position.top - config.position.height! * config.anchor.y;
  }
  return {
    ...style,
    left: `${left}px`,
    top: `${top}px`,
  };
}

function clickOnButton(button: string) {
  if (!screensStore.isButtonClickable(button)) {
    return;
  }
  if (props.transitioning) {
    return;
  }
  const config = getButtonConfig(button);
  const state = buttonsState.value[button];
  if (state.state === true) {
    audioEvent('onButtonClicked');
    const scriptToRun = config.action;
    if (!scriptToRun) {
      return;
    }
    if (config.actionType === 'run') {
      vmStore.runLabelFunction(scriptToRun);
    } else {
      vmStore.jumpToLabel(scriptToRun);
    }
  }
}

function getButtonText(button: string): string {
  const config = getButtonConfig(button);
  const baseText = config.text ?? '';
  return processText(baseText);
}

const layerStyle = computed<CSSProperties>(() => {
  let backgroundImage: string | undefined = `url(${getImageUrl(
    screenConfig.value.background,
  )})`;
  if (screenConfig.value.background === EMPTY_SCREEN) {
    backgroundImage = undefined;
  }
  return {
    backgroundImage,
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

.viewport-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--button-background);
  color: var(--button-text-color);
  font-size: 1.8rem;
  font-weight: bold;
}

.viewport-button.interactable {
  cursor: pointer;
  pointer-events: auto;
}

.viewport-button.disabled {
  pointer-events: none;
  user-select: none;
}

.viewport-button.greyed {
  opacity: 0.3;
}

.viewport-button.hidden {
  opacity: 0;
  display: none;
}

.viewport-button.selected {
  border: 2px solid cyan;
}

@keyframes sprite-appear {
  /* Make an animation rotating the logo in 3d */
  0% {
    transform: perspective(10000px) rotateX(-120deg) scale(1);
  }
  80% {
    transform: perspective(10000px) rotateX(10deg) scale(1.05, 1.05);
  }

  100% {
    transform: perspective(10000px) rotateX(0deg) scale(1, 1);
  }
}
</style>
