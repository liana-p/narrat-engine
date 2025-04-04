import {
  Action,
  ActionStatus,
  AnalogEvent,
  ButtonEvent,
  inputs,
  ButtonActionStatus,
  InputMode,
} from '@/inputs/Inputs';
import { gameloop } from '@/utils/gameloop';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useMenu } from './menu-store';
import { getCommonConfig } from '@/config';
import { ComputedRef } from 'vue';

export interface InputStoreEvents {
  press?: ButtonEvent;
  release?: ButtonEvent;
  analogChange?: AnalogEvent;
  active?: ComputedRef<boolean>;
}

const defaultActions: Action[] = [
  {
    id: 'movement',
    type: 'button',
    label: 'Choose',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-arrows.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad.png',
    action: 'press',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: 'ArrowLeft',
        gamepadButton: 14,
      },
    ],
  },
  {
    id: 'left',
    type: 'button',
    label: 'Left',
    keyboardIcon: 'img/ui/button-prompts/keyboard/arrow-left.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad-left.png',
    action: 'press',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 'ArrowLeft',
        gamepadButton: 14,
      },
    ],
  },
  {
    id: 'right',
    type: 'button',
    action: 'press',
    label: 'Right',
    keyboardIcon: 'img/ui/button-prompts/keyboard/arrow-right.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad-right.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 'ArrowRight',
        gamepadButton: 15,
      },
    ],
  },
  {
    id: 'up',
    type: 'button',
    action: 'press',
    label: 'Up',
    keyboardIcon: 'img/ui/button-prompts/keyboard/arrow-up.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad-up.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 'ArrowUp',
        gamepadButton: 12,
      },
    ],
  },
  {
    id: 'down',
    type: 'button',
    action: 'press',
    label: 'Down',
    keyboardIcon: 'img/ui/button-prompts/keyboard/arrow-down.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad-down.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 'ArrowDown',
        gamepadButton: 13,
      },
    ],
  },
  {
    id: 'scroll',
    type: 'button',
    action: 'press',
    label: 'Scroll',
    keyboardIcon: '',
    gamepadIcon: 'img/ui/button-prompts/gamepad/xbox_stick_r_vertical.png',
    showInLegend: true,
    keybinds: [],
  },
  {
    id: 'continue',
    type: 'button',
    action: 'press',
    label: 'Continue',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-space.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-down.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 'Space',
        gamepadButton: 0,
      },
    ],
  },
  {
    id: 'confirm',
    type: 'button',
    action: 'press',
    label: 'Confirm',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-enter.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-down.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: 'Enter',
        gamepadButton: 0,
      },
    ],
  },
  {
    id: 'cancel',
    type: 'button',
    action: 'press',
    label: 'Cancel',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-escape.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-right.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: 'Escape',
        gamepadButton: 1,
      },
    ],
  },
  {
    id: 'system',
    type: 'button',
    action: 'press',
    label: 'System Menu',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-n.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/special-right.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 'n',
        gamepadButton: 9,
      },
    ],
  },
  {
    id: 'menu',
    type: 'button',
    action: 'press',
    label: 'Game Menu',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-m.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/special-left.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 'm',
        gamepadButton: 8,
      },
    ],
  },
  {
    id: 'previousTab',
    type: 'button',
    action: 'press',
    label: 'Previous',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-p.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/shoulder-left.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: 'p',
        gamepadButton: 4,
      },
    ],
  },
  {
    id: 'nextTab',
    type: 'button',
    action: 'press',
    label: 'Next',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-o.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/shoulder-right.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: 'o',
        gamepadButton: 5,
      },
    ],
  },
  {
    id: 'subPreviousTab',
    type: 'button',
    action: 'press',
    label: 'Previous Tab',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-i.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-left.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: 'i',
        gamepadButton: 6,
      },
    ],
  },
  {
    id: 'subNextTab',
    type: 'button',
    action: 'press',
    label: 'Next Tab',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-u.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-right.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: 'u',
        gamepadButton: 7,
      },
    ],
  },
  {
    id: 'viewportSelect',
    type: 'button',
    action: 'press',
    label: 'Interact',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-v.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-left.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: 'v',
        gamepadButton: 2,
      },
    ],
  },
  {
    id: 'autoPlay',
    type: 'button',
    action: 'press',
    label: 'Toggle Autoplay',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-a.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-left.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 'a',
        gamepadButton: 6,
      },
    ],
  },
  {
    id: 'skip',
    type: 'button',
    action: 'press',
    label: 'Skip',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-s.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-right.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: 's',
        gamepadButton: 7,
      },
    ],
  },
];

export interface InputListener {
  id: string;
  name: string;
  actions: Record<string, InputStoreEvents>;
}

export interface InputsStoreState {
  inputStack: InputListener[];
  baseInputListener: InputListener;
  inGameInputListener: InputListener | null;
  inputMode: InputMode;
  isTyping: boolean;
}

