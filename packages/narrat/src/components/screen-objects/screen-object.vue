<template>
  <div
    :key="object.id"
    tabindex="-1"
    class="viewport-object"
    :class="getObjectClass(object)"
    :id="`viewport-object-${object.id}`"
    @click="clickOnObject(object)"
    :style="getObjectStyle(object)"
  >
    {{ object.text ? processText(object.text) : undefined }}
    <ScreenObject
      :transitioning="transitioning"
      v-for="child in children"
      :key="child.id"
      :object="child"
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
  object: ScreenObjectState;
  transitioning: boolean;
}>();

const screenObjectsStore = useScreenObjects();

const children = computed(() => {
  return props.object.children.map((child) =>
    screenObjectsStore.getObject(child),
  );
});

// Sprites
function clickOnObject(object: ScreenObjectState) {
  if (props.transitioning) {
    return;
  }
  if (object.onClick) {
    useScreenObjects().clickObject(object);
  }
}

function getObjectClass(object: ScreenObjectState): { [key: string]: boolean } {
  const css: any = {};
  if (object.onClick) {
    css.interactable = true;
  } else {
    css.disabled = true;
  }
  if (object.cssClass) {
    css[object.cssClass] = true;
  }
  return css;
}

function getObjectStyle(object: ScreenObjectState): CSSProperties {
  const style: CSSProperties = {};
  if (object.opacity !== 1) {
    style.opacity = object.opacity;
  }
  let left = object.x;
  let top = object.y;
  if (object.anchor) {
    const anchor = object.anchor;
    left = object.x - object.width * anchor.x;
    top = object.y - object.height * anchor.y;
    style.transformOrigin = `${anchor.x * 100}% ${anchor.y * 100}%`;
  }
  let width = object.width;
  let height = object.height;
  if (object.scale) {
    width = width * object.scale;
    height = height * object.scale;
  }
  const css: CSSProperties = {
    ...style,
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  };
  if (isSprite(object)) {
    css.backgroundImage = `url(${getImageUrl(object.image)})`;
  }
  return css;
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
