import { handleHMR } from '@/hmr/hmr';
import { vm } from '@/vm/vm';
import { App } from 'vue';
import { useVM } from '@/stores/vm-store';
import * as exports from '@/exports/exports';
import { getSaveFile } from '@/utils/save-helpers';

export function constructNarratObject(app: App) {
  const narrat = {
    app,
    vm,
    handleHMR,
    jump: (label: string) => {
      return useVM().jumpToLabel(label);
    },
    run: (label: string, ...args: string[]) => {
      return useVM().runThenGoBackToPreviousDialog(label, ...args);
    },
    getSave: () => {
      return getSaveFile();
    },
    exports,
  };
  (window as any).narrat = narrat;
  return narrat;
}

export type Narrat = ReturnType<typeof constructNarratObject>;
declare global {
  export interface Window {
    narrat: Narrat;
  }
}
