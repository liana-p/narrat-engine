<template>
  <div class="menu-container">
    <button
      v-for="(menuButton, key) in menuButtons"
      :key="menuButton.id"
      @click="buttonClick(menuButton.id)"
      :id="menuButton.cssId ?? `${key}-menu-button`"
      class="button menu-toggle-button"
    >
      {{ menuButton.label }}
    </button>
    <Teleport to="#app-container" v-if="menu">
      <Modal
        :containerCssClass="{ [menu.cssClass!]: true, 'menu-modal': true }"
        @close="closeMenu"
      >
        <template v-slot:header>
          <h3 class="title">{{ menuStore.tab?.text ?? menu.label }}</h3>
        </template>
        <template v-slot:body>
          <TabsController
            @tab-change="tabChange"
            @close="close"
            :tabs="menuTabs"
            :defaultTab="menu.activeTab"
          />
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useMain } from '../stores/main-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { vm } from '../vm/vm';
import { useMenu } from '@/stores/menu-store';
import { inputEvents } from '@/utils/InputsListener';
import Modal from './utils/modal-window.vue';
import TabsController from './tabs/TabsController.vue';
import { TabOptions } from './tabs/tab-selector.vue';

const menuStore = useMenu();
const keyboardListener = ref<any>(null);

onMounted(() => {
  keyboardListener.value = inputEvents.on('keydown', (event) => {
    const key = event.key;
    if (key === 'Escape') {
      useMenu().toggleMenu();
    }
  });
  vm.callHook('onGameMounted');
});

onUnmounted(() => {
  inputEvents.off('keydown', keyboardListener.value);
  vm.callHook('onGameUnmounted');
});

function buttonClick(menuId: string) {
  useMenu().activeMenu = menuId;
}

const menuButtons = computed(() => {
  return menuStore.menus;
});
const menu = computed(() => menuStore.menu);
const menuTabs = computed((): TabOptions[] => {
  return (menu.value?.tabs ?? [])
    .filter((tab) => (tab.condition ? tab.condition() : true))
    .map((menuTab) => {
      return {
        id: menuTab.id,
        label: menuTab.text,
        component: menuTab.component,
      };
    });
});
function closeMenu() {
  menuStore.closeMenu();
}
function tabChange(newIndex: number) {
  menuStore.setActiveTab(newIndex);
}
function close() {
  return closeMenu();
}
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
  width: 90%;
  height: 90%;
}
</style>
