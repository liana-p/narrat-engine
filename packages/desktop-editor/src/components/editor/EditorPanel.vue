<template>
  <div>
    <div ref="editorContainer" class="h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, watch } from "vue";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { debounce } from "narrat";
import { useIDE } from "@/stores/ide-store";

export type MonacoEditor = ReturnType<typeof monaco.editor.create>;
const editor = shallowRef<MonacoEditor | null>(null);
const editorContainer = ref<HTMLDivElement | null>(null);
const ide = useIDE();

onMounted(() => {
  console.log("mounted");
  if (editorContainer.value) {
    if (!editor.value) {
      editor.value = monaco.editor.create(editorContainer.value!, {
        language: "narrat",
        value: "",
        automaticLayout: true,
        theme: "vs-dark",
      });
      editor.value.onDidChangeModelContent(
        debounce(() => {
          editorContentChanged();
        }, 1000),
      );
    }
  } else {
    console.error("editorContainer is null");
  }
});

watch(
  () => ide.currentFile?.content,
  (content) => {
    if (!content) {
      editor.value?.setValue("");
    } else {
      editor.value?.setValue(content);
    }
  },
);

function editorContentChanged() {
  if (editor.value) {
    ide.updateCurrentFileCode(editor.value.getValue());
  } else {
    console.error("editor is null");
  }
}

onUnmounted(() => {
  if (editor.value) {
    editor.value.dispose();
  }
});
</script>

<style scoped></style>
