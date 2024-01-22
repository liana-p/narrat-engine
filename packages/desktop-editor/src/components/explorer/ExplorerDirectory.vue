<template>
  <li>
    <span @click="toggle"
      ><v-icon
        :name="opened ? 'md-keyboardarrowdown' : 'md-keyboardarrowright'"
      />
      {{ directory.name }}</span
    >
    <ul class="mx-2" v-if="opened">
      <li v-for="entry in directory.children" :key="entry.path">
        <ExplorerEntry :entry="entry" />
      </li>
    </ul>
  </li>
</template>
<script setup lang="ts">
import { BiArrowReturnRight } from "oh-vue-icons/icons";
import { ref } from "vue";
import { OpenedDirectory } from "@/filesystem/file-types";
import ExplorerEntry from "./ExplorerEntry.vue";

defineProps<{
  directory: OpenedDirectory;
}>();

const opened = ref(false);

function toggle() {
  opened.value = !opened.value;
}
</script>
