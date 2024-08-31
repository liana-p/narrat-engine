import { getCommonConfig } from '@/config';
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
  clearedAt: number;
  clearedDialogVisible: boolean;
};
export type DialogSave = Pick<DialogState, 'dialog' | 'clearedAt'>;

export const useDialogStore = defineStore('dialog', {
  state: () =>
    ({
      dialog: [],
      playMode: 'normal',
      clearedAt: 0,
      clearedDialogVisible: false,
    }) as DialogState,
  actions: {
    generateSaveData(): DialogSave {
      return {
        dialog: deepCopy(this.dialog),
        clearedAt: this.clearedAt,
      };
    },
    loadSaveData(data: DialogSave) {
      this.dialog = deepCopy(data.dialog);
      this.clearedAt = data.clearedAt;
    },
    addDialog(dialog: AddDialogParams) {
      this.dialog.push({
        ...dialog,
        interactive: dialog.interactive ?? false,
        id: randomId(),
        text: processText(dialog.text),
      });
      const historyLength = getCommonConfig().dialogPanel.historyLength ?? 200;
      if (this.dialog.length > historyLength) {
        this.dialog.shift();
        this.clearedAt--;
      }
    },
    toggleAutoPlay() {
      this.playMode = this.playMode === 'auto' ? 'normal' : 'auto';
    },
    toggleSkip() {
      this.playMode = this.playMode === 'skip' ? 'normal' : 'skip';
    },
    toggleHistory() {
      this.clearedDialogVisible = !this.clearedDialogVisible;
    },
    clearDialog() {
      this.clearedAt = this.dialog.length;
    },
    makeLastDialogInteractive() {
      this.dialog[this.dialog.length - 1].interactive = true;
    },
    isDialogCleared(index: number) {
      return index < this.clearedAt;
    },
    reset() {
      this.dialog = [];
      this.playMode = 'normal';
      this.clearedAt = 0;
      this.clearedDialogVisible = false;
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
