<script setup lang="ts">
import { computed, ref } from 'vue';
import MonacoEditor from './components/MonacoEditor.vue';
import NarratPreview from './components/NarratPreview.vue';

const narratSize = ref(50);

function setNarratSize(size: number) {
  narratSize.value = Math.max(0, Math.min(100, size));
}
function grow() {
  setNarratSize(narratSize.value + 10);
}
function shrink() {
  setNarratSize(narratSize.value - 10);
}
const narratStyle = computed(() => {
  return {
    width: `${narratSize.value}%`,
  };
});
const editorStyle = computed(() => {
  return {
    width: `${100 - narratSize.value}%`,
  };
});
</script>
<template>
  <div class="w-full bg-neutral-900">
    <div class="container mx-auto p-5">
      <h1 class="title text-center">Narrat Demo Editor!</h1>
      <p class="text">
        You can play the demo, or edit the narrat scripts and see your changes
        reflected live!
      </p>
    </div>
    <div class="gap-4 w-full editor-layout flex justify-between h-screen">
      <MonacoEditor class="h-screen transition-all" :style="editorStyle" />
      <NarratPreview
        class="game-preview h-screen z-30 transition-all"
        :style="narratStyle"
        @bigger="grow"
        @smaller="shrink"
      />
    </div>
  </div>
</template>

<style scoped></style>
