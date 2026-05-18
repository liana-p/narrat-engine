import { getButtonConfig, getConfig } from '@/config';
import { Config } from '@/config/config-output';
import { deepCopy } from '@/utils/data-helpers';
import { error, warning } from '@/utils/error-handling';
import {
  AddTransition,
  generateTransitionState,
  TransitionState,
} from '@/utils/transition';
import deepmerge from 'deepmerge';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useInventory } from './inventory-store';
import { isViewportElementClickable } from '@/utils/viewport-utils';
import { audioEvent } from '@/utils/audio-loader';
import { useVM } from './vm-store';
import { useConfig } from './config-store';

export type ButtonStateValue = boolean | 'hidden' | 'greyed';
export interface ButtonState {
  state: ButtonStateValue;
}
export interface ButtonsState {
  [key: string]: ButtonState;
}

export interface FullLayerState {
  screen: string | null;
  transition?: TransitionState;
}

export type LayerState = FullLayerState;
export interface ScreenState {
  layers: LayerState[];
  buttons: ButtonsState;
}

export type ScreenSave = {
  layers: Array<string | null>;
  buttons: ButtonsState;
};

export const defaultScreensState = (): ScreenState =>
  ({
    layers: [
      {
        screen: 'default',
      },
    ],
    buttons: {} as ButtonsState,
  }) as ScreenState;

export const useScreens = defineStore('screens', {
  state: defaultScreensState,
  actions: {
    setScreen(screen: string, layer: number, transition?: AddTransition) {
      return new Promise<void>((resolve) => {
        const oldScreen = this.layers[layer || 0];
        let transitionState: TransitionState | undefined;
        const oldScreenValue = oldScreen?.screen ?? null;
        if (oldScreenValue === screen) {
          resolve();
          return;
        }
        if (transition) {
          transitionState = generateTransitionState(
            transition,
            oldScreenValue,
            resolve,
          );
        }
        this.layers[layer || 0] = {
          screen,
          transition: transitionState,
        };
        if (!transitionState) {
          resolve();
        }
      });
    },
    finishTransition(layer: number) {
      const layerState = this.layers[layer];
      if (!layerState) {
        error(
          `Tried to finish transition on layer ${layer} but it doesn't exist`,
        );
      } else if (layerState.transition) {
        const resolver = layerState.transition!.resolve;
        delete layerState.transition;
        resolver();
      }
    },
    transitionScreen(
      screen: string,
      transition: AddTransition,
      layer?: number,
    ) {
      return this.setScreen(screen, layer ?? 0, transition);
    },
    emptyLayer(layer: number, transition?: AddTransition) {
      return new Promise<void>((resolve) => {
        const layerState = this.layers[layer];
        if (!layerState) {
          warning(`Tried to empty layer ${layer} but it doesn't exist`);
          return;
        }
        if (transition) {
          const oldScreen = layerState.screen;
          const transitionState = generateTransitionState(
            transition,
            oldScreen,
            resolve,
          );
          layerState.transition = transitionState;
        }
        layerState.screen = '@empty';
        if (!transition) {
          resolve();
        }
      });
    },
    updateConfig(config: Config['screens']) {
      const buttons = getConfig().buttons.buttons;
      for (const key in buttons) {
        if (!this.buttons[key]) {
          this.buttons[key] = {
            state: buttons[key].enabled,
          };
        }
      }
    },
    reset(config: Config['screens']) {
      this.$reset();
      this.updateConfig(config);
    },
    changeButton(button: string, newValue: ButtonStateValue) {
      if (!this.buttons[button]) {
        error(`Tried to change button ${button} but it doesn't exist`);
        return;
      }
      this.buttons[button].state = newValue;
    },
    generateSaveData(): ScreenSave {
      return {
        layers: deepCopy(this.layers)
          .filter((layer) => layer)
          .map((layer) => layer!.screen ?? null),
        buttons: deepCopy(this.buttons),
      };
    },
    loadSaveData(data: ScreenSave) {
      this.layers = deepCopy(data.layers).map((layer) => {
        if (layer !== null && typeof layer !== 'string') {
          layer = null;
        }
        return { screen: layer };
      });
      this.buttons = deepmerge(this.buttons, deepCopy(data.buttons));
    },
    isButtonDisabled(button: string) {
      const state = this.getButtonState(button);
      return state === 'hidden' || state === 'greyed' || state === false;
    },
    isButtonInteractible(button: string): boolean {
      const buttonState = this.getButtonState(button);
      if (!buttonState) {
        return false;
      }
      if (buttonState === true) {
        return true;
      }
      return false;
    },
    isButtonClickable(button: string) {
      const interactible = this.isButtonInteractible(button);
      if (!interactible) {
        return false;
      }
      const config = getButtonConfig(button);
      if (!isViewportElementClickable(config)) {
        return false;
      }
      return true;
    },
    getButtonState(button: string): ButtonStateValue {
      const config = getButtonConfig(button);
      const buttonValue = this.buttons[button];
      const tag = config.tag || 'default';
      const state = buttonValue.state;
      if (state === true) {
        if (useInventory().isInteractionTagBlocked(tag)) {
          return 'greyed';
        }
      }
      return state;
    },
    clickOnButton(button: string) {
      if (!this.isButtonClickable(button)) {
        return;
      }
      const vmStore = useVM();
      const config = getButtonConfig(button);
      audioEvent('onButtonClicked');
      const scriptToRun = config.action;
      if (!scriptToRun) {
        return;
      }
      if (config.actionType === 'run') {
        vmStore.runLabelFunction(scriptToRun);
      } else {
        vmStore.jumpToLabel(scriptToRun);
      }
    },
  },
  getters: {
    nonEmptyLayers(state: ScreenState): FullLayerState[] {
      return state.layers.filter((layer) => layer) as FullLayerState[];
    },
    isTransitioning(state: ScreenState): boolean {
      return state.layers.some((layer) => layer?.transition);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScreens, import.meta.hot));
}
