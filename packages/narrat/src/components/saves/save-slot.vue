<template>
  <div class="save-slot flex flex-row">
    <div class="used-save-slot flex flex-row justify-between items-center grow">
      <div class="flex flex-col">
        <input
          type="text"
          class="save-name"
          v-model="saveName"
          @input="saveNameChange"
        />
        <div class="flex flex-col">
          <p>Play time: {{ playtimeString(saveSlot) }}</p>
          <p>
            Last save:
            {{ new Date(saveSlot.metadata.saveDate).toLocaleString() }}
          </p>
          <p>
            {{
              saveSlot.metadata.slotType === 'auto'
                ? 'Auto Save'
                : 'Manual Save'
            }}
          </p>
        </div>
      </div>
      <div class="flex flex-row">
        <button
          class="button"
          @click="() => buttonAction(index)"
          v-for="(action, index) in actions"
          :key="index"
        >
          <h3>{{ action }}</h3>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GameSave } from '../../types/game-save';
import { computed, defineProps, PropType, ref } from 'vue';
import { toHHMMSS } from '../../utils/time-helpers';
import { renameSave } from '../../utils/save-helpers';

const props = defineProps({
  saveSlot: {
    type: Object as PropType<GameSave>,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  actions: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
const saveName = ref(props.saveSlot.metadata.name);

const emit = defineEmits(['choice']);

function buttonAction(choice: number) {
  emit('choice', choice);
}

function playtimeString(slot: GameSave) {
  return toHHMMSS(slot.main.playTime / 1000);
}

function saveNameChange() {
  renameSave(props.saveSlot.metadata.id, saveName.value);
}
</script>
<style>
.save-slot {
  background: var(--light-background);
  border: 1px dashed white;
  width: 100%;
  padding: 20px;
}

.save-slot:not(:last-child) {
  margin-bottom: 20px;
}

.save-name {
  font-size: 1.2rem;
  font-weight: bold;
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>
