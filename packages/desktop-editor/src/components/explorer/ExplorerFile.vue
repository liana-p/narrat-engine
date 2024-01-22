<template>
  <li @click="openFile">
    <span class="text-gray-400">|</span> {{ file.name }}
  </li>
</template>
<script setup lang="ts">
import { OpenedFile } from "@/filesystem/file-types";
import { useIDE } from "@/stores/ide-store";
const ide = useIDE();

const props = defineProps<{
  file: OpenedFile;
}>();

function openFile() {
  ide.openFile(props.file);
}
</script>
