import {
  addDataHelper,
  getModifiableDataPinia,
  setDataHelper,
} from '@/utils/data-helpers';
import { CommandPlugin } from './command-plugin';

export const setCommand = new CommandPlugin<any>(
  'set',
  [
    { name: 'key', type: 'string' },
    { name: 'value', type: 'any' },
  ],
  async (cmd) => {
    const state = getModifiableDataPinia();
    setDataHelper(state, cmd.options.key, cmd.options.value);
  },
);

export const addPlugin = new CommandPlugin<{ key: any; value: number }>(
  'add',
  [
    { name: 'key', type: 'string' },
    { name: 'value', type: 'any' },
  ],
  async (cmd) => {
    const state = getModifiableDataPinia();
    addDataHelper(state, cmd.options.key, cmd.options.value);
  },
);
