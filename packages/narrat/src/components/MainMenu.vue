<template>
  <div class="menu-content">
    <h3>Play time: {{ getPlayTimeString() }}</h3>

    <VolumeControls />
    <div ref="mainActions">
      <button class="button title quit-button" @click="mainMenu">
        Main Menu
      </button>
      <button class="button title quit-button" @click="quit">Exit</button>
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
import { onMounted, onUnmounted, ref } from 'vue';
import { NavigationState, useNavigation } from '@/inputs/useNavigation';
import { menuReturn } from '@/application/application-utils';

const props = defineProps<{
  inputListener: InputListener;
}>();
const emit = defineEmits(['close']);

const mainActions = ref<HTMLElement | null>(null);
const navigation = ref<NavigationState | null>(null);
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
</style>
