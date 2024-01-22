<script setup lang="ts">
import { computed, ref } from "vue";
import MonacoEditor from "@/components/MonacoEditor.vue";
// import NarratPreview from "@/components/NarratPreview.vue";
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
    <!-- <div class="container mx-auto p-5">
      <h1 class="title text-center">Narrat Demo Editor!</h1>
      <ul>
        <li>
          🎮 Press <b>New Game</b> to play interactive demo that shows you how
          the engine works.
        </li>
        <li>
          ✏️ <b>Try changing the dialogue</b> script on the left to edit the
          game yourself as you play!
        </li>
        <li>
          ✅ When you're done, head to the
          <a href="https://docs.narrat.dev" target="_blank" rel="noopener"
            >documentation website</a
          >
          to learn how to continue with making your own game!
        </li>
      </ul>
    </div> -->
    <div class="gap-4 w-full editor-layout flex justify-between h-screen">
      <ExplorerPanel class="flex-shrink-[5]" />
      <EditorPanel :style="editorStyle" />
      <!-- <MonacoEditor class="h-screen transition-all" :style="editorStyle" /> -->
      <PreviewGame :style="narratStyle" />
      <!-- <NarratPreview
        class="game-preview h-screen z-30 transition-all"
        :style="narratStyle"
        @bigger="grow"
        @smaller="shrink"
      /> -->
    </div>
  </div>
</template>

<style scoped></style>
