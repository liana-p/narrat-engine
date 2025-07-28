import SystemMenu from '../components/SystemMenu.vue';
import InventoryTab from '../components/inventory/InventoryTab.vue';
import AchievementsUI from '../components/achievements/achievements-ui.vue';
import QuestsUi from '../components/quests-ui.vue';
import Skills from '../components/SkillsWindow.vue';

import { MenuState, MenuTabState, useMenu } from '@/stores/menu-store';
import { vm } from '@/vm/vm';
import SettingsMenu from '@/components/settings/settings-menu.vue';

export function registerDefaultMenuButtons(app: any) {
  // Register menu components
  app.component('SystemMenu', SystemMenu);
  app.component('SettingsMenu', SettingsMenu);
  app.component('InventoryTab', InventoryTab);
  app.component('AchievementsUI', AchievementsUI);
  app.component('QuestsUi', QuestsUi);
  app.component('SkillsWindow', Skills);
  useMenu().menus = {
    system: {
      label: 'narrat.system_menu.system',
      cssClass: 'system-menu',
      id: 'system',
      inputPrompt: 'system',
      tabs: [
        {
          id: 'system-tab',
          cssId: 'system-tab',
          text: 'narrat.system_menu.system',
          component: 'SystemMenu',
        },
        {
          id: 'settings-tab',
          cssId: 'settings-tab',
          text: 'narrat.system_menu.settings',
          component: 'SettingsMenu',
        },
      ],
      activeTab: 0,
    },
    menu: {
      label: 'narrat.game_menu.game_menu',
      id: 'menu',
      cssClass: 'menu-menu',
      inputPrompt: 'menu',
      tabs: [
        {
          id: 'skills',
          cssId: 'skills-menu-button',
          text: 'narrat.game_menu.skills.skills',
          condition: () => useMenu().showSkills,
          component: 'SkillsWindow',
        },
        {
          id: 'inventory',
          cssId: 'inventory-menu-button',
          text: 'narrat.game_menu.inventory.items',
          condition: () => useMenu().showInventory,
          component: 'InventoryTab',
        },
        {
          id: 'quests',
          cssId: 'quests-menu-button',
          text: 'narrat.game_menu.quests.quests',
          condition: () => {
            return useMenu().showQuests;
          },
          component: 'QuestsUi',
        },
        {
          id: 'achievements',
          cssId: 'achievements-menu-button',
          text: 'narrat.game_menu.achievements.achievements',
          condition: () => useMenu().showAchievements,
          component: 'AchievementsUI',
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
        registerMenuButton(button.config.id, button.config, button.components);
      }
    }
    if (plugin.customMenuTabs) {
      for (const tab of plugin.customMenuTabs) {
        registerMenuTab(tab.config.id, tab.config, tab.component);
      }
    }
  }
}
