<template>
  <div
    class="transition-holder"
    :class="styles.oldSlotClasses"
    :style="styles.oldSlotStyle"
    v-if="state !== 'end'"
  >
    <slot name="oldElement" :class="styles.oldSlotClasses"></slot>
  </div>
  <div
    class="transition-holder"
    :class="styles.newSlotClasses"
    :style="styles.newSlotStyle"
  >
    <slot name="newElement"></slot>
  </div>
</template>
<script setup lang="ts">
import { timeout } from '@/utils/promises';
import { onMounted, reactive, ref } from 'vue';

const emits = defineEmits(['complete']);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  delay: Number,
});
const state = ref<'start' | 'end'>('start');
const styles = reactive<{ [key: string]: { [key: string]: any } }>({
  oldSlotClasses: {},
  oldSlotStyle: {},
  newSlotClasses: {},
  newSlotStyle: {},
});
onMounted(async () => {
  // 1. Setup default state of both things
  const prefix = `narrat-transition-${props.name}`;
  styles.newSlotClasses = {
    [`${prefix}-enter-from`]: true,
    [`${prefix}-enter-active`]: true,
  };
  styles.oldSlotStyle = {
    transitionDuration: `${props.duration / 1000}s`,
  };
  styles.newSlotStyle = {
    transitionDuration: `${props.duration / 1000}s`,
  };
  styles.oldSlotClasses = {
    [`${prefix}-leave-active`]: true,
  };
  // 2. Wait a bit so that the styles are registered, and start making old leave
  await timeout(30);
  styles.oldSlotClasses[`${prefix}-leave-to`] = true;
  // 3. Wait for the delay or duration to finish, then make the new one enter
  await timeout(props.delay ?? 0);
  delete styles.newSlotClasses[`${prefix}-enter-from`];
  // // 4. Wait for the final step of the transition
  await timeout(props.duration);
  delete styles.newSlotClasses[`${prefix}-enter-active`];
  delete styles.oldSlotClasses[`${prefix}-leave-active`];
  state.value = 'end';
  emits('complete');
});
</script>
<style>
.transition-holder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
