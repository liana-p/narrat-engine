<template>
  <Transition name="fade">
    <div
      class="floating-tooltip"
      :style="style"
      ref="element"
      :class="cssClass"
    >
      <div class="floating-tooltip-title" v-if="title" :class="titleCssClass">
        {{ props.title }}
        <hr />
      </div>
      <div class="floating-tooltip-text" :class="textCssClass">
        {{ props.text }}
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useRenderingStore } from '@/lib';
import { computed, onMounted, ref } from 'vue';

export interface FloatingTooltipProps {
  title?: string;
  text: string;
  width: number;
  x: number;
  y: number;
  screenMargin?: number;
  cssClass?: string;
  textCssClass?: string;
  titleCssClass?: string;
}
const height = ref(150);
const element = ref<HTMLElement | null>(null);
const props = defineProps<FloatingTooltipProps>();
const rendering = useRenderingStore();
const style = computed((): any => {
  const screenMargin = props.screenMargin ?? 5;
  const cssStyle: any = {};
  let x = props.x - props.width / 2;
  x = Math.min(x, rendering.screenWidth - props.width - screenMargin);
  x = Math.max(screenMargin, x);
  cssStyle.left = `${x}px`;
  let y = rendering.screenHeight - props.y;
  y = Math.max(y, screenMargin);
  y = Math.min(y, rendering.screenHeight - height.value - screenMargin);
  cssStyle.bottom = `${y}px`;
  cssStyle.width = `${props.width}px`;
  return cssStyle;
});

onMounted(() => {
  if (element.value) {
    height.value = element.value.clientHeight;
  }
});
</script>
<style>
.floating-tooltip {
  position: fixed;
  background: var(--tooltip-background);
  border: var(--tooltip-border);
  border-radius: var(--tooltip-border-radius);
  padding: 10px;
  z-index: 100;
}

.floating-tooltip-title {
  font-size: var(--tooltip-title-font-size);
  color: var(--tooltip-title-color);
  font-weight: bold;
  margin-bottom: 5px;
}

.floating-tooltip-text {
  font-size: var(--tooltip-font-size);
  color: var(--tooltip-color);
}
</style>
