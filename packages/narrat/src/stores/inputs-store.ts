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

export interface InputStoreEvents {
  press?: ButtonEvent;
  release?: ButtonEvent;
  analogChange?: AnalogEvent;
}

const defaultActions: Action[] = [
  {
    id: 'left',
    type: 'button',
    action: 'press',
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
    keybinds: [
      {
        keyboardKey: 'ArrowDown',
        gamepadButton: 13,
      },
    ],
  },
  {
    id: 'continue',
    type: 'button',
    action: 'press',
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
      inputMode: 'mk' as InputMode,
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInputs, import.meta.hot));
}
