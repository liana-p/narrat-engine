<template>
  <div class="save-slot flex flex-row" ref="slotContainer">
    <div class="used-save-slot flex flex-row justify-between items-center grow">
      <div class="flex flex-col save-slot-number-container">
        <h1 class="save-slot-number">{{ saveNumberText() }}</h1>
      </div>
      <div
        class="save-slot-screenshot"
        :style="saveScreenshot"
        v-if="saveScreenshot"
      ></div>
      <div class="flex flex-col justify-center save-info">
        <input
          type="text"
          class="save-name"
          v-model="saveName"
          @input="saveNameChange"
          v-if="hasSaveData"
        />
        <h3 v-else class="save-name">{{ saveName }}</h3>
        <div class="flex flex-col">
          <p v-if="saveData">
            {{ new Date(saveData.metadata.saveDate).toLocaleString() }}
          </p>
          <p v-if="saveData">Play time: {{ playtimeString(saveSlot) }}</p>
          <p v-if="saveMode === 'game-slots'">
            {{ saveSlot.slotType === 'auto' ? 'Auto Save' : 'Manual Save' }}
          </p>
        </div>
      </div>
      <div class="flex flex-row" ref="actionsContainer">
        <button
          class="button"
          @click="() => buttonAction(index)"
          :class="{ selected: selected && index === selectedButtonIndex }"
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
import { SaveSlot } from '../../types/game-save';
import { computed, onMounted, onUnmounted, PropType, ref, watch } from 'vue';
import { toHHMMSS } from '../../utils/time-helpers';
import { renameSave } from '../../utils/save-helpers';
import { getConfig, getImageUrl, getScreenConfig } from '@/config';
import { InputListener, useInputs } from '@/stores/inputs-store';
import { useNavigation, NavigationState } from '@/inputs/useNavigation';

const props = defineProps<{
  saveSlot: SaveSlot;
  id: string;
  actions: string[];
  selected: boolean;
  inputListener: InputListener | null;
}>();

const navigation = ref<NavigationState | null | undefined>(null);
const actionsContainer = ref<HTMLElement | null>(null);
const slotContainer = ref<HTMLElement | null>(null);

defineExpose({
  slotContainer,
});
const saveName = ref(props.saveSlot.saveData?.metadata.name ?? 'Empty Save');
const selectedButtonIndex = ref(0);
const hasSaveData = computed(() => props.saveSlot.saveData !== null);
const saveData = computed(() => props.saveSlot.saveData);
const saveMode = computed(() => getConfig().saves.mode);
const saveScreenshot = computed(() => {
  const save = props.saveSlot.saveData;
  if (save) {
    if (save.screen.layers[0]) {
      const conf = getScreenConfig(save.screen.layers[0]);
      if (conf) {
        return {
          backgroundImage: `url(${getImageUrl(conf.background)})`,
        };
      }
    }
  }
  return false;
});

const emit = defineEmits(['choice', 'cancel']);

function buttonAction(choice: number) {
  emit('choice', choice);
}

function playtimeString(slot: SaveSlot) {
  if (saveData.value) {
    return toHHMMSS(saveData.value.main.playTime / 1000);
  } else {
    return '00:00:00';
  }
}

function saveNameChange() {
  if (saveData.value) {
    renameSave(props.saveSlot.id, saveName.value);
  }
}

function saveNumberText() {
  const slots = getConfig().saves.slots;
  let txt = '';
  const num = props.saveSlot.slotNumber;
  if (num === 0 && getConfig().saves.mode === 'manual') {
    return 'AUTO';
  }
  if (slots >= 10 && num < 10) {
    txt += '0';
  }
  if (slots >= 100 && num < 100) {
    txt += '0';
  }
  return txt + num;
}

function mountNavigation() {
  navigation.value = useNavigation({
    mode: 'list',
    container: actionsContainer,
    listener: props.inputListener,
    onlyHorizontal: true,
    onSelected: (index) => {
      selectedButtonIndex.value = index;
    },
    onChosen: (index) => {
      // do stuff
      buttonAction(index);
    },
  }) as any;
  navigation.value!.mount();
}

function unmountNavigation() {
  navigation.value!.disable();
  navigation.value = null;
}

watch(
  () => props.selected,
  (selected, previousValue) => {
    if (selected && !navigation.value) {
      mountNavigation();
    }
    if (!selected && navigation.value) {
      unmountNavigation();
    }
  },
);
onUnmounted(() => {
  if (navigation.value) {
    unmountNavigation();
  }
});
</script>
<style>
.save-slot {
  /* background: var(--light-background); */
  background-color: rgba(0, 0, 0, 0.5);
  border-width: var(--save-ui-border-width);
  border-style: var(--save-ui-border-style);
  border-color: var(--save-ui-border-color);
  width: 100%;
  transition: background-color 0.3s;
}
.save-slot:hover,
.save-slot.selected {
  background-color: var(--save-ui-selected-background);
}

.save-slot:not(:last-child) {
  margin-bottom: 20px;
}

.save-name {
  font-size: 1.2rem;
  font-weight: bold;
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 0px 5px;
}

.save-slot-number-container {
  width: 100px;
  text-align: center;
}
.save-slot-number {
  font-size: 1.8rem;
  font-weight: bold;
}

.save-slot-screenshot {
  width: 170px;
  background-size: contain;
  background-position: center;
  height: 100%;
  border-left-width: var(--save-ui-border-width);
  border-style: var(--save-ui-border-style);
  border-color: var(--save-ui-border-color);
  background-repeat: no-repeat;
}
.save-info {
  border-left-width: var(--save-ui-border-width);
  border-right-width: var(--save-ui-border-width);
  border-style: var(--save-ui-border-style);
  border-color: var(--save-ui-border-color);
  padding: 10px;
  height: 100%;
}
</style>
