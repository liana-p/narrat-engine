<script setup lang="ts">
import { computed, ref } from "vue";
import ExplorerPanel from "@/components/explorer/ExplorerPanel.vue";
import PreviewGame from "@/components/preview/PreviewGame.vue";
import EditorPanel from "@/components/editor/EditorPanel.vue";
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
    <div class="gap-4 w-full editor-layout flex justify-between h-screen">
      <ExplorerPanel class="flex-shrink-[5]" />
      <EditorPanel :style="editorStyle" />
      <PreviewGame :style="narratStyle" />
    </div>
  </div>
</template>

<style scoped></style>
