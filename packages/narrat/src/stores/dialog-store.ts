import { randomId } from '@/utils/randomId';
import { processText } from '@/utils/string-helpers';
import { defineStore } from 'pinia';

export type AddDialogParams = Omit<DialogKey, 'id' | 'interactive'> & {
  interactive?: boolean;
};

export interface DialogKey {
  speaker: string;
  text: string;
  pose?: string;
  cssClass?: string;
  choices?: DialogChoice[];
  textField?: boolean;
  interactive: boolean;
  id: string;
}

export interface DialogChoice {
  choice: string;
  originalIndex: number;
  allowed: boolean;
}

type DialogState = {
  dialog: DialogKey[];
};
export type DialogSave = DialogState;

// Create a pinia store named dialog with a state using the type DialogState, with actions addDialog and clearDialog
export const useDialogStore = defineStore('dialog', {
  state: () =>
    ({
      dialog: [],
    } as DialogState),
  actions: {
    generateSaveData(): DialogSave {
      return {
        dialog: this.dialog,
      };
    },
    loadSaveData(data: DialogSave) {
      this.dialog = data.dialog;
    },
    addDialog(dialog: AddDialogParams) {
      this.dialog.push({
        ...dialog,
        interactive: dialog.interactive ?? false,
        id: randomId(),
        text: processText(dialog.text),
      });
    },
    clearDialog() {
      this.dialog.splice(0, this.dialog.length);
    },
    reset() {
      this.dialog = [];
    },
  },
  getters: {
    currentDialog(): DialogKey {
      return this.dialog[this.dialog.length - 1];
    },
  },
});
