import { gameloop } from '@/utils/gameloop';
import { Vec2, Vector2 } from '@/utils/Vector2';
import { error } from '@/utils/error-handling';
import { deepCopy } from '@/utils/data-helpers';
import { useRenderingStore } from '@/stores/rendering-store';
import { getCommonConfig } from '@/config';
import {
  GamepadKey,
  KeyboardKey,
  gamepadAxisDirectionToGamepadKey,
  gamepadAxisIndexToGamepadAxis,
  gamepadButtonEnumToGamepadButtonNumber,
  gamepadIndexToGamepadButton,
  keyboardKeyEnumToKeyboardKeyString,
  keyboardKeyStringToKeyboardKey,
} from './input-key-types';

export const AXIS_THRESHOLD = 0.3;

export type InputMode = 'km' | 'gamepad';
export type NarratGamepadButton = {
  index: number;
  state: GamepadButton;
  previous: GamepadButton;
};

export type NarratGamepadAxisButton = {
  key: GamepadKey;
  state: GamepadButton;
  previous: GamepadButton;
};

export interface NarratGamepadAxes {
  index: number;
  value: number;
  previous: number;
}

export type NarratGamepad = {
  id: string;
  gamepad: Gamepad;
  buttons: NarratGamepadButton[];
  axesButtons: NarratGamepadAxisButton[];
  axes: NarratGamepadAxes[];
};

export type ButtonEvent = (
  action: ButtonAction,
  state: ButtonActionState,
  previousState: ButtonActionState,
) => void;
export type AnalogEvent = (
  action: AnalogAction,
  state: AnalogActionState,
  previousState: AnalogActionState,
) => void;

export interface ButtonKeybind {
  keyboardKey?: KeyboardKey;
  gamepadKey?: GamepadKey;
}

export interface AnalogKeybind {
  left: KeyboardKey;
  right: KeyboardKey;
  up: KeyboardKey;
  down: KeyboardKey;
}

export interface BaseAction {
  id: string;
  type: 'button' | 'analog';
  label: string;
  keyboardIcon?: string;
  gamepadIcon?: string;
  showInLegend: boolean;
}
export interface ButtonAction extends BaseAction {
  type: 'button';
  action: 'press' | 'release';
  keybinds: ButtonKeybind[];
}

export interface AnalogAction extends BaseAction {
  id: string;
  type: 'analog';
  keybinds: AnalogKeybind[];
}

export interface ButtonActionState {
  config: ButtonAction;
  active: boolean;
  justPressed: boolean;
  justReleased: boolean;
}

export interface AnalogDirectionState {
  left: number;
  right: number;
  up: number;
  down: number;
}

export interface AnalogActionState {
  config: AnalogAction;
  value: Vector2;
  fullState: AnalogDirectionState;
}
export type Action = ButtonAction | AnalogAction;

export type ActionState = ButtonActionState | AnalogActionState;
export type ButtonActionStatus = {
  state: ButtonActionState;
  previous: ButtonActionState;
};
export type AnalogActionStatus = {
  state: AnalogActionState;
  previous: AnalogActionState;
};
export type ActionStatus = ButtonActionStatus | AnalogActionStatus;
export class Inputs extends EventTarget {
  public gamepadAvailable: boolean = true;
  public gameActions: {
    [key: string]: Action;
  } = {};

  public keyboardState: {
    [key: string]: {
      current: boolean;
      previous: boolean;
    };
  } = {};

  public actions: {
    [key: string]: ActionStatus;
  } = {};

  public lastInputMethodUsed: InputMode = 'km';

  public gamepad: NarratGamepad | null = null;

  public kbEvent() {
    this.changeLastInput('km');
  }

  public getGamepads() {
    if (navigator.getGamepads) {
      return navigator.getGamepads();
    } else {
      this.gamepadAvailable = false;
      return [] as Gamepad[];
    }
  }

  public gamepadEvent() {
    this.changeLastInput('gamepad');
  }

  public mouseEvent() {
    this.changeLastInput('km');
  }

  public changeLastInput(inputMode: InputMode) {
    if (this.lastInputMethodUsed !== inputMode) {
      this.lastInputMethodUsed = inputMode;
      this.dispatchEvent(
        new CustomEvent<InputMode>('change-input', { detail: inputMode }),
      );
    }
  }

