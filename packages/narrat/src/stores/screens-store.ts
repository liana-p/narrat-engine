import { ScreensConfig } from '@/config/screens-config';
import { deepCopy } from '@/utils/data-helpers';
import { error, warning } from '@/utils/error-handling';
import {
  AddTransition,
  generateTransitionState,
  TransitionState,
} from '@/utils/transition';
import deepmerge from 'deepmerge';
import { defineStore } from 'pinia';

export type ButtonStateValue = boolean | 'hidden' | 'greyed';
export interface ButtonsState {
  [key: string]: {
    state: ButtonStateValue;
  };
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

export const useScreens = defineStore('screens', {
  state: () =>
    ({
      layers: [
        {
          screen: 'default',
        },
      ],
      buttons: {} as ButtonsState,
    } as ScreenState),
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
        layerState.screen = null;
        if (!transition) {
          resolve();
        }
      });
    },
    setButtons(config: ScreensConfig) {
      const { buttons, screens } = config;

      for (const key in buttons) {
        this.buttons[key] = {
          state: buttons[key].enabled,
        };
      }
      // Support for inline button conf in screens as it's easier for end users
      // We basically copy the button's config to the buttons config object if we find any buttons defined inline in a screen
      for (const key in screens) {
        const screen = screens[key];
        if (screen.buttons) {
          for (const [index, button] of screen.buttons.entries()) {
            // If the button is a config object, add it to the buttons config, and also create its state
            if (typeof button === 'object') {
              config.buttons[button.id] = button;
              // Change the inline config to be a string again
              screen.buttons[index] = button.id;
              this.buttons[button.id] = {
                state: button.enabled,
              };
            }
          }
        }
      }
    },
    changeButton(button: string, newValue: ButtonStateValue) {
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
      this.layers = data.layers.map((layer) => {
        if (layer !== null && typeof layer !== 'string') {
          layer = null;
        }
        return { screen: layer };
      });
      this.buttons = deepmerge(this.buttons, data.buttons);
    },
  },
  getters: {
    nonEmptyLayers(state: ScreenState): FullLayerState[] {
      return state.layers.filter((layer) => layer) as FullLayerState[];
    },
  },
});
