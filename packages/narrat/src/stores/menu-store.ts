import {
  getAchievementsConfig,
  getCommonConfig,
  itemsConfig,
  questsConfig,
  skillsConfig,
} from '@/config';
import { acceptHMRUpdate, defineStore } from 'pinia';

export interface MenuTabState {
  id: string;
  onClick?: () => void;
  condition?: () => boolean;
  cssId?: string;
  cssClass?: string;
  text: string;
  inputPrompt?: string;
  component: string;
}

export interface MenuState {
  id: string;
  label: string;
  inputPrompt?: string;
  cssId?: string;
  cssClass?: string;
  tabs: MenuTabState[];
  activeTab: number;
}
export type AddMenuState = Omit<MenuState, 'id'>;

export interface MenuStoreState {
  menus: {
    [key: string]: MenuState;
  };
  activeMenu: string | false;
}

export const useMenu = defineStore('menu', {
  state: () =>
    ({
      menus: {},
      activeMenu: false,
    }) as MenuStoreState,
  getters: {
    showSkills(): boolean {
      if (Object.entries(skillsConfig().skills).length > 0) {
        return true;
      }
      return false;
    },
    showInventory(): boolean {
      if (Object.entries(itemsConfig().items).length > 0) {
        return true;
      }
      return false;
    },
    showQuests(): boolean {
      if (Object.entries(questsConfig().quests).length > 0) {
        return true;
      }
      return false;
    },
    showAchievements(): boolean {
      if (Object.entries(getAchievementsConfig().achievements).length > 0) {
        return true;
      }
      return false;
    },
    menuTabsToShow(state): MenuTabState[] {
      return state.menus.menu.tabs
        .map((button) => {
          const buttonData = getCommonConfig().menuButtons[button.id] || {};
          return {
            ...button,
            ...buttonData,
          };
        })
        .filter((button) => {
          if (button.condition) {
            return button.condition();
          } else {
            return true;
          }
        });
    },
    menu(state: MenuStoreState): MenuState | undefined {
      return state.activeMenu ? state.menus[state.activeMenu] : undefined;
    },
    tab(): MenuTabState | undefined {
      if (this.menu) {
        return this.menu.tabs[this.menu.activeTab];
      }
    },
  },
  actions: {
    setup() {},
    addMenu(id: string, options: AddMenuState) {
      this.menus[id] = {
        ...options,
        id,
      };
    },
    addMenuOption(menu: string, config: MenuTabState) {
      if (!this.menus[menu]) {
        this.menus[menu] = {
          id: menu,
          label: menu,
          tabs: [],
          activeTab: 0,
        };
      }
      this.menus[menu].tabs.push(config);
    },
    setActiveTab(tab: number) {
      if (this.menu) {
        this.menu.activeTab = tab;
      }
    },
    openMenu(menu: string) {
      this.activeMenu = menu;
    },
    closeMenu() {
      this.activeMenu = false;
    },
    toggleMenu() {
      if (this.activeMenu) {
        this.activeMenu = false;
      } else {
        this.activeMenu = 'menu';
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMenu, import.meta.hot));
}
