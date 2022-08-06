<template>
  <div class="menu-container">
    <button
      v-for="buttonConf in buttonsToShow"
      :key="buttonConf.id"
      @click="buttonClick(buttonConf)"
      :id="buttonConf.cssId ?? `${buttonConf.id}-menu-button`"
      class="button menu-toggle-button"
    >
      {{ buttonConf.text }}
    </button>
    <Teleport to=".game" v-if="modal">
      <component :is="componentToShow" @close="() => main.closeModal()" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '../stores/main-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { vm } from '../vm/vm';
import { useMenu } from '@/stores/menu-store';
import { inputEvents } from '@/utils/InputsListener';

export interface ButtonConf {
  id: string;
  onClick?: () => void;
  condition?: () => boolean;
  cssId?: string;
  cssClass?: string;
  text: string;
}

const main = useMain();
const keyboardListener = ref<any>(null);

onMounted(() => {
  keyboardListener.value = inputEvents.on('keydown', (event) => {
    const key = event.key;
    if (key === 'Escape') {
      useMain().toggleMenu();
    }
  });
  vm.callHook('onGameMounted');
});

onUnmounted(() => {
  inputEvents.off('keydown', keyboardListener.value);
  vm.callHook('onGameUnmounted');
});

function buttonClick(button: ButtonConf) {
  if (!button.onClick) {
    useMain().openModal(button.id);
  } else {
    button.onClick();
  }
}

const buttonsToShow = computed(() => {
  return useMenu().buttonsToShow;
});
const modal = computed(() => {
  return useMain().modal;
});
const componentToShow = computed(() => {
  if (modal.value) {
    const button = useMenu().buttons.find(
      (button) => button.id === modal.value,
    );
    if (button) {
      return button.component;
    }
  }
  return false;
});
</script>

<style>
.menu-content {
  text-align: center;
}

.menu-toggle-button {
  margin: 0;
  padding: 2px;
  border-radius: 5px;
}

.menu-toggle-button:not(:last-child) {
  margin-right: 10px;
}

.menu-modal {
  width: 500px;
}
</style>
