<template>
  <ExplorerDirectory
    v-if="entry.children"
    :directory="entry as OpenedDirectory"
  />
  <ExplorerFile v-else :file="entry as OpenedFile" />
</template>
<script setup lang="ts">
import {
  OpenedDirectory,
  OpenedEntry,
  OpenedFile,
} from "@/filesystem/file-types";
import ExplorerDirectory from "./ExplorerDirectory.vue";
import ExplorerFile from "./ExplorerFile.vue";

defineProps<{
  entry: OpenedEntry;
}>();
</script>
