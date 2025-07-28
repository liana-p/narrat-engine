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
import { GamepadKey, KeyboardKey } from '@/inputs/input-key-types';

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
    label: 'narrat.inputs.movement',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-arrows.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad.png',
    action: 'press',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Arrow_Left,
        gamepadKey: GamepadKey.Dpad_Left,
      },
    ],
  },
  {
    id: 'left',
    type: 'button',
    label: 'narrat.inputs.left',
    keyboardIcon: 'img/ui/button-prompts/keyboard/arrow-left.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad-left.png',
    action: 'press',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Arrow_Left,
        gamepadKey: GamepadKey.Dpad_Left,
      },
      {
        gamepadKey: GamepadKey.Left_Thumbstick_Left,
      },
    ],
  },
  {
    id: 'right',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.right',
    keyboardIcon: 'img/ui/button-prompts/keyboard/arrow-right.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad-right.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Arrow_Right,
        gamepadKey: GamepadKey.Dpad_Right,
      },
      {
        gamepadKey: GamepadKey.Left_Thumbstick_Right,
      },
    ],
  },
  {
    id: 'up',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.up',
    keyboardIcon: 'img/ui/button-prompts/keyboard/arrow-up.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad-up.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Arrow_Up,
        gamepadKey: GamepadKey.Dpad_Up,
      },
      {
        gamepadKey: GamepadKey.Left_Thumbstick_Up,
      },
    ],
  },
  {
    id: 'down',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.down',
    keyboardIcon: 'img/ui/button-prompts/keyboard/arrow-down.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/dpad-down.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Arrow_Down,
        gamepadKey: GamepadKey.Dpad_Down,
      },
      {
        gamepadKey: GamepadKey.Left_Thumbstick_Down,
      },
    ],
  },
  {
    id: 'scroll',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.scroll',
    gamepadIcon: 'img/ui/button-prompts/gamepad/xbox_stick_r_vertical.png',
    showInLegend: true,
    keybinds: [],
  },
  {
    id: 'continue',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.continue',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-space.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-down.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Space,
        gamepadKey: GamepadKey.FaceButton_Bottom,
      },
    ],
  },
  {
    id: 'confirm',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.confirm',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-enter.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-down.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Enter,
        gamepadKey: GamepadKey.FaceButton_Bottom,
      },
    ],
  },
  {
    id: 'cancel',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.cancel',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-escape.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-right.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Escape,
        gamepadKey: GamepadKey.FaceButton_Right,
      },
    ],
  },
  {
    id: 'system',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.system_menu',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-n.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/special-right.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_N,
        gamepadKey: GamepadKey.Special_Right,
      },
    ],
  },
  {
    id: 'menu',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.game_menu',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-m.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/special-left.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_M,
        gamepadKey: GamepadKey.Special_Left,
      },
    ],
  },
  {
    id: 'previousTab',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.previous',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-p.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/shoulder-left.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_P,
        gamepadKey: GamepadKey.Shoulder_Left,
      },
    ],
  },
  {
    id: 'nextTab',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.next',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-o.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/shoulder-right.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_O,
        gamepadKey: GamepadKey.Shoulder_Right,
      },
    ],
  },
  {
    id: 'subPreviousTab',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.previous_tab',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-i.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-left.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_I,
        gamepadKey: GamepadKey.Trigger_Button_Left,
      },
    ],
  },
  {
    id: 'subNextTab',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.next_tab',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-u.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-right.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_U,
        gamepadKey: GamepadKey.Trigger_Button_Right,
      },
    ],
  },
  {
    id: 'viewportSelect',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.interact',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-v.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-left.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_V,
        gamepadKey: GamepadKey.FaceButton_Left,
      },
    ],
  },
  {
    id: 'autoPlay',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.toggle_auto_play',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-a.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-left.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_A,
        gamepadKey: GamepadKey.Trigger_Button_Left,
      },
    ],
  },
  {
    id: 'skip',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.toggle_skip',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-s.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-right.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_S,
        gamepadKey: GamepadKey.Trigger_Button_Right,
      },
    ],
  },
  {
    id: 'toggleHistory',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.toggle_history',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-t.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-top.png',
    showInLegend: false,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_T,
        gamepadKey: GamepadKey.FaceButton_Top,
      },
    ],
  },
  {
    id: 'sliderControl',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.control_slider',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-v.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-left.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_E,
        gamepadKey: GamepadKey.FaceButton_Left,
      },
    ],
  },
  {
    id: 'sliderRelease',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.release_slider',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-b.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/facebutton-right.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Key_B,
        gamepadKey: GamepadKey.FaceButton_Right,
      },
    ],
  },
  {
    id: 'decreaseSetting',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.decrease_setting',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-minus.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-left.png',
    showInLegend: true,
    keybinds: [
      {
        gamepadKey: GamepadKey.Left_Thumbstick_Left,
        keyboardKey: KeyboardKey.Arrow_Left,
      },
    ],
  },
  {
    id: 'increaseSetting',
    type: 'button',
    action: 'press',
    label: 'narrat.inputs.increase_setting',
    keyboardIcon: 'img/ui/button-prompts/keyboard/key-plus.png',
    gamepadIcon: 'img/ui/button-prompts/gamepad/trigger-right.png',
    showInLegend: true,
    keybinds: [
      {
        keyboardKey: KeyboardKey.Arrow_Right,
        gamepadKey: GamepadKey.Left_Thumbstick_Right,
      },
    ],
  },
];

export interface InputListener {
  id: string;
  name: string;
  actions: Record<string, InputStoreEvents>;
  cascadeDown: boolean;
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
      let listenerIndex = this.inputStack.length - 1;
      let stopCascading = false;
      while (!stopCascading && listenerIndex >= 0) {
        const listener = this.inputStack[listenerIndex];
        if (!listener?.cascadeDown) {
          stopCascading = true;
        }
        listenerIndex--;
        if (!listener) continue;
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
      }
    },
    getInputs() {
      return inputs;
    },
    registerInputListener(
      name: string,
      listeners: Record<string, InputStoreEvents>,
      cascadeDown: boolean = false,
    ): InputListener {
      const id = `${Date.now()}-${Math.floor(Math.random() * 100000000)}`;
      const listener = {
        id,
        name,
        actions: listeners ?? {},
        cascadeDown,
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
        const action = inputs.gameActions[inputName];
        if (!action?.showInLegend) return false;

        // Only show inputs that have the current control type
        if (state.inputMode === 'gamepad') {
          return action.gamepadIcon !== undefined;
        } else {
          return action.keyboardIcon !== undefined;
        }
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInputs, import.meta.hot));
}
