import { getConfig } from '@/config';
import { defineStore } from 'pinia';

export interface MenuButtonState {
  id: string;
  onClick?: () => void;
  condition?: () => boolean;
  cssId?: string;
  cssClass?: string;
  text: string;
  component: string;
}
export interface MenuStoreState {
  buttons: MenuButtonState[];
  modal: string | false;
}

export const useMenu = defineStore('menu', {
  state: () =>
    ({
      buttons: [],
      modal: false,
    } as MenuStoreState),
  getters: {
    showSkills(): boolean {
      if (Object.entries(getConfig().skills).length > 0) {
        return true;
      }
      return false;
    },
    showInventory(): boolean {
      if (Object.entries(getConfig().items).length > 0) {
        return true;
      }
      return false;
    },
    showQuests(): boolean {
      if (Object.entries(getConfig().quests).length > 0) {
        return true;
      }
      return false;
    },
    buttonsToShow(state): MenuButtonState[] {
      return state.buttons
        .map((button) => {
          const buttonData = getConfig().menuButtons[button.id] || {};
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
  },
  actions: {
    setup() {},
    addMenuOption(config: MenuButtonState) {
      this.buttons.push(config);
    },
    openModal(modal: string) {
      this.modal = modal;
    },
    closeModal() {
      this.modal = false;
    },
    toggleMenu() {
      if (this.modal) {
        this.modal = false;
      } else {
        this.modal = 'menu';
      }
    },
  },
});
