import { CustomStartMenuButton } from '@/exports/plugins';
import { vm } from '@/vm/vm';
import { defineStore } from 'pinia';

export interface StartMenuState {
  buttons: CustomStartMenuButton[];
}

export const useStartMenu = defineStore('startMenu', {
  state: () =>
    ({
      buttons: [],
    } as StartMenuState),
  actions: {
    addButtonsFromPlugins() {
      const plugins = vm.plugins;
      plugins.forEach((plugin) => {
        if (plugin.startMenuButtons) {
          plugin.startMenuButtons.forEach((button) => {
            const app = (window as any).narrat.app;
            if (button.popupComponent) {
              app.component(
                button.popupComponent.name,
                button.popupComponent.component,
              );
            }
            this.buttons.push(button);
          });
        }
      });
    },
  },
});
