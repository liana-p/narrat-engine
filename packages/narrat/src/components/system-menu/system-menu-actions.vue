<template>
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
</template>

<script setup lang="ts">
import { menuReturn } from '@/application/application-utils';
import { startManualSave } from '@/application/saving';
import { getCommonConfig } from '@/config';

const emit = defineEmits(['close']);
function quit() {
  window.close();
  // quit
}

function mainMenu() {
  menuReturn();
  emit('close');
}

function saveGame() {
  startManualSave({});
  emit('close');
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
</script>
