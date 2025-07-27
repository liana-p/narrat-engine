<template>
  <div ref="mainActions">
    <button
      v-for="action in actions"
      :key="action.id"
      :class="{
        'nrt-button': true,
        'system-menu-button': true,
        [action.class]: true,
        ...selectedClass(selectedElement?.id === action.id),
      }"
      @click="action.callback"
    >
      {{ $t(action.title) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { menuReturn } from '@/application/application-utils';
import { startManualSave } from '@/application/saving';
import { getCommonConfig } from '@/config';
import { selectedClass } from '@/inputs/inputs-utils';

import { OldNavigationState, useOldNavigation } from '@/inputs/useNavigation';
import { useNavigation } from '@/inputs/useNewNavigation';
import { InputListener } from '@/stores/inputs-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  inputListener: InputListener;
}>();

const navigation = ref<OldNavigationState | null>(null);
const mainActions = ref<HTMLElement | null>(null);

const emit = defineEmits(['close']);

interface SystemMenuAction {
  title: string;
  id: string;
  callback: () => void;
  class: string;
}

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

const actions: SystemMenuAction[] = [];
// This bit is NOT reactive because the navigation system isn't.
if (getCommonConfig().saves.allowManualSave !== false) {
  actions.push({
    id: 'save',
    title: 'narrat.system_menu.save_game',
    callback: saveGame,
    class: 'save-button',
  });
}
if (getCommonConfig().graphics.allowFullscreen !== false) {
  actions.push({
    id: 'fullscreen',
    title: 'narrat.system_menu.toggle_fullscreen',
    callback: toggleFullscreen,
    class: 'fullscreen-button',
  });
}
actions.push({
  id: 'main-menu',
  title: 'narrat.system_menu.main_menu',
  callback: mainMenu,
  class: 'return-main-menu-button',
});
actions.push({
  id: 'quit',
  title: 'narrat.system_menu.exit',
  callback: quit,
  class: 'quit-button',
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const inputListenerRef = computed(() => props.inputListener);

const { selectedElement } = useNavigation({
  mode: 'horizontal',
  listener: inputListenerRef,
  elements: actions,
  looping: false,
  onConfirmed: (action: SystemMenuAction) => {
    action.callback();
  },
});
</script>
