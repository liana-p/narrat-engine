import { Inputs } from '@/inputs/Inputs';
import { defineStore } from 'pinia';

export interface TooltipState {
  title?: string;
  text: string;
  x: number;
  y: number;
  width: number;
}

export interface InputsStoreState {
  inputs: Inputs;
}

export const useInputs = defineStore('inputs', {
  state: () => ({ inputs: new Inputs() } as InputsStoreState),
  actions: {
    setupInputs() {
      this.inputs.startListening();
    },
  },
});
