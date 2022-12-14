<template>
  <div class="game" :style="gameStyle">
    <Hud />
    <MenuButtons class="menu-toggle" />
    <Screens />
    <GameDialog :inGame="true" :layoutMode="layoutMode" />
    <SaveSlots
      v-if="actuallySaving"
      :mode="'pick'"
      @chosen="chosenSave"
      @close="() => chosenSave(null)"
    />
    <AutoPlayFeedback />
    <YesNo
      v-if="
        savingRequested && savingRequested.withPrompt && agreedToSave === null
      "
      :prompt="'Would you like to save the game?'"
      :onConfirm="saveConfirm"
      :onRefuse="saveRefuse"
    />
  </div>
</template>

<script setup lang="ts">
import GameDialog from './game-dialog.vue';
import MenuButtons from './menu-buttons.vue';
import Screens from './screens.vue';
import { useMain } from '../stores/main-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRenderingStore } from '../stores/rendering-store';
import { ChosenSlot } from '../utils/save-helpers';
import SaveSlots from './save-slots.vue';
import YesNo from './utils/yes-no.vue';
import Hud from './hud.vue';
import AutoPlayFeedback from './auto-play/AutoPlayFeedback.vue';
import { useDialogStore } from '@/stores/dialog-store';
import { inputEvents } from '@/utils/InputsListener';

const mainStore = useMain();
const renderingStore = useRenderingStore();

const layoutMode = computed(() => renderingStore.layoutMode);
const savingRequested = computed(() => mainStore.saving);
const agreedToSave = ref<true | false | null>(null);
const dialog = useDialogStore();
const keyboardListener = ref<null | Function>(null);

const actuallySaving = computed(
  () =>
    (savingRequested.value && !savingRequested.value.withPrompt) ||
    (savingRequested.value && agreedToSave.value),
);

const gameStyle = computed<any>(() => {
  let direction = 'row';
  if (layoutMode.value === 'vertical') {
    direction = 'column';
  }
  return {
    flexDirection: direction,
  };
});

function chosenSave(data: ChosenSlot | null) {
  agreedToSave.value = null;
  if (data === null) {
    useMain().finishManualSave(data, false);
    return;
  }
  useMain().finishManualSave(data, true);
}

function saveConfirm() {
  agreedToSave.value = true;
}
function saveRefuse() {
  agreedToSave.value = false;
  mainStore.finishManualSave(null, false);
  agreedToSave.value = null;
}

onMounted(() => {
  keyboardListener.value = inputEvents.on('debouncedKeydown', (e) => {
    if (!useMain().debugMode) {
      if (e.key === 'a' || e.key === 'A') {
        dialog.toggleAutoPlay();
      }
      if (e.key === 's' || e.key === 'S') {
        dialog.toggleSkip();
      }
    }
  });
});

onUnmounted(() => {
  if (keyboardListener.value) {
    inputEvents.off('debouncedKeydown', keyboardListener.value as any);
  }
});
</script>
<style>
.game {
  position: absolute;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.menu-toggle {
  position: fixed;
  bottom: 0px;
  right: 15%;
  z-index: 2;
}
</style>
