<template>
  <div class="narrat-preview" ref="narratContainer"></div>
</template>

<script setup lang="ts">
import 'narrat/dist/style.css';
import { startApp, stopApp, restartApp } from 'narrat';
import { onMounted, ref, defineProps } from 'vue';
import { gameConfig } from '../data/defaultGameConfig';

const narratContainer = ref<HTMLDivElement | null>(null);
const isNarratRunning = ref<boolean>(false);

const props = defineProps<{
  scriptContent: string;
}>();

const script = ref({
  fileName: 'demo-script.narrat',
  code: props.scriptContent,
  id: 'demo-script',
  type: 'script',
});

onMounted(() => {
  launchNarratGame();
});

function launchNarratGame() {
  if (narratContainer.value) {
    if (!isNarratRunning.value) {
      startNarratApp();
    }
  } else {
    console.error('narratContainer is null');
  }
}

function stopNarratGame() {
  stopApp();
  isNarratRunning.value = false;
}
function restartNarratGame() {
  restartApp();
}

function startNarratApp() {
  startApp({
    debug: true,
    logging: false,
    scripts: [script.value],
    container: narratContainer.value!,
    config: gameConfig as any,
  });
  isNarratRunning.value = true;
}
</script>

<style scoped>
.narrat-preview {
  width: 100%;
  aspect-ratio: 1280/720;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