export const useInputs = defineStore('inputs', {
  state: () =>
    ({
      inputStack: [],
      baseInputListener: null as any,
      inputMode: 'km',
      isTyping: false,
      inGameInputListener: null,
    }) as InputsStoreState,
  actions: {
    setupInputs() {
      inputs.addEventListener('change-input', ((e: CustomEvent<InputMode>) => {
        this.inputMode = e.detail;
      }) as EventListener);
      for (const action of defaultActions) {
        inputs.addAction(action);
      }
      this.listenToBaseNarratInputs();
      gameloop.on('preUpdate', () => {
        for (const [key, value] of Object.entries(inputs.actions)) {
          if (value.state.config.type === 'button') {
            const buttonStatus = value as ButtonActionStatus;
            if (buttonStatus.state.justPressed) {
              this.triggerListeners(key, 'press', buttonStatus);
            }
            if (buttonStatus.state.justReleased) {
              this.triggerListeners(key, 'release', buttonStatus);
            }
          } else if (value.state.config.type === 'analog') {
            // TODO: Implement analog events
          }
        }
      });
    },
    createInGameInputListener() {
      if (this.inGameInputListener) {
        return;
      }
      this.inGameInputListener = this.registerInputListener('in-game', {
        system: {
          press: () => {
            useMenu().openMenu('system');
          },
        },
        menu: {
          press: () => {
            useMenu().openMenu('menu');
          },
        },
      });
    },
    startTyping() {
      this.isTyping = true;
    },
    stopTyping() {
      this.isTyping = false;
    },
    removeInGameInputListener() {
      if (this.inGameInputListener) {
        this.unregisterInputListener(this.inGameInputListener);
        this.inGameInputListener = null;
      }
    },
    listenToContainerInputs() {
      inputs.startListening();
    },
    listenToBaseNarratInputs() {
      // this.baseInputListener = this.registerInputListener({
      //   system: {
      //     press: () => {
      //       useMenu().openMenu('system');
      //     },
      //   },
      //   menu: {
      //     press: () => {
      //       useMenu().openMenu('menu');
      //     },
      //   },
      // });
    },
    getAction(actionId: string) {
      return inputs.gameActions[actionId];
    },
    triggerListeners(
      actionKey: string,
      eventType: keyof InputStoreEvents,
      status: ActionStatus,
    ) {
      // console.log(`Triggering action ${actionKey} ${eventType}`);
      const listener = this.inputStack[this.inputStack.length - 1];
      if (!listener) return;
      if (listener.actions[actionKey]) {
        if (listener.actions[actionKey][eventType]) {
          if (status.state.config.type === 'button') {
            const listenerEvent = listener.actions[actionKey][
              eventType
            ] as ButtonEvent;
            const buttonStatus = status as ButtonActionStatus;
            listenerEvent(
              status.state.config,
              buttonStatus.state,
              buttonStatus.previous,
            );
          } else {
            console.warn('Analog events not implemented yet');
          }
        }
      }
    },
    getInputs() {
      return inputs;
    },
    registerInputListener(
      name: string,
      listeners?: Record<string, InputStoreEvents>,
    ): InputListener {
      const id = `${Date.now()}-${Math.floor(Math.random() * 100000000)}`;
      const listener = {
        id,
        name,
        actions: listeners ?? {},
      };
      this.inputStack.push(listener);
      return listener;
    },
    unregisterInputListener(listener: InputListener) {
      const index = this.inputStack.findIndex((l) => l.id === listener.id);
      if (index === -1) {
        throw new Error('Input listener not found');
      }
      this.inputStack.splice(index, 1);
    },
    registerActions(
      listener: InputListener,
      actionId: string,
      eventsListener: InputStoreEvents,
    ) {
      listener.actions[actionId] = eventsListener;
    },
    getInputEvents(input: string): InputStoreEvents | null {
      const listener = this.inputStack[this.inputStack.length - 1];
      if (!listener) return null;
      return listener.actions[input] ?? null;
    },
    isInputActive(input: string) {
      const evt = this.getInputEvents(input);
      if (!evt) return false;
      if (typeof evt.active === 'boolean') {
        return evt.active;
      }
      return true;
    },
  },
  getters: {
    isGamepad(state) {
      return state.inputMode === 'gamepad';
    },
    isKeyboard(state) {
      return state.inputMode === 'km';
    },
    showPrompts(state) {
      return (
        (state.inputMode === 'gamepad' &&
          getCommonConfig().input?.showPromptsOnGamepad !== false) ||
        (state.inputMode === 'km' &&
          getCommonConfig().input?.showPromptsOnKeyboard !== false)
      );
    },
    allListeners(state) {
      return state.inputStack
        .map((listener) => {
          return Object.keys(listener.actions);
        })
        .flat()
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    inputLegend(state): string[] {
      return this.allListeners.filter((inputName) => {
        // Check if the listener is active
        const listener = this.inputStack[this.inputStack.length - 1];
        if (!listener) return null;
        const evt = listener.actions[inputName] ?? null;
        if (!evt) return false;
        // For some reason the computed value is processed already here
        if ((evt.active as any) === false) {
          return false;
        }
        // Check if the input should be shown in the legend
        return inputs.gameActions[inputName]?.showInLegend;
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInputs, import.meta.hot));
}
