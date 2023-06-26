import {
  AnalogAction,
  AnalogActionState,
  AnalogEvent,
  ButtonAction,
  ButtonActionState,
  ButtonEvent,
  Inputs,
} from '@/inputs/Inputs';
import { InputEvents } from '@/utils/typed-emitter';
import { defineStore } from 'pinia';

export interface InputStoreEvents {
  press?: ButtonEvent;
  release?: ButtonEvent;
  analogChange?: AnalogEvent;
}

export interface InputListener {
  id: string;
  actions: Record<string, InputStoreEvents>;
}

export interface InputsStoreState {
  inputs: Inputs;
  inputStack: InputListener[];
}

export const useInputs = defineStore('inputs', {
  state: () =>
    ({
      inputs: new Inputs(),
      inputStack: [],
    } as InputsStoreState),
  actions: {
    setupInputs() {
      this.inputs.startListening();
    },
    registerInputListener(
      listeners?: Record<string, InputStoreEvents>,
    ): InputListener {
      const id = `${Date.now()}-${Math.floor(Math.random() * 100000000)}`;
      const listener = {
        id,
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
