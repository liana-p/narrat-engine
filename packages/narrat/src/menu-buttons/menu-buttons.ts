import MainMenu from '../components/MainMenu.vue';
import InventoryUi from '../components/inventory-ui.vue';
import QuestsUi from '../components/quests-ui.vue';
import Skills from '../components/SkillsWindow.vue';

import { MenuState, MenuTabState, useMenu } from '@/stores/menu-store';
import { vm } from '@/vm/vm';

export function registerDefaultMenuButtons(app: any) {
  // Register menu components
  app.component('MainMenu', MainMenu);
  app.component('InventoryUi', InventoryUi);
  app.component('QuestsUi', QuestsUi);
  app.component('SkillsWindow', Skills);
  useMenu().menus = {
    system: {
      label: 'System',
      cssClass: 'system-menu',
      id: 'system',
      tabs: [
        {
          id: 'system-tab',
          cssId: 'system-tab',
          text: 'System',
          component: 'MainMenu',
        },
      ],
      activeTab: 0,
    },
    menu: {
      label: 'Menu',
      id: 'menu',
      cssClass: 'menu-menu',
      tabs: [
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
      ],
      activeTab: 0,
    },
  };
}

export function registerMenuButton(
  id: string,
  config: MenuState,
  components: { [key: string]: any },
) {
  const app = (window as any).narrat.app;
  for (const tab in config.tabs) {
    const componentId = config.tabs[tab].component;
    app.component(componentId, components[componentId]);
  }
  useMenu().addMenu(id, config);
}
export function registerMenuTab(
  id: string,
  config: MenuTabState,
  component: any,
) {
  const app = (window as any).narrat.app;
  app.component(config.component, component);
  useMenu().addMenuOption(id, config);
}

export function addMenuButtonsFromPlugins() {
  for (const plugin of vm.plugins) {
    if (plugin.customMenuButtons) {
      for (const button of plugin.customMenuButtons) {
        registerMenuButton(button.config.id, button.config, button.component);
      }
    }
  }
}