  public getGamepad() {
    const gamepads = this.getGamepads().filter(
      (gamepad) => gamepad !== null,
    ) as Gamepad[];
    if (gamepads.length > 0) {
      return gamepads[0];
    }
  }

  public startListening() {
    this.updateGamepad();
    const container = useRenderingStore().inputsContainer!;
    container.addEventListener('mousemove', (event) => {
      this.mouseEvent();
    });
    container.addEventListener('keydown', (event) => {
      this.kbEvent();
      const keyboardKey = this.getKeyboardKeyFromEventKey(event.key);
      if (keyboardKey) {
        const keyString = this.getKeyboardKeyString(keyboardKey);
        const previous = this.getKeyboardState(keyString).current;
        this.keyboardState[keyString] = {
          previous,
          current: true,
        };
      }
    });
    container.addEventListener('keyup', (event) => {
      this.kbEvent();
      const keyboardKey = this.getKeyboardKeyFromEventKey(event.key);
      if (keyboardKey) {
        const keyString = this.getKeyboardKeyString(keyboardKey);
        const previous = this.getKeyboardState(keyString).current;
        this.keyboardState[keyString] = {
          previous,
          current: false,
        };
      }
    });
    gameloop.on('preUpdate', () => {
      this.update();
    });
  }

  public updateGamepad() {
    const gamepad = this.getGamepad();
    if (gamepad) {
      if (!this.gamepad) {
        this.gamepad = this.setupNarratGamepad(gamepad);
      } else {
        this.updateAllNarratButtons(gamepad, this.gamepad);
      }
    } else {
      this.gamepad = null;
    }
  }

  public mapAxisToGamepadButton(
    axisIndex: number,
    value: number,
  ): [NarratGamepadAxisButton, NarratGamepadAxisButton] | null {
    const mappings = gamepadAxisDirectionToGamepadKey;
    const axisKey = gamepadAxisIndexToGamepadAxis[axisIndex];
    if (axisKey && mappings[axisKey]) {
      const [negativeKey, positiveKey] = mappings[axisKey];
      const absValue = Math.abs(value);
      const negative = value < 0;
      const positive = value > 0;
      const negativeButton: NarratGamepadAxisButton = {
        key: negativeKey,
        state: {
          pressed: negative && absValue > AXIS_THRESHOLD,
          touched: negative && absValue > AXIS_THRESHOLD,
          value: negative ? absValue : 0,
        },
        previous: {
          pressed: false,
          touched: false,
          value: 0,
        },
      };
      const positiveButton: NarratGamepadAxisButton = {
        key: positiveKey,
        state: {
          pressed: positive && absValue > AXIS_THRESHOLD,
          touched: positive && absValue > AXIS_THRESHOLD,
          value: positive ? absValue : 0,
        },
        previous: {
          pressed: false,
          touched: false,
          value: 0,
        },
      };
      return [negativeButton, positiveButton];
    } else {
      error(`No mapping found for axis ${axisIndex}`);
      return null;
    }
  }

  public mapAllAxisToGamepadButtons(
    previousAxesButtons: NarratGamepadAxisButton[],
    gamepad: Gamepad,
  ): NarratGamepadAxisButton[] {
    const axesButtons: NarratGamepadAxisButton[] = [];
    for (const [index, axis] of gamepad.axes.entries()) {
      const mappedButtons = this.mapAxisToGamepadButton(index, axis);
      if (mappedButtons) {
        if (previousAxesButtons.length > index) {
          mappedButtons[0].previous = previousAxesButtons[0].state;
          mappedButtons[1].previous = previousAxesButtons[1].state;
        }
        axesButtons.push(...mappedButtons);
      }
    }
    return axesButtons;
  }

  public setupNarratGamepad(gamepad: Gamepad): NarratGamepad {
    const narratGamepad = {
      id: gamepad.id,
      gamepad,
      buttons: gamepad.buttons.map((button, index) => {
        return this.getNarratButtonFromGamepad(button, button, index);
      }),
      axes: gamepad.axes.map((axis, index) => {
        return {
          index,
          value: axis,
          previous: axis,
        };
      }),
      axesButtons: this.mapAllAxisToGamepadButtons([], gamepad),
    };
    return narratGamepad;
  }

