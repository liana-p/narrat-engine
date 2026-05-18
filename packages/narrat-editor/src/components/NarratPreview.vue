<template>
  <div class="narrat-preview relative">
    <div class="controls absolute z-50 flex">
      <button
        class="border border-cyan-400 mr-4 p-2"
        v-for="control in controls"
        :key="control"
        @click="(e) => controlButtonPressed(control, e)"
      >
        {{ control }}
      </button>
      <div class="flex flex-col w-30">
        <span>Change Theme:</span>
        <select name="themes" id="themes">
          <option
            v-for="theme in themeIds"
            :key="theme.id"
            @click="changeTheme(theme)"
            :value="theme.id"
          >
            {{ theme.name }}
          </option>
        </select>
      </div>
    </div>
    <div
      class="relative flex justify-center items-center w-full h-full"
      ref="narratContainer"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  startApp,
  handleHMR,
  NarratScript,
  stopApp,
  restartApp,
  NarratThemesPlugin,
  textOnlyTheme,
  registerPlugin,
} from 'narrat';

import { computed, onMounted, ref, watch, shallowRef } from 'vue';
import { FileState, useGameStore } from '@/stores/game-store';
import { jrpgTheme } from '../themes/jrpg';
import { websiteDemoConfigs } from '@/config';

export interface ThemeInfo {
  name: string;
  id: string;
}
const themeIds = ref<ThemeInfo[]>([
  {
    name: 'Default',
    id: 'default',
  },
  {
    name: 'Text Only',
    id: 'narrat-text-only',
  },
  {
    name: 'JRPG',
    id: 'jrpg',
  },
]);

const narratContainer = ref<HTMLDivElement | null>(null);
const isNarratRunning = ref<boolean>(false);
const chosenTheme = ref<string>('default');

function changeTheme(theme: ThemeInfo) {
  chosenTheme.value = theme.id;
  if (themesPlugin.value) {
    themesPlugin.value.changeTheme(theme.id);
  }
}

const themesPlugin = shallowRef<NarratThemesPlugin | null>();
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

function controlButtonPressed(id: string, _event: MouseEvent) {
  switch (id) {
    case 'reload':
      restartNarratGame();
      break;
    case 'stop':
      if (isNarratRunning.value) {
        stopNarratGame();
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

function stopNarratGame() {
  stopApp();
  isNarratRunning.value = false;
}
function restartNarratGame() {
  restartApp();
}
function fileStateToNarratModule(fileState: FileState): {
  default: NarratScript;
} {
  return {
    default: {
      fileName: fileState.fileName,
      code: fileState.code,
      id: fileState.id,
      type: 'script',
    },
  };
}

function startNarratApp() {
  themesPlugin.value = new NarratThemesPlugin({
    themes: [textOnlyTheme, jrpgTheme],
  });
  registerPlugin(themesPlugin.value);
  startApp({
    config: websiteDemoConfigs,
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
