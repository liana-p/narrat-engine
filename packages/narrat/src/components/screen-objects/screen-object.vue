<template>
  <div
    tabindex="-1"
    class="viewport-object"
    :class="objectClass"
    :id="`viewport-object-${props.screenObject.id}`"
    @click="clickOnObject(screenObject)"
    :style="objectStyle"
  >
    <span
      v-html="
        props.screenObject.text
          ? processText(props.screenObject.text)
          : undefined
      "
    />
    <ScreenObject
      :transitioning="transitioning"
      v-for="child in props.screenObject.children"
      :key="child.id"
      :screenObject="child"
    />
  </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '@/config';
import { computed, CSSProperties } from 'vue';
import {
  useScreenObjects,
  ScreenObjectState,
  isSprite,
} from '@/stores/screen-objects-store';
import { processText } from '@/utils/string-helpers';

const props = defineProps<{
  screenObject: ScreenObjectState;
  transitioning: boolean;
  selected: boolean;
}>();

const screenObjectsStore = useScreenObjects();
// Sprites
function clickOnObject(screenObject: ScreenObjectState) {
  if (props.transitioning) {
    return;
  }
  if (props.screenObject.onClick) {
    screenObjectsStore.clickObject(screenObject);
  }
}

const objectClass = computed(() => {
  const css: any = {};
  if (props.selected) {
    css.selected = true;
  }
  if (screenObjectsStore.isScreenObjectClickable(props.screenObject)) {
    css.interactable = true;
  } else {
    css.disabled = true;
  }
  if (props.screenObject.cssClass) {
    css[props.screenObject.cssClass] = true;
  }
  return css;
});

const objectStyle = computed(() => {
  const style: CSSProperties = {};
  if (props.screenObject.opacity !== 1) {
    style.opacity = props.screenObject.opacity;
  }
  let left = props.screenObject.x;
  let top = props.screenObject.y;
  let width = props.screenObject.width;
  let height = props.screenObject.height;
  if (props.screenObject.anchor) {
    const anchor = props.screenObject.anchor;
    left = props.screenObject.x - width * anchor.x;
    top = props.screenObject.y - height * anchor.y;
    style.transformOrigin = `${anchor.x * 100}% ${anchor.y * 100}%`;
  }
  if (props.screenObject.scale) {
    width = width * props.screenObject.scale;
    height = height * props.screenObject.scale;
  }
  const css: CSSProperties = {
    ...style,
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  };
  if (isSprite(props.screenObject)) {
    css.backgroundImage = `url(${getImageUrl(props.screenObject.image)})`;
  }
  return css;
});
</script>
<style>
.viewport-object {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  background-size: cover;
  background-repeat: no-repeat;
}

.viewport-object.selected {
  border: 2px solid cyan;
}

.viewport-object.interactable {
  cursor: pointer;
  pointer-events: auto;
}
.viewport-object.disabled {
  pointer-events: none;
  user-select: none;
}
</style>
