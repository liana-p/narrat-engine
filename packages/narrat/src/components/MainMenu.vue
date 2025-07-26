<template>
  <div class="menu-content" ref="scrollContainer">
    <h3>{{ $t('Play time:') }} {{ getPlayTimeString() }}</h3>

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
    <SystemMenuActions :input-listener="props.inputListener" />
    <SettingsMenu :input-listener="props.inputListener" />
  </div>
</template>
<script setup lang="ts">
import VolumeControls from './volume-controls.vue';
import SettingsMenu from './settings/settings-menu.vue';
import { getPlayTime, toHHMMSS } from '@/utils/time-helpers';
import { useMain } from '@/stores/main-store';
import { InputListener } from '@/stores/inputs-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { OldNavigationState, useOldNavigation } from '@/inputs/useNavigation';
import { menuReturn } from '@/application/application-utils';
import { startManualSave } from '@/application/saving';
import { fontsConfig, getCommonConfig } from '@/config';
import { useFontsStore } from '@/stores/fonts-store';
import { useScrolling } from '@/inputs/useScrolling';
import SystemMenuActions from './system-menu/system-menu-actions.vue';

const props = defineProps<{
  inputListener: InputListener;
}>();
const emit = defineEmits(['close']);

const navigation = ref<OldNavigationState | null>(null);
const fontsStore = useFontsStore();
const scrollContainer = ref<HTMLElement | null>(null);

function quit() {
  window.close();
  // quit
}

// Set up scrolling functionality
useScrolling({
  container: scrollContainer,
  scrollSpeed: 40,
  onlyVertical: true,
  inputListener: props.inputListener,
});

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
</script>

<style>
.menu-content {
  max-height: 100%;
  overflow-y: auto;
}
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
