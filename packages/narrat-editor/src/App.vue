<script setup lang="ts">
import MonacoEditor from './components/MonacoEditor.vue';
import NarratPreview from './components/NarratPreview.vue';
</script>
<template>
  <div class="w-full bg-neutral-900">
    <div class="container mx-auto p-5">
      <h1 class="title text-center">Narrat Editor!</h1>
      <p class="text">
        Edit your narrat scripts on the left, the game will live reload on the
        right.
      </p>
    </div>
    <div class="gap-4 w-full editor-layout flex justify-between h-screen">
      <MonacoEditor class="flex-grow h-screen w-1/2" />
      <NarratPreview class="game-preview flex-grow h-screen w-1/2" />
    </div>
  </div>
</template>

<style scoped></style>
