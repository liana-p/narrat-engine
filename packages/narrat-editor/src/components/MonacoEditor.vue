<template>
  <div>
    <div ref="editor-container">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import monaco from 'monaco-editor';

export type MonacoEditor = ReturnType<typeof monaco.editor.create>;
const editor = ref<MonacoEditor | null>(null);
const editorContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  editor.value = monaco.editor.create(editorContainer.value!, {
    automaticLayout: true,
    language: 'python',
    value: `main:
  talk player idle "Hello, world!"`
  });
})
</script>

<style scoped>

</style>