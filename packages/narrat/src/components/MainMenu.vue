<template>
  <div class="menu-content">
    <h3>Play time: {{ getPlayTimeString() }}</h3>

    <VolumeControls />
    <button class="button title quit-button" @click="mainMenu">
      Main Menu
    </button>
    <button class="button title quit-button" @click="quit">Exit</button>
    <SettingsMenu />
  </div>
</template>
<script setup lang="ts">
import VolumeControls from './volume-controls.vue';
import SettingsMenu from './settings/settings-menu.vue';
import { getPlayTime, toHHMMSS } from '@/utils/time-helpers';
import { useMain } from '@/stores/main-store';

const emit = defineEmits(['close']);
function quit() {
  window.close();
  // quit
}

function mainMenu() {
  useMain().menuReturn();
  closeMenu();
}

function closeMenu() {
  emit('close');
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
.quit-button {
  margin: 20px;
  text-align: center;
}

.main-menu-modal {
  width: 60%;
}
</style>
