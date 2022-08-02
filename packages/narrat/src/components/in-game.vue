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
import { computed, ref } from 'vue';
import { useRenderingStore } from '../stores/rendering-store';
import { ChosenSlot } from '../utils/save-helpers';
import SaveSlots from './save-slots.vue';
import YesNo from './utils/yes-no.vue';
import Hud from './hud.vue';

const mainStore = useMain();
const renderingStore = useRenderingStore();

const layoutMode = computed(() => renderingStore.layoutMode);
const savingRequested = computed(() => mainStore.saving);
const agreedToSave = ref<true | false | null>(null);
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
