<template>
  <!-- Note: This is not a button because of a firefox bug where disabled buttons eat keyboard events, breaking the global keyboard listener -->
  <div
    tabindex="-1"
    class="viewport-button"
    :class="buttonClass"
    :id="`viewport-button-${id}`"
    @click="clickOnButton()"
    :style="buttonStyle"
    v-html="text"
  ></div>
</template>

<script setup lang="ts">
import { CSSProperties, computed } from 'vue';
import { useScreens } from '@/stores/screens-store';
import { InteractiveScreenElement } from './screen-types';
import { getButtonConfig, getImageUrl } from '@/config';
import { processText } from '@/utils/string-helpers';
import { useVM } from '@/stores/vm-store';
import { audioEvent } from '@/utils/audio-loader';
import { getCSSClassForButton } from '@/utils/interact-utils';

const props = defineProps<{
  id: string;
  layerSelected: boolean;
  transitioning: boolean;
  activeInteractive?: InteractiveScreenElement | null;
}>();

const screensStore = useScreens();
const state = computed(() => {
  return screensStore.getButtonState(props.id);
});

const config = getButtonConfig(props.id);
const buttonImageUrl = config.background
  ? getImageUrl(config.background)
  : null;

const selected = computed(() => {
  if (!props.layerSelected) {
    return false;
  }
  const active = props.activeInteractive!;
  if (active.type === 'button' && active.id === props.id) {
    return true;
  }
  return false;
});

const clickable = computed(() => {
  return screensStore.isButtonClickable(props.id);
});

const text = computed(() => {
  const baseText = config.text ?? '';
  return processText(baseText);
});

const buttonClass = computed(() => {
  return getCSSClassForButton(props.id, selected.value, props.transitioning);
});

const buttonStyle = computed(() => {
  const style: CSSProperties = {};
  if (config.position.width) {
    style.width = `${config.position.width}px`;
  }
  if (config.position.height) {
    style.height = `${config.position.height}px`;
  }
  if (config.background) {
    style.backgroundImage = `url(${buttonImageUrl})`;
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
});

function clickOnButton() {
  screensStore.clickOnButton(props.id);
}
</script>

<style>
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
  border: var(--selected-border);
}
</style>
