<template>
  <div class="chapter-title-scene">
    <h1 class="title chapter-title" v-html="props.options.title"></h1>
    <h2
      class="subtitle chapter-subtitle"
      v-if="props.options.subtitle"
      v-html="props.options.subtitle"
    ></h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useScenes } from '@/stores/scenes-store';
import { useVM } from '@/stores/vm-store';

const props = defineProps<{
  options: {
    next_label: string;
    title: string;
    subtitle?: string;
    duration?: number;
  };
}>();

const timeout = ref<any>(null);
function finishedTimeout() {
  timeout.value = null;
  useScenes().changeScene('playing');
  useVM().jumpToLabel(props.options.next_label);
}
onMounted(() => {
  timeout.value = setTimeout(finishedTimeout, props.options.duration ?? 2000);
});
onUnmounted(() => {
  if (timeout.value) {
    clearTimeout(timeout.value);
    timeout.value = null;
  }
});
</script>

<style>
.chapter-title-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.title.chapter-title {
  font-size: 3rem;
  text-decoration: underline;
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: var(--title-font);
  color: var(--title-color);
  margin-bottom: 5rem;
}
.subtitle.chapter-subtitle {
  font-size: 2rem;
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: var(--title-font);
  color: var(--title-color);
  margin-bottom: 5rem;
}
</style>
