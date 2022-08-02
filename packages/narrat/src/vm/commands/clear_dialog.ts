import { useDialogStore } from '@/stores/dialog-store';
import { CommandPlugin } from './command-plugin';

export const clearDialogPlugin = new CommandPlugin<{}>(
  'clear_dialog',
  [],
  async (cmd) => {
    useDialogStore().clearDialog();
  },
);
