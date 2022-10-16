import { gameloop } from '@/utils/gameloop';
import { Vec2, Vector2 } from '@/utils/Vector2';

export interface ButtonKeybind {
  keyboardKey: string;
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
  active: boolean;
  previous: boolean;
}

export interface AnalogDirectionState {
  left: number;
  right: number;
  up: number;
  down: number;
}

export interface AnalogActionState {
  value: Vector2;
  previous: Vector2;
  fullState: AnalogDirectionState;
  previousFullState: AnalogDirectionState;
}
export type Action = ButtonAction | AnalogAction;

export class Inputs {
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
    [key: string]: ButtonActionState | AnalogActionState;
  } = {};

  public startListening() {
    window.addEventListener('keydown', (event) => {
      const state = this.getKeyState(event.key);
      this.keyboardState[event.key] = {
        previous: state.current,
        current: true,
      };
    });
    window.addEventListener('keyup', (event) => {
      const state = this.getKeyState(event.key);
      this.keyboardState[event.key] = {
        previous: state.current,
        current: false,
      };
    });
    gameloop.on('preUpdate', () => {
      this.update();
    });
  }

  public addAction(action: Action) {
    this.gameActions[action.id] = action;
    if (action.type === 'button') {
      this.actions[action.id] = {
        active: false,
        previous: false,
      };
    } else {
      this.actions[action.id] = {
        value: Vec2.create(0, 0),
        previous: Vec2.create(0, 0),
        fullState: {
          left: 0,
          right: 0,
          up: 0,
          down: 0,
        },
        previousFullState: {
          left: 0,
          right: 0,
          up: 0,
          down: 0,
        },
      };
    }
  }

  public getAnalog(actionId: string): AnalogActionState {
    return this.actions[actionId] as AnalogActionState;
  }

  public getKeyState(key: string) {
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

  public update() {
    Object.values(this.gameActions).forEach((action) => {
      if (action.type === 'button') {
        if (action.action === 'press') {
          const isJustPressed = action.keybinds.some((keybind) => {
            const state = this.getKeyState(keybind.keyboardKey);
            return state.current === true && state.previous === false;
          });
          if (isJustPressed) {
            (this.actions[action.id] as ButtonActionState).active = true;
          }
        }
        // WIP future action system
      } else if (action.type === 'analog') {
        const actionState = this.actions[action.id] as AnalogActionState;
        actionState.previous = actionState.value;
        actionState.previousFullState = actionState.fullState;
        let analogValue = Vec2.create(0, 0);
        action.keybinds.forEach((keybind) => {
          if (this.getKeyState(keybind.left).current) {
            actionState.fullState.left = 1;
            analogValue.x -= 1;
          }
          if (this.getKeyState(keybind.right).current) {
            actionState.fullState.right = 1;
            analogValue.x += 1;
          }
          if (this.getKeyState(keybind.up).current) {
            actionState.fullState.up = 1;
            analogValue.y -= 1;
          }
          if (this.getKeyState(keybind.down).current) {
            actionState.fullState.down = 1;
            analogValue.y += 1;
          }
        });
        analogValue = Vec2.normalize(analogValue);
        actionState.value = analogValue;
      }
    });
  }
}
