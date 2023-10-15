<template>
  <div>
    <div ref="editorContainer" class="h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useGameStore } from '@/stores/game-store';
import { debounce } from 'narrat';

export type MonacoEditor = ReturnType<typeof monaco.editor.create>;
const editor = shallowRef<MonacoEditor | null>(null);
const editorContainer = ref<HTMLDivElement | null>(null);
const gameStore = useGameStore();

onMounted(() => {
  console.log('mounted');
  if (editorContainer.value) {
    if (!editor.value) {
      const scriptToEdit = gameStore.activeScript;
      if (scriptToEdit) {
        editor.value = monaco.editor.create(editorContainer.value!, {
          language: 'python',
          value: scriptToEdit.code,
          automaticLayout: true,
          theme: 'vs-dark',
        });
        editor.value.onDidChangeModelContent(
          debounce(() => {
            editorContentChanged();
          }, 1000),
        );
      } else {
        console.error('scriptToEdit is null');
      }
    }
  } else {
    console.error('editorContainer is null');
  }
});

function editorContentChanged() {
  if (editor.value) {
    gameStore.updateCurrentFileCode(editor.value.getValue());
  } else {
    console.error('editor is null');
  }
}

onUnmounted(() => {
  if (editor.value) {
    editor.value.dispose();
  }
});
</script>

<style scoped></style>
