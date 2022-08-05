import { error, warning } from '@/utils/error-handling';
import {
  AddTransition,
  generateTransitionState,
  getTransitionSettings,
  TransitionState,
} from '@/utils/transition';
import deepmerge from 'deepmerge';
import { defineStore } from 'pinia';
import { Config } from '../config';

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

export type LayerState = FullLayerState | undefined;
export interface ScreenState {
  layers: LayerState[];
  buttons: ButtonsState;
}

export type ScreenSave = {
  layers: Array<string | null>;
  buttons: ButtonsState;
};

// Create a pinia store named screens with a state using the type ScreenState, with actions:
// setScreen(screen: string): Sets the current screen to the given screen
// setButtons(buttons: { [key: string]: ButtonConfig }): Adds buttons to the buttons state by using the values in the buttons config object
// changeButton(button: string, newValue: boolean): Changes the value of a button in the buttons state
// generateSaveData(): Function that generates a ScreenState object from the data in the state
// loadSaveData(data: ScreenState): Function that loads the data into the state using a deepmerge of current state value and new value
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
    setButtons(config: Config) {
      const { buttons: buttonsConfig, screens: screensConfig, images } = config;

      for (const key in buttonsConfig) {
        this.buttons[key] = {
          state: buttonsConfig[key].enabled,
        };
      }
      // Support for inline button conf in screens as it's easier for end users
      // We basically copy the button's config to the buttons config object if we find any buttons defined inline in a screen
      for (const key in screensConfig) {
        if (screensConfig[key].buttons) {
          const screen = screensConfig[key];
          if (screen.background && images[screen.background]) {
            // Also defaulting to specifying screen backgrounds inline now
            screen.background = images[screen.background];
          }
          for (const index in screen.buttons) {
            const button = screen.buttons[index];
            // If the button is a config object, add it to the buttons config, and also create its state
            if (typeof button === 'object') {
              buttonsConfig[button.id] = button;
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
        layers: this.layers
          .filter((layer) => layer)
          .map((layer) => layer!.screen ?? null),
        buttons: this.buttons,
      };
    },
    loadSaveData(data: ScreenSave) {
      this.layers = data.layers.map((layer) => {
        return { screen: layer };
      });
      this.buttons = deepmerge(this.buttons, data.buttons);
    },
  },
  getters: {
    nonEmptyLayers(state: ScreenState): FullLayerState[] {
      return state.layers.filter(
        (layer) => layer && layer.screen,
      ) as FullLayerState[];
    },
  },
});