  public updateAllNarratButtons(
    gamepad: Gamepad,
    narratGamepad: NarratGamepad,
  ) {
    // if (pressedButtons) {
    //   console.log(`pressed buttons: ${pressedButtons}`);
    // }
    for (const [index, button] of gamepad.buttons.entries()) {
      const narratButton = narratGamepad.buttons[index];
      narratButton.previous = deepCopy(narratButton.state);
      narratButton.state = deepCopy(button);
      if (narratButton.previous.pressed !== narratButton.state.pressed) {
        this.gamepadEvent();
      }
    }
    for (const [index, axis] of gamepad.axes.entries()) {
      const narratAxis = narratGamepad.axes[index];
      narratAxis.previous = narratAxis.value;
      narratAxis.value = axis;
      if (narratAxis.previous !== narratAxis.value) {
        this.gamepadEvent();
      }
    }
    narratGamepad.axesButtons = this.mapAllAxisToGamepadButtons(
      narratGamepad.axesButtons,
      gamepad,
    );
  }

  public getNarratButtonFromGamepad(
    previous: GamepadButton,
    gamepadButton: GamepadButton,
    index: number,
  ): NarratGamepadButton {
    return {
      index,
      state: deepCopy(gamepadButton),
      previous: deepCopy(gamepadButton),
    };
  }

  public addAction(action: Action) {
    this.gameActions[action.id] = action;
    if (action.type === 'button') {
      const state: ButtonActionState = {
        config: action,
        active: false,
        justPressed: false,
        justReleased: false,
      };
      this.actions[action.id] = {
        state,
        previous: deepCopy(state),
      };
    } else {
      const state: AnalogActionState = {
        config: action,
        value: Vec2.create(0, 0),
        fullState: {
          left: 0,
          right: 0,
          up: 0,
          down: 0,
        },
      };
      this.actions[action.id] = {
        state,
        previous: deepCopy(state),
      };
    }
  }

  public getAnalog(actionId: string): AnalogActionState {
    if (!this.actions[actionId]) {
      error(`Action ${actionId} does not exist`);
    }
    return this.actions[actionId].state as AnalogActionState;
  }

  public getAction(actionId: string): ActionStatus {
    if (!this.actions[actionId]) {
      error(`Action ${actionId} does not exist`);
    }
    return this.actions[actionId];
  }

  public getButton(actionId: string): ButtonActionState {
    if (!this.actions[actionId]) {
      error(`Action ${actionId} does not exist`);
    }
    return this.actions[actionId].state as ButtonActionState;
  }

  public getKeyboardState(key: string) {
    if (this.keyboardState[key]) {
      return this.keyboardState[key];
    } else {
      this.keyboardState[key] = {
        current: false,
        previous: false,
      };
      return this.keyboardState[key];
    }
  }

  public getGamepadState(key: GamepadKey) {
    const buttonIndex = this.getGamepadButtonIndex(key);

    // First check regular buttons
    if (this.gamepad && this.gamepad.buttons.length > buttonIndex) {
      return {
        current: this.gamepad.buttons[buttonIndex].state,
        previous: this.gamepad.buttons[buttonIndex].previous,
      };
    }
    // Then check axis buttons
    else if (this.gamepad && this.gamepad.axesButtons) {
      const axisButton = this.gamepad.axesButtons.find(
        (button) => button.key === key,
      );
      if (axisButton) {
        return {
          current: axisButton.state,
          previous: axisButton.previous,
        };
      }
    }

    return null;
  }

  public debugGamepad() {
    if (this.gamepad) {
      // Check regular buttons
      for (const [index, button] of this.gamepad.buttons.entries()) {
        if (button.state.pressed !== button.previous.pressed) {
          // console.log(
          //   `Button ${index} ${button.state.pressed ? 'pressed' : 'released'}`,
          // );
        }
      }

      // Check axis buttons
      if (this.gamepad.axesButtons) {
        for (const button of this.gamepad.axesButtons) {
          if (button.state.pressed !== button.previous.pressed) {
            // console.log(
            //   `Axis Button ${button.key} ${button.state.pressed ? 'pressed' : 'released'}`,
            // );
          }
        }
      }
    }
  }

