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
    >
      {{ getButtonConfig(button as string).text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getConfig, getButtonConfig, getImageUrl } from '@/config';
import { computed, CSSProperties } from 'vue';
import { useMain } from '../stores/main-store';
import { ButtonStateValue, useScreens } from '@/stores/screens-store';
import { useVM } from '@/stores/vm-store';
import { useInventory } from '@/stores/inventory-store';

const props = defineProps({
  layer: String,
  transitioning: {
    type: Boolean,
    default: false,
  },
});
const vmStore = useVM();
const main = useMain();
const screensStore = useScreens();

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
  const conf = getConfig().screens[currentScreen.value];
  if (!conf) {
    throw new Error(`Screen ${currentScreen.value} doesn't have a config`);
  }
  return conf;
});
const screenButtons = computed(() => {
  return screenConfig.value.buttons || [];
});

const inGame = computed(() => {
  return main.isInGame;
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
  const config = getButtonConfig(button);
  const buttonValue = buttonsState.value[button];
  const tag = config.tag || 'default';
  const state = buttonValue.state;
  if (state === true) {
    if (useInventory().isInteractionTagBlocked(tag)) {
      return 'greyed';
    }
  }
  return state;
}

function isButtonDisabled(button: string) {
  const state = getButtonState(button);
  return state === 'hidden' || state === 'greyed' || state === false;
}

function getButtonClass(button: string): { [key: string]: boolean } {
  const state = getButtonState(button);
  const css: any = {};
  if (state === true) {
    css.interactable = true;
  } else {
    css.disabled = true;
    if (state === 'greyed') {
      css.greyed = true;
    } else if (state === 'hidden' || state === false) {
      css.hidden = true;
    }
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
  if (isButtonDisabled(button)) {
    return;
  }
  if (props.transitioning) {
    return;
  }
  const config = getButtonConfig(button);
  const state = buttonsState.value[button];
  if (state.state === true) {
    const scriptToRun = config.action;
    if (config.actionType === 'run') {
      vmStore.runLabelFunction(scriptToRun);
    } else {
      vmStore.jumpToLabel(scriptToRun);
    }
  }
}
const layerStyle = computed<CSSProperties>(() => {
  return {
    backgroundImage: `url(${getImageUrl(screenConfig.value.background)})`,
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
  background: var(--light-background);
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.viewport-button.interactable {
  cursor: pointer;
  animation: pulse 0.8s infinite;
  animation-timing-function: linear;
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
</style>
