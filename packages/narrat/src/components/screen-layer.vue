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
    <div
      v-for="sprite in sprites"
      :key="sprite.id"
      tabindex="-1"
      class="viewport-sprite"
      :class="getSpriteClass(sprite)"
      :id="`viewport-sprite-${sprite.id}`"
      @click="clickOnSprite(sprite)"
      :style="getSpriteStyle(sprite)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { getConfig, getButtonConfig, getImageUrl } from '@/config';
import { computed, CSSProperties } from 'vue';
import { useMain } from '../stores/main-store';
import { ButtonStateValue, useScreens } from '@/stores/screens-store';
import { useVM } from '@/stores/vm-store';
import { useInventory } from '@/stores/inventory-store';
import { SpriteState, useSprites } from '@/stores/sprites-store';
import { processText } from '@/utils/string-helpers';
import { audioEvent } from '@/utils/audio-loader';
import { error } from '@/utils/error-handling';

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
const spritesStore = useSprites();
const sprites = computed(() => {
  return spritesStore.sprites;
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
  const conf = getConfig().screens[currentScreen.value];
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
  if (isButtonDisabled(button)) {
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
  return {
    backgroundImage: `url(${getImageUrl(screenConfig.value.background)})`,
    width: `${layoutWidth.value}px`,
    height: `${layoutHeight.value}px`,
  };
});

// Sprites
function clickOnSprite(sprite: SpriteState) {
  if (props.transitioning) {
    return;
  }
  if (sprite.onClick) {
    audioEvent('onSpriteClicked');
    vmStore.runLabelFunction(sprite.onClick);
  }
}

function getSpriteClass(sprite: SpriteState): { [key: string]: boolean } {
  const css: any = {};
  if (sprite.onClick) {
    css.interactable = true;
  } else {
    css.disabled = true;
  }
  if (sprite.cssClass) {
    css[sprite.cssClass] = true;
  }
  return css;
}

function getSpriteStyle(sprite: SpriteState): CSSProperties {
  const style: CSSProperties = {};
  if (sprite.opacity !== 1) {
    style.opacity = sprite.opacity;
  }
  let left = sprite.x;
  let top = sprite.y;
  if (sprite.anchor) {
    const anchor = sprite.anchor;
    left = sprite.x - sprite.width * anchor.x;
    top = sprite.y - sprite.height * anchor.y;
    style.transformOrigin = `${anchor.x * 100}% ${anchor.y * 100}%`;
  }
  let width = sprite.width;
  let height = sprite.height;
  if (sprite.scale) {
    width = width * sprite.scale;
    height = height * sprite.scale;
  }
  return {
    ...style,
    left: `${left}px`,
    top: `${top}px`,
    backgroundImage: `url(${getImageUrl(sprite.image)})`,
    width: `${width}px`,
    height: `${height}px`,
  };
}
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
  animation: pulse 0.8s infinite;
  animation-timing-function: linear;
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

.viewport-sprite {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  background-size: cover;
  background-repeat: no-repeat;
  animation: sprite-appear 0.3s ease-in;
}

.viewport-sprite.interactable {
  cursor: pointer;
  pointer-events: auto;
}
.viewport-sprite.disabled {
  pointer-events: none;
  user-select: none;
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