  public getKeybindKey(
    config: ButtonAction,
    keybind: ButtonKeybind,
  ): ButtonKeybind {
    const key = config.id;
    const override = getCommonConfig().hotkeys[key];
    if (typeof override !== 'undefined') {
      return {
        ...keybind,
        keyboardKey: override as any,
      };
    }
    return keybind;
  }

  public update() {
    // console.log('inputs update');
    this.updateGamepad();
    this.debugGamepad();
    for (const config of Object.values(this.gameActions)) {
      if (config.type === 'button') {
        const action = this.actions[config.id];
        const previous = deepCopy(action.state) as ButtonActionState;
        const state = action.state as ButtonActionState;
        action.previous = previous;
        // console.log(`${config.id} Previous State ${previous.active}`);
        if (config.action === 'press') {
          const isPressed = config.keybinds.some((keybind) => {
            let keyState = false;
            keybind = this.getKeybindKey(config, keybind);

            if (
              keybind.keyboardKey !== undefined &&
              this.lastInputMethodUsed === 'km'
            ) {
              const keyString = this.getKeyboardKeyString(keybind.keyboardKey);
              const keyboardState = this.getKeyboardState(keyString);
              if (keyboardState.current === true) {
                keyState = true;
              }
            }

            if (
              keybind.gamepadKey !== undefined &&
              this.lastInputMethodUsed === 'gamepad'
            ) {
              const gamepadState = this.getGamepadState(keybind.gamepadKey);
              if (gamepadState && gamepadState.current.pressed === true) {
                keyState = true;
              }
            }

            return keyState;
          });

          if (isPressed) {
            // console.log(`${config.id} set true`);
            state.active = true;
          } else {
            // console.log(`${config.id} set false`);
            state.active = false;
          }

          if (state.active && !previous.active) {
            // console.log(`Just pressed ${config.id}`);
            state.justPressed = true;
          } else {
            state.justPressed = false;
          }

          if (!state.active && previous.active) {
            // console.log(`Just released ${config.id}`);
            state.justReleased = true;
          } else {
            state.justReleased = false;
          }
        }
        // WIP future action system
      } else if (config.type === 'analog') {
        const action = this.actions[config.id];
        const state = action.state as AnalogActionState;
        const previous = deepCopy(action.state) as AnalogActionState;
        action.previous = deepCopy(state);
        let analogValue = Vec2.create(0, 0);
        config.keybinds.forEach((keybind) => {
          if (
            this.getKeyboardState(this.getKeyboardKeyString(keybind.left))
              .current
          ) {
            state.fullState.left = 1;
            analogValue.x -= 1;
          }
          if (
            this.getKeyboardState(this.getKeyboardKeyString(keybind.right))
              .current
          ) {
            state.fullState.right = 1;
            analogValue.x += 1;
          }
          if (
            this.getKeyboardState(this.getKeyboardKeyString(keybind.up)).current
          ) {
            state.fullState.up = 1;
            analogValue.y -= 1;
          }
          if (
            this.getKeyboardState(this.getKeyboardKeyString(keybind.down))
              .current
          ) {
            state.fullState.down = 1;
            analogValue.y += 1;
          }
        });
        analogValue = Vec2.normalize(analogValue);
        state.value = analogValue;
      }
    }
  }

  // Helper function to convert keyboard event key to KeyboardKey enum
  public getKeyboardKeyFromEventKey(eventKey: string): KeyboardKey | undefined {
    return keyboardKeyStringToKeyboardKey[eventKey];
  }

  // Helper function to convert KeyboardKey enum to string for state lookup
  public getKeyboardKeyString(key: KeyboardKey): string {
    return keyboardKeyEnumToKeyboardKeyString[key];
  }

  // Helper function to convert GamepadKey enum to button index
  public getGamepadButtonIndex(key: GamepadKey): number {
    return gamepadButtonEnumToGamepadButtonNumber[key];
  }

  // Helper function to convert button index to GamepadKey enum
  public getGamepadKeyFromIndex(index: number): GamepadKey | undefined {
    return gamepadIndexToGamepadButton[index];
  }
}

export const inputs = new Inputs();
