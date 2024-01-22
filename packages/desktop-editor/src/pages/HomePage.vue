<script setup lang="ts">
import { useIDE } from "@/stores/ide-store";
const IDE = useIDE();
</script>
<template>
  <div class="w-full bg-neutral-900">
    <div class="container mx-auto p-5">
      <h1 class="title text-center">Narrat IDE</h1>
      <button class="button" @click="IDE.selectWorkspace">
        Choose a project to open
      </button>
      <router-link to="/ide">Test</router-link>
    </div>
  </div>
</template>

<style scoped></style>
