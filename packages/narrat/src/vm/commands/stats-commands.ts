import { useHud } from '@/stores/hud-stats-store';
import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

export const addStatPlugin = new CommandPlugin<{
  statKey: string;
  amountToAdd: number;
}>(
  'add_stat',
  [
    { name: 'statKey', type: 'string' },
    { name: 'amountToAdd', type: 'number' },
  ],
  async (cmd) => {
    const { statKey, amountToAdd } = cmd.options;
    if (!statKey || typeof amountToAdd !== 'number') {
      commandRuntimeError(
        cmd,
        `add_stat command needs a stat id and a value as parameters`,
      );
    }
    const hud = useHud();
    hud.addStat(statKey, amountToAdd);
  },
);

export const setStatPlugin = new CommandPlugin<{
  statKey: string;
  value: number;
}>(
  'set_stat',
  [
    { name: 'statKey', type: 'string' },
    { name: 'value', type: 'number' },
  ],
  async (cmd) => {
    const { statKey, value } = cmd.options;
    if (!statKey || typeof value !== 'number') {
      commandRuntimeError(
        cmd,
        `set_stat command needs a stat id and a value as parameters`,
      );
    }
    const hud = useHud();
    hud.setStat(statKey, value);
  },
);

export const getStatPlugin = new CommandPlugin<{
  statKey: string;
}>('get_stat_value', [{ name: 'statKey', type: 'string' }], async (cmd) => {
  const { statKey } = cmd.options;
  if (!statKey) {
    commandRuntimeError(
      cmd,
      `get_stat_value command needs a stat id as parameter`,
    );
  }
  const hud = useHud();
  return hud.getStatValue(statKey);
});

export const showHud = new CommandPlugin<{}>('show_hud', [], async (cmd) => {
  const hud = useHud();
  hud.setVisibility(true);
});

export const hideHud = new CommandPlugin<{}>('hide_hud', [], async (cmd) => {
  const hud = useHud();
  hud.setVisibility(false);
});
