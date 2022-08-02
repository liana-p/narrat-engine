import MainMenu from '../components/MainMenu.vue';
import InventoryUi from '../components/inventory-ui.vue';
import QuestsUi from '../components/quests-ui.vue';
import Skills from '../components/SkillsWindow.vue';
import { MenuButtonState, useMenu } from '@/stores/menu-store';
import { vm } from '@/vm/vm';

export function registerDefaultMenuButtons(app: any) {
  // Register menu components
  app.component('MainMenu', MainMenu);
  app.component('InventoryUi', InventoryUi);
  app.component('QuestsUi', QuestsUi);
  app.component('SkillsWindow', Skills);
  useMenu().buttons = [
    {
      id: 'menu',
      cssId: 'menu-button',
      text: 'Menu',
      component: 'MainMenu',
    },
    {
      id: 'skills',
      cssId: 'skills-menu-button',
      text: 'Skills',
      condition: () => useMenu().showSkills,
      component: 'SkillsWindow',
    },
    {
      id: 'inventory',
      cssId: 'inventory-menu-button',
      text: 'Items',
      condition: () => useMenu().showInventory,
      component: 'InventoryUi',
    },
    {
      id: 'quests',
      cssId: 'quests-menu-button',
      text: 'Quests',
      condition: () => useMenu().showQuests,
      component: 'QuestsUi',
    },
  ];
}

export function registerMenuButton(config: MenuButtonState, component: any) {
  const app = (window as any).narrat.app;
  app.component(config.component, component);
  useMenu().addMenuOption(config);
}

export function addMenuButtonsFromPlugins() {
  for (const plugin of vm.plugins) {
    if (plugin.customMenuButtons) {
      for (const button of plugin.customMenuButtons) {
        registerMenuButton(button.config, button.component);
      }
    }
  }
}
