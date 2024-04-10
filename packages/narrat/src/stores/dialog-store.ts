import { deepCopy } from '@/utils/data-helpers';
import { randomId } from '@/utils/randomId';
import { processText } from '@/utils/string-helpers';
import { acceptHMRUpdate, defineStore } from 'pinia';

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
  flag?: string;
  seenBefore?: boolean;
  choice: string;
  originalIndex: number;
  allowed: boolean;
}

type DialogState = {
  dialog: DialogKey[];
  playMode: 'auto' | 'skip' | 'normal';
};
export type DialogSave = Pick<DialogState, 'dialog'>;

export const useDialogStore = defineStore('dialog', {
  state: () =>
    ({
      dialog: [],
      playMode: 'normal',
    }) as DialogState,
  actions: {
    generateSaveData(): DialogSave {
      return {
        dialog: deepCopy(this.dialog),
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
      if (this.dialog.length > 200) {
        this.dialog.shift();
      }
    },
    toggleAutoPlay() {
      this.playMode = this.playMode === 'auto' ? 'normal' : 'auto';
    },
    toggleSkip() {
      this.playMode = this.playMode === 'skip' ? 'normal' : 'skip';
    },
    clearDialog() {
      this.dialog.splice(0, this.dialog.length);
    },
    makeLastDialogInteractive() {
      this.dialog[this.dialog.length - 1].interactive = true;
    },
    reset() {
      this.dialog = [];
      this.playMode = 'normal';
    },
  },
  getters: {
    currentDialog(): DialogKey {
      return this.dialog[this.dialog.length - 1];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogStore, import.meta.hot));
}
