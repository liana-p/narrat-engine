<template>
  <modal
    @close="tryToClose"
    containerCssClass="save-modal"
    :cantClose="props.mode === 'pick'"
  >
    <template v-slot:header>
      <h3 class="title">
        {{
          mode === 'load'
            ? 'Choose a save to load'
            : 'Pick a slot to save the game'
        }}
      </h3>
    </template>
    <template v-slot:body>
      <div class="flex justify-center">
        <button class="button" @click="chooseNewSlot">Create a new save</button>
      </div>
      <div class="saves-container flex flex-col">
        <transition-group name="list" tag="div">
          <SaveSlot
            v-for="slot in saveSlots"
            :key="slot.metadata.id"
            :saveSlot="slot"
            :id="slot.metadata.id"
            :actions="actions"
            @choice="(choice) => slotChosen(slot.metadata.id, choice)"
          />
        </transition-group>
      </div>
      <YesNo
        v-if="deleteConfirmation.saveToDelete"
        :prompt="deleteConfirmation.prompt"
        :onRefuse="deleteConfirmation.onRefuse"
        :onConfirm="deleteConfirmation.onConfirm"
      />
      <YesNo
        v-if="saveConfirmation.saveToOverwrite"
        :prompt="saveConfirmation.prompt"
        :onRefuse="saveConfirmation.onRefuse"
        :onConfirm="saveConfirmation.onConfirm"
      />
    </template>
  </modal>
</template>

<script setup lang="ts">
import { GameSave, SaveFile } from '../types/game-save';
import {
  ChosenSlot,
  deleteSave,
  getSaveFile,
  getFreeSlot,
} from '../utils/save-helpers';
import { computed, onMounted, PropType, reactive } from 'vue';
import Modal from './utils/modal-window.vue';
import SaveSlot from './saves/save-slot.vue';
import YesNo from './utils/yes-no.vue';
import { getConfig } from '../config';
import { useMain } from '../stores/main-store';

const props = defineProps({
  mode: {
    type: String as PropType<'load' | 'pick'>,
    required: true,
  },
});

const saveSlots = reactive<GameSave[]>([] as GameSave[]);
const actions = reactive(
  props.mode === 'load' ? ['Load', 'Delete'] : ['Choose'],
);
const deleteConfirmation = reactive({
  prompt: 'Are you sure you want to delete this save file?',
  saveToDelete: null,
  onConfirm: () => {
    actuallyDeleteSaveSlot(deleteConfirmation.saveToDelete as any);
    deleteConfirmation.saveToDelete = null;
  },
  onRefuse: () => {
    deleteConfirmation.saveToDelete = null;
  },
});
const saveConfirmation = reactive({
  prompt: 'Are you sure you want to overwrite this save file?',
  saveToOverwrite: null,
  onConfirm: () => {
    chooseSaveSlot(saveConfirmation.saveToOverwrite as any);
    saveConfirmation.saveToOverwrite = null;
  },
  onRefuse: () => {
    saveConfirmation.saveToOverwrite = null;
  },
});

const emit = defineEmits(['chosen', 'close']);
onMounted(() => {
  let slots: GameSave[] = getSaveFile().slots.sort((a, b) => {
    return (
      new Date(b.metadata.saveDate).getTime() -
      new Date(a.metadata.saveDate).getTime()
    );
  });
  if (props.mode === 'pick') {
    slots = slots.filter((slot) => slot.metadata.slotType !== 'auto');
  }
  console.log(slots);
  slots.forEach((slot, index) => {
    saveSlots[index] = slot;
  });
  // Extra slot push to create a new save slot
});

function chooseNewSlot() {
  const slotId = getFreeSlot();
  chooseSaveSlot(slotId);
}
function chooseSaveSlot(slotId: string) {
  const emitData: ChosenSlot = {
    saveData: getSlotById(slotId)!,
    slotId,
  };
  emit('chosen', emitData);
}

function deleteSaveSlot(slotId: string) {
  const saveToDelete = getSlotById(slotId);
  if (saveToDelete) {
    const saveMode = getConfig().saves.mode;
    if (saveMode === 'manual') {
      if (saveToDelete.metadata.slotType === 'auto') {
        useMain().alert('Sorry', `Can't delete the auto save slot!`);
        return;
      }
    }
    deleteConfirmation.saveToDelete = slotId as any;
  }
}

function actuallyDeleteSaveSlot(slotId: string) {
  deleteSave(slotId);
  const index = saveSlots.findIndex((slot) => slot.metadata.id === slotId);
  saveSlots.splice(index, 1);
}

function tryToClose() {
  if (props.mode !== 'pick') {
    emit('close');
  }
}
function slotChosen(id: string, choice: number) {
  const action = actions[choice];
  if (action === 'Load') {
    chooseSaveSlot(id);
  } else if (action === 'Delete') {
    deleteSaveSlot(id);
  } else if (action === 'Choose') {
    saveConfirmation.saveToOverwrite = id as any;
  }
}

function getSlotById(id: string) {
  return saveSlots.find((slot) => slot.metadata.id === id);
}
</script>
<style>
.save-modal {
  width: 70%;
}
.saves-container {
  padding: 20px;
}
</style>
