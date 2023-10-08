import { gameloop } from '@/utils/gameloop';
import { Vec2, Vector2 } from '@/utils/Vector2';
import { error } from '@/utils/error-handling';
import { deepCopy } from '@/utils/data-helpers';

export type InputMode = 'km' | 'gamepad';
export type NarratGamepadButton = {
  index: number;
  state: GamepadButton;
  previous: GamepadButton;
};
export type NarratGamepad = {
  id: string;
  gamepad: Gamepad;
  buttons: NarratGamepadButton[];
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
  keyboardKey?: string;
  gamepadButton?: number;
}

export interface AnalogKeybind {
  left: string;
  right: string;
  up: string;
  down: string;
}

export interface ButtonAction {
  id: string;
  type: 'button';
  action: 'press' | 'release';
  keybinds: ButtonKeybind[];
}

export interface AnalogAction {
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
    const gamepads = navigator
      .getGamepads()
      .filter((gamepad) => gamepad !== null) as Gamepad[];
    if (gamepads.length > 0) {
      return gamepads[0];
    }
  }

  public startListening() {
    this.updateGamepad();
    window.addEventListener('mousemove', (event) => {
      this.mouseEvent();
    });
    window.addEventListener('keydown', (event) => {
      this.kbEvent();
      const previous = this.getKeyboardState(event.key).current;
      this.keyboardState[event.key] = {
        previous,
        current: true,
      };
    });
    window.addEventListener('keyup', (event) => {
      this.kbEvent();
      const previous = this.getKeyboardState(event.key).current;
      this.keyboardState[event.key] = {
        previous,
        current: false,
      };
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

  public setupNarratGamepad(gamepad: Gamepad): NarratGamepad {
    const narratGamepad = {
      id: gamepad.id,
      gamepad,
      buttons: gamepad.buttons.map((button, index) => {
        return this.getNarratButtonFromGamepad(button, button, index);
      }),
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

  public getGamepadState(key: number) {
    if (this.gamepad && this.gamepad.buttons.length > key) {
      return {
        current: this.gamepad.buttons[key].state,
        previous: this.gamepad.buttons[key].previous,
      };
    } else {
      return null;
    }
  }

  public debugGamepad() {
    if (this.gamepad) {
      for (const [index, button] of this.gamepad.buttons.entries()) {
        if (button.state.pressed !== button.previous.pressed) {
          // console.log(
          //   `Button ${index} ${button.state.pressed ? 'pressed' : 'released'}`,
          // );
        }
      }
    }
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
            if (typeof keybind.keyboardKey === 'string') {
              const keyboardState = this.getKeyboardState(keybind.keyboardKey);
              if (keyboardState.current === true) {
                keyState = true;
              }
            }
            if (typeof keybind.gamepadButton === 'number') {
              const gamepadState = this.getGamepadState(keybind.gamepadButton);
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
          if (this.getKeyboardState(keybind.left).current) {
            state.fullState.left = 1;
            analogValue.x -= 1;
          }
          if (this.getKeyboardState(keybind.right).current) {
            state.fullState.right = 1;
            analogValue.x += 1;
          }
          if (this.getKeyboardState(keybind.up).current) {
            state.fullState.up = 1;
            analogValue.y -= 1;
          }
          if (this.getKeyboardState(keybind.down).current) {
            state.fullState.down = 1;
            analogValue.y += 1;
          }
        });
        analogValue = Vec2.normalize(analogValue);
        state.value = analogValue;
      }
    }
  }
}

export const inputs = new Inputs();
