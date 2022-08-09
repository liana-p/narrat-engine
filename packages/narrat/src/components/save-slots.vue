<template>
  <modal @close="tryToClose" containerCssClass="save-modal" :cantClose="false">
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
      <!-- Manual Saves -->
      <div v-if="saveMode === 'manual'">
        <div class="saves-section">
          <h3 class="saves-section-title">Auto save</h3>
          <transition-group name="list" tag="div">
            <SaveSlotUi
              v-for="slot in autoSlots"
              :key="slot.id"
              :saveSlot="slot"
              :id="slot.id"
              :actions="actions"
              @choice="(choice) => slotChosen(slot.id, choice)"
            />
          </transition-group>
        </div>
        <div class="saves-section">
          <h3 class="saves-section-title">Manual Saves</h3>
          <transition-group name="list" tag="div">
            <SaveSlotUi
              v-for="slot in manualSlots"
              :key="slot.id"
              :saveSlot="slot"
              :id="slot.id"
              :actions="actions"
              @choice="(choice) => slotChosen(slot.id, choice)"
            />
          </transition-group>
        </div>
      </div>
      <div v-else class="saves-section">
        <h3 class="saves-section-title">Save Slots</h3>
        <div class="saves-container flex flex-col">
          <transition-group name="list" tag="div">
            <SaveSlotUi
              v-for="slot in saveSlots"
              :key="slot.id"
              :saveSlot="slot"
              :id="slot.id"
              :actions="actions"
              @choice="(choice) => slotChosen(slot.id, choice)"
            />
          </transition-group>
        </div>
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
import { SaveSlot } from '../types/game-save';
import { ChosenSlot, deleteSave, getSaveFile } from '../utils/save-helpers';
import { computed, onMounted, PropType, reactive } from 'vue';
import Modal from './utils/modal-window.vue';
import SaveSlotUi from './saves/save-slot-ui.vue';
import YesNo from './utils/yes-no.vue';
import { getConfig } from '../config';
import { useMain } from '../stores/main-store';

const props = defineProps({
  mode: {
    type: String as PropType<'load' | 'pick'>,
    required: true,
  },
});

const saveSlots = reactive<SaveSlot[]>([] as SaveSlot[]);
const autoSlots = computed(() => saveSlots.slice(0, 1));
const manualSlots = computed(() => saveSlots.slice(1));

const actions = reactive(
  props.mode === 'load' ? ['Load', 'Delete'] : ['Choose'],
);
const saveMode = computed(() => getConfig().saves.mode);
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
  const saveFile = getSaveFile();
  const slots: SaveSlot[] = saveFile.slots;
  console.log(slots);
  slots.forEach((slot, index) => {
    saveSlots[index] = slot;
  });
  // Extra slot push to create a new save slot
});

// function chooseNewSlot() {
//   const slotId = getFreeSlot();
//   if (slotId) {
//     chooseSaveSlot(slotId);
//   }
// }
function chooseSaveSlot(slotId: string) {
  const emitData: ChosenSlot = {
    slotId,
  };
  emit('chosen', emitData);
}

function deleteSaveSlot(slotId: string) {
  const saveToDelete = getSlotById(slotId);
  if (saveToDelete) {
    const saveMode = getConfig().saves.mode;
    if (saveMode === 'manual') {
      if (saveToDelete.slotType === 'auto') {
        useMain().alert('Sorry', `Can't delete the auto save slot!`);
        return;
      }
    }
    deleteConfirmation.saveToDelete = slotId as any;
  }
}

function actuallyDeleteSaveSlot(slotId: string) {
  deleteSave(slotId);
  const slot = saveSlots.find((slot) => slot.id === slotId);
  if (slot) {
    slot.saveData = null;
  }
}

function tryToClose() {
  emit('close');
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
  return saveSlots.find((slot) => slot.id === id);
}
</script>
<style>
.save-modal {
  width: 70%;
}

.saves-section {
  margin-bottom: 20px;
}

.saves-section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.saves-container {
  padding: 20px;
}
</style>
