<template>
  <div class="narrat-preview relative">
    <div class="controls absolute z-50">
      <button
        class="border border-cyan-400 mr-4"
        v-for="control in controls"
        :key="control"
        @click="(e) => controlButtonPressed(control, e)"
      >
        {{ control }}
      </button>
    </div>
    <div
      class="relative flex justify-center items-center w-full h-full"
      ref="narratContainer"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { startApp, handleHMR, NarratScript, stopApp, restartApp } from 'narrat';
import { computed, onMounted, ref, watch } from 'vue';
import { FileState, useGameStore } from '@/stores/game-store';

const narratContainer = ref<HTMLDivElement | null>(null);
const isNarratRunning = ref<boolean>(false);

const controls = ref([
  'reload',
  'stop',
  'start',
  'fullscreen',
  'bigger',
  'smaller',
]);

const gameStore = useGameStore();

const emit = defineEmits(['bigger', 'smaller']);

onMounted(() => {
  launchNarratGame();
});

const scripts = computed(() => gameStore.scripts);

function controlButtonPressed(id: string, event: MouseEvent) {
  switch (id) {
    case 'reload':
      restartApp();
      break;
    case 'stop':
      if (isNarratRunning.value) {
        stopApp();
        isNarratRunning.value = false;
      }
      break;
    case 'start':
      if (!isNarratRunning.value) {
        launchNarratGame();
      }
      break;
    case 'fullscreen':
      if (narratContainer.value) {
        narratContainer.value.requestFullscreen();
      }
      break;
    case 'bigger':
      emit('bigger');
      break;
    case 'smaller':
      emit('smaller');
      break;
    default:
      console.error(`control button ${id} not found`);
  }
}

function launchNarratGame() {
  if (narratContainer.value) {
    if (!isNarratRunning.value) {
      startNarratApp();
    }
  } else {
    console.error('narratContainer is null');
  }
}

function fileStateToNarratModule(fileState: FileState): {
  default: NarratScript;
} {
  return {
    default: {
      fileName: fileState.fileName,
      code: fileState.code,
      id: fileState.id,
    },
  };
}

function startNarratApp() {
  startApp({
    configPath: 'data/config.yaml',
    debug: true,
    logging: false,
    scripts: scripts.value,
    container: narratContainer.value!,
  });
  isNarratRunning.value = true;
}

watch(
  () => gameStore.activeScript!.code,
  () => {
    console.log('active script code has changed');
    handleHMR(fileStateToNarratModule(gameStore.activeScript!));
  },
);
</script>

<style scoped></style>
