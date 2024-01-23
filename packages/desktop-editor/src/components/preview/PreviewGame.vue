<template>
  <div class="preview-game w-full h-full">
    <iframe
      v-if="ide.isGameOpen"
      ref="gameFrame"
      class="w-full h-full"
      src="http://localhost:5282"
    />
    <button @click="reload">Reload</button>
  </div>
</template>
<script setup lang="ts">
import { useIDE } from "@/stores/ide-store";
import { ref } from "vue";

const ide = useIDE();

const gameFrame = ref<HTMLIFrameElement | null>(null);

function reload() {
  gameFrame.value?.contentWindow?.location.reload();
}
</script>
