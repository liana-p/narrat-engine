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
      <div
        class="flex flex-col start-menu-buttons-container"
        ref="buttonsContainer"
      >
        <StartMenuButton
          v-for="button in buttons"
          :key="button.id"
          :button="button"
          @click="buttonClicked(button)"
        />
      </div>
    </div>
    <Teleport to="#app-container" v-if="popupComponent">
      <ModalWindow
        @close="closePopupComponent"
        :class="`start-menu-popup-${popupComponent.id}`"
      >
        <template v-slot:header>
          <h3 class="title">
            {{ popupComponent.text }}
          </h3>
        </template>
        <template v-slot:body>
          <component
            :is="popupComponent.popupComponent.component"
            v-if="popupComponent.popupComponent"
            @close="closePopupComponent"
          />
        </template>
      </ModalWindow>
    </Teleport>
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
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import SaveSlots from './save-slots.vue';
import YesNo from './utils/yes-no.vue';
import StartMenuButton from './start-menu/start-menu-button.vue';
import { StartMenuButtonProps } from './start-menu/start-menu-types';
import { useAudio } from '@/stores/audio-store';
import { inputEvents } from '../utils/InputsListener';
import { useStartMenu } from '@/stores/start-menu-store';
import { CustomStartMenuButton } from '@/exports/plugins';
import ModalWindow from './utils/modal-window.vue';
import { InputListener, useInputs } from '@/stores/inputs-store';
import { useNavigation } from '@/inputs/useNavigation';

const inputListener = ref<InputListener | null>(
  useInputs().registerInputListener({}),
);

const buttons = ref<StartMenuButtonProps[]>([]);
const buttonsContainer = ref<HTMLDivElement | null>(null);
const hasSave = ref(false);
const hasFreeSlot = ref(false);
const continueSlot = ref<null | string>(null);
const saveSlot = ref<string | null>(null);
const choosingSave = ref(false);
const startingGame = ref(false);
const listener = ref<null | Function>(null);
const startMenuStore = useStartMenu();
const popupComponent = ref<CustomStartMenuButton | false>(false);

const extraButtons = computed(() => startMenuStore.buttons);

const navigation = useNavigation({
  mode: 'list',
  container: buttonsContainer,
  listener: inputListener.value,
  onSelected: (index) => {
    buttonClicked(buttons.value[index]);
  },
})!;

function buttonClicked(button: StartMenuButtonProps) {
  switch (button.id) {
    case 'continue':
      continueGame();
      break;
    case 'new-game':
      startGame();
      break;
    case 'load-game':
      chooseSaveSlot();
      break;
    case 'exit':
      useMain().exitGame();
      break;
    default:
      clickExtraButton(button);
      break;
  }
}
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

function clickExtraButton(startMenuButton: StartMenuButtonProps) {
  const extraButtonIndex = extraButtons.value.findIndex(
    (b) => b.id === startMenuButton.id,
  );
  const button = extraButtons.value[extraButtonIndex];
  if (button.action) {
    button.action();
  }
  if (button.popupComponent) {
    popupComponent.value = button;
  }
}
function closePopupComponent() {
  popupComponent.value = false;
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
  if (config.audio.options.defaultMusic) {
    useAudio().playChannel('music', config.audio.options.defaultMusic, 0);
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
  setupButtons();
  listener.value = inputEvents.on('debouncedKeydown', (e) => {
    if (e.key === ' ') {
      confirmStartGame();
    }
    if (e.key === 'c') {
      continueGame();
    }
  });
  nextTick(() => {
    navigation.select(0);
  });
});

function setupButtons() {
  if (continueSlot.value) {
    buttons.value.push({
      id: 'continue',
      title: 'Continue',
      cssClass: 'continue-button',
    });
  }
  if (hasFreeSlot.value) {
    buttons.value.push({
      id: 'new-game',
      title: 'New Game',
      cssClass: 'start-button',
    });
  }
  if (hasSave.value) {
    buttons.value.push({
      id: 'load-game',
      title: 'Load Game',
      cssClass: 'continue-button',
    });
  }
  for (const button of extraButtons.value) {
    buttons.value.push({
      id: button.id,
      title: button.text,
      cssClass: `${button.id}-start-menu-button`,
    });
  }
  buttons.value.push({
    id: 'exit',
    title: 'Exit',
    cssClass: 'exit-button',
  });
}

onUnmounted(() => {
  if (inputListener.value) {
    useInputs().unregisterInputListener(inputListener.value);
  }
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
