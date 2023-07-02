import { defineStore } from 'pinia';

export type GamepadState = {
  gamepads: Gamepad[];
};
export const useGamepad = defineStore('gamepad', {
  state: () =>
    ({
      gamepads: navigator.getGamepads(),
    } as GamepadState),
  actions: {
    setupGamepads() {
      window.addEventListener(
        'gamepadconnected',
        (e) => {
          this.handleGamepadConnecting(e);
        },
        false,
      );
      window.addEventListener(
        'gamepaddisconnected',
        (e) => {
          this.handleGamepadDisconnecting(e);
        },
        false,
      );
    },
    handleGamepadConnecting(event: GamepadEvent) {
      this.gamepads = this.findAllValidGamepads();
    },
    handleGamepadDisconnecting(event: GamepadEvent) {
      this.gamepads = this.findAllValidGamepads();
    },
    findAllValidGamepads() {
      return navigator
        .getGamepads()
        .filter((gamepad) => gamepad !== null) as Gamepad[];
    },
  },
  getters: {
    gamepad(): Gamepad | null {
      return this.gamepads[0] ?? null;
    },
  },
});
