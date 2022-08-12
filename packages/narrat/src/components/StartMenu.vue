<template>
  <div id="game-menu">
    <SaveSlots
      v-if="choosingSave"
      :mode="'load'"
      @chosen="chosenSave"
      @close="choosingSave = false"
    />
    <YesNo
      v-if="startingGame"
      :prompt="'This will override your previous autosave, are you sure?'"
      :onConfirm="confirmStartGame"
      :onRefuse="cancelStartGame"
    />
    <div id="game-header" class="flex flex-col justify-between items-center">
      <div id="game-title-container">
        <h1 id="game-title-text">{{ gameTitle }}</h1>
      </div>
      <div class="flex flex-col start-menu-buttons-container">
        <button
          v-if="continueSlot"
          class="button menu-button main-menu-button large continue-button override"
          @click="continueGame"
        >
          Continue
        </button>
        <button
          class="button menu-button main-menu-button large start-button override"
          @click="startGame"
          v-if="hasFreeSlot"
        >
          New Game
        </button>
        <button
          class="button menu-button main-menu-button large continue-button override"
          @click="chooseSaveSlot"
          v-if="hasSave"
        >
          Load Game
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getConfig } from '../config';
import { useMain } from '../stores/main-store';
import { error } from '../utils/error-handling';
import {
  ChosenSlot,
  getSaveFile,
  getSaveSlot,
  getFreeSlot,
  findAutoSave,
} from '../utils/save-helpers';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SaveSlots from './save-slots.vue';
import YesNo from './utils/yes-no.vue';
import { useAudio } from '@/stores/audio-store';
import { inputEvents } from '../utils/InputsListener';

const hasSave = ref(false);
const hasFreeSlot = ref(false);
const continueSlot = ref<null | string>(null);
const saveSlot = ref<string | null>(null);
const choosingSave = ref(false);
const startingGame = ref(false);
const listener = ref<null | Function>(null);

async function startGame() {
  if (hasSave.value && getConfig().saves.mode === 'manual') {
    startingGame.value = true;
  } else {
    confirmStartGame();
  }
}

async function confirmStartGame() {
  const main = useMain();
  if (saveSlot.value === null) {
    if (getConfig().saves.mode === 'manual') {
      const autosave = findAutoSave();
      if (!autosave) {
        error('No autosave found');
        return;
      }
      saveSlot.value = autosave.id;
    } else {
      const freeSlot = getFreeSlot();
      if (!freeSlot) {
        error('No free slot found');
        return;
      }
      saveSlot.value = freeSlot;
    }
  }
  startingGame.value = false;
  await main.startGame(saveSlot.value!);
}

function cancelStartGame() {
  startingGame.value = false;
}
async function loadGame() {
  if (!saveSlot.value!) {
    return;
  }
  const save = getSaveSlot(saveSlot.value);
  if (!save) {
    error('No save file found');
    return;
  }
  useMain().loadGame(save, saveSlot.value);
}

function continueGame() {
  if (typeof continueSlot.value === 'string') {
    saveSlot.value = continueSlot.value;
    loadGame();
  }
}

function chooseSaveSlot() {
  choosingSave.value = true;
}

function chosenSave({ slotId }: ChosenSlot) {
  const slot = getSaveSlot(slotId);
  if (slot && slot.saveData) {
    saveSlot.value = slotId;
    loadGame();
  } else {
    startGame();
  }
}

onMounted(() => {
  const config = getConfig();
  if (config.audioOptions.defaultMusic) {
    useAudio().playChannel('music', config.audioOptions.defaultMusic, 0);
  }
  const save = getSaveFile();
  if (save.slots.some((slot) => slot.saveData)) {
    hasSave.value = true;
  }
  if (getConfig().saves.mode === 'manual') {
    hasFreeSlot.value = true;
  } else if (save.slots.some((slot) => !slot.saveData)) {
    hasFreeSlot.value = true;
  }
  if (save.lastSaveSlot && getSaveSlot(save.lastSaveSlot)) {
    continueSlot.value = save.lastSaveSlot;
  }
  listener.value = inputEvents.on('debouncedKeydown', (e) => {
    if (e.key === ' ') {
      confirmStartGame();
    }
    if (e.key === 'c') {
      continueGame();
    }
  });
});

onUnmounted(() => {
  if (listener.value) {
    inputEvents.off('debouncedKeydown', listener.value as any);
  }
});

const gameTitle = computed(() => {
  return getConfig().gameTitle;
});
</script>
<style>
#game-menu {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: black;
}
#game-title-container {
  margin-bottom: 80px;
}

#game-title-text {
  text-align: center;
  font-size: 3rem;
}

.menu-button {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.menu-button:first-child {
}
#game-header {
  position: relative;
  top: 100px;
}

.start-menu-buttons-container {
  width: 400px;
}
</style>
