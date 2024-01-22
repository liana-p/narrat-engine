<template>
  <div>
    <div class="h-full">
      <div
        class="w-full h-8 border-light-100 border-blue-50 flex justify-center items-center"
        v-if="ide.currentFile"
      >
        <span class="text-lg"
          >{{ ide.currentFile.name }}
          <v-icon name="oi-dot-fill" v-if="hasUnsavedChanges"
        /></span>
      </div>
      <div ref="editorContainer" class="h-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
  ShallowRef,
  computed,
} from "vue";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { debounce } from "narrat";
import { useIDE } from "@/stores/ide-store";
import { OpenedFile } from "@/filesystem/file-types";

export type MonacoEditor = ReturnType<typeof monaco.editor.create>;
const editor = shallowRef<MonacoEditor | null>(null);
const editorContainer = ref<HTMLDivElement | null>(null);
const ide = useIDE();
const models = ref<Record<string, ShallowRef<monaco.editor.ITextModel>>>({});
const hasUnsavedChanges = computed(() => {
  return ide.currentFile?.unsavedChanges ?? false;
});

onMounted(() => {
  console.log("mounted");
  if (editorContainer.value) {
    if (!editor.value) {
      editor.value = monaco.editor.create(editorContainer.value!, {
        language: "narrat",
        value: "main:\n  talk player idle hello",
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
  () => ide.currentFile,
  (file) => {
    if (!editor.value) {
      return;
    }
    if (!file?.content) {
      editor.value.setValue("");
    } else {
      // editor.value.setValue(file.content);
      // (editor.value.getModel() as any).setLanguage(detectSyntax(file));
      const existingModel = getModel(file.path);
      if (existingModel) {
        editor.value.setModel(existingModel);
        editor.value.setValue(file.content);
      } else {
        const model = createModel(file.path, file.content);
        editor.value.setModel(model);
      }
    }
  },
);

function editorContentChanged() {
  if (editor.value) {
    ide.updateCurrentFileCode(editor.value.getValue());
    hasUnsavedChanged.value = true;
  } else {
    console.error("editor is null");
  }
}

function getModel(path: string) {
  console.log("getting model for ", path);
  console.log(models.value);
  if (models.value[path]?.value) {
    return models.value[path].value;
  } else {
    return null;
  }
}

function createModel(path: string, content: string) {
  // const uri = monaco.Uri.parse(path);
  const syntax = detectSyntax(ide.currentFile!);
  console.log(`Creating model for language ${syntax}`);
  const model = monaco.editor.createModel(content, syntax);
  models.value[path] = shallowRef(model);
  return model;
}

function detectSyntax(file: OpenedFile) {
  const name = file.name;
  const extension = name.split(".").pop();
  switch (extension) {
    case "narrat":
      return "narrat";
    case "ts":
      return "typescript";
    case "js":
      return "javascript";
    case "json":
      return "json";
    case "html":
      return "html";
    case "css":
      return "css";
    case "md":
      return "markdown";
    case "yaml":
      return "yaml";
    default:
      return "narrat";
  }
}

onUnmounted(() => {
  if (editor.value) {
    editor.value.dispose();
  }
});
</script>

<style scoped></style>
