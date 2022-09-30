<template>
  <Transition name="fade">
    <div class="floating-tooltip" :style="style">
      <div class="floating-tooltip-title" v-if="title">
        {{ props.title }}
        <hr />
      </div>
      <div class="floating-tooltip-text">
        {{ props.text }}
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

export interface FloatingTooltipProps {
  title?: string;
  text: string;
  width: number;
  x: number;
  y: number;
}
const height = ref(150);

const props = defineProps<FloatingTooltipProps>();

const style = computed((): any => {
  const cssStyle: any = {};
  let x = props.x - props.width / 2;
  x = Math.min(x, window.innerWidth - x - 5);
  x = Math.max(props.width / 2, x);
  cssStyle.left = `${x}px`;
  let y = window.innerHeight - props.y;
  y = Math.min(y, window.innerHeight - 5);
  y = Math.max(y, height.value + 5);
  cssStyle.bottom = `${y}px`;
  cssStyle.width = `${props.width}px`;
  return cssStyle;
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
