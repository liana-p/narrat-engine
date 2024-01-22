<template>
  <div class="explorer-panel w-lg h-full">
    <span>{{ ide.openedRoot?.name }}</span>
    <ul>
      <ExplorerEntry
        v-for="entry in ide.openedRoot?.children ?? []"
        :key="entry.path"
        :entry="entry"
      />
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useIDE } from "@/stores/ide-store";
import ExplorerEntry from "./ExplorerEntry.vue";

const ide = useIDE();
</script>
