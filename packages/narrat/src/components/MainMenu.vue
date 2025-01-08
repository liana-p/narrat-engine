<template>
  <div class="menu-content">
    <h3>Play time: {{ getPlayTimeString() }}</h3>

    <VolumeControls />
    <div class="fonts-picker" v-if="fonts">
      <label name="font-picker" class="font-picker-label"> Font Choice: </label>
      <select
        class="nrt-select"
        name="font-picker"
        @change="fontPicked($event)"
      >
        <option
          class="nrt-option"
          v-for="font in fonts"
          :selected="isFontSelected(font)"
          :value="font"
          :key="font"
        >
          {{ font }}
        </option>
      </select>
    </div>
    <div ref="mainActions">
      <button
        class="nrt-button system-menu-button save-button"
        @click="saveGame"
        v-if="getCommonConfig().saves.allowManualSave !== false"
      >
        Save Game
      </button>
      <button
        class="nrt-button system-menu-button fullscreen-button"
        @click="toggleFullscreen"
        v-if="getCommonConfig().graphics.allowFullscreen !== false"
      >
        Toggle Fullscreen
      </button>
      <button
        class="nrt-button system-menu-button return-main-menu-button"
        @click="mainMenu"
      >
        Main Menu
      </button>
      <button class="nrt-button system-menu-button quit-button" @click="quit">
        Exit
      </button>
    </div>
    <SettingsMenu />
  </div>
</template>
<script setup lang="ts">
import VolumeControls from './volume-controls.vue';
import SettingsMenu from './settings/settings-menu.vue';
import { getPlayTime, toHHMMSS } from '@/utils/time-helpers';
import { useMain } from '@/stores/main-store';
import { InputListener } from '@/stores/inputs-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { NavigationState, useNavigation } from '@/inputs/useNavigation';
import { menuReturn } from '@/application/application-utils';
import { startManualSave } from '@/application/saving';
import { fontsConfig, getCommonConfig } from '@/config';
import { useFontsStore } from '@/stores/fonts-store';

const props = defineProps<{
  inputListener: InputListener;
}>();
const emit = defineEmits(['close']);

const mainActions = ref<HTMLElement | null>(null);
const navigation = ref<NavigationState | null>(null);
const fontsStore = useFontsStore();

function quit() {
  window.close();
  // quit
}

function mainMenu() {
  menuReturn();
  closeMenu();
}

function closeMenu() {
  emit('close');
}

function saveGame() {
  startManualSave({});
  closeMenu();
}

const fonts = computed(() => {
  if (fontsConfig().allowChoosingFont === false) {
    return null;
  }
  const sets = fontsConfig().fontSets;
  if (sets && Object.keys(sets).length > 0) {
    return Object.keys(sets);
  } else {
    return null;
  }
});

function isFontSelected(font: string) {
  return fontsStore.currentFont === font;
}

function fontPicked(event: Event) {
  const target = event.target as HTMLSelectElement;
  const font = target.value;
  fontsStore.setFontSet(font);
  // set font
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function getPlayTimeString(): string {
  const time = getPlayTime(
    useMain().playTime.start,
    useMain().playTime.previousPlaytime,
  );
  return toHHMMSS(time / 1000);
}

onMounted(() => {
  navigation.value = useNavigation({
    mode: 'list',
    container: mainActions,
    listener: props.inputListener,
    onChosen: (index) => {
      if (index === 0) {
        mainMenu();
      } else if (index === 1) {
        quit();
      }
    },
  }) as any;
  navigation.value!.mount();
});

onUnmounted(() => {
  if (navigation.value) {
    navigation.value.disable();
    navigation.value = null;
  }
});
</script>

<style>
.quit-button {
  margin: 20px;
  text-align: center;
}

.main-menu-modal {
  width: 60%;
}

.fonts-picker {
  display: flex;
  align-items: center;
}

.font-picker-label {
  margin-right: 10px;
  font-weight: bold;
}
</style>
