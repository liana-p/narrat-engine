<template>
  <div class="menu-content" ref="scrollContainer">
    <h3>{{ $t('narrat.system_menu.play_time') }} {{ getPlayTimeString() }}</h3>

    <SystemMenuActions :input-listener="props.inputListener" />
    <SettingsMenu :input-listener="props.inputListener" />
  </div>
</template>
<script setup lang="ts">
import SettingsMenu from './settings/settings-menu.vue';
import { getPlayTime, toHHMMSS } from '@/utils/time-helpers';
import { useMain } from '@/stores/main-store';
import { InputListener } from '@/stores/inputs-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { OldNavigationState, useOldNavigation } from '@/inputs/useNavigation';
import { menuReturn } from '@/application/application-utils';
import { startManualSave } from '@/application/saving';
import { useScrolling } from '@/inputs/useScrolling';
import SystemMenuActions from './system-menu/system-menu-actions.vue';

const props = defineProps<{
  inputListener: InputListener;
}>();
const emit = defineEmits(['close']);

const navigation = ref<OldNavigationState | null>(null);
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

</style>
