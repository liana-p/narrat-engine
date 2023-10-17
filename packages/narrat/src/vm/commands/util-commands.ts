import { CommandPlugin } from './command-plugin';
import { loadDataFile } from '@/utils/ajax';
import { getDataUrl } from '@/config';
import { useConfig } from '@/stores/config-store';
import { useRenderingStore } from '@/stores/rendering-store';
import { animate } from '@/utils/animation';

export const loadDataPlugin = CommandPlugin.FromOptions<{ url: string }>({
  keyword: 'load_data',
  argTypes: [{ name: 'url', type: 'string' }],
  runner: async (cmd) => {
    const { url } = cmd.options;
    const res = await loadDataFile(getDataUrl(url));
    return res;
  },
});

export const changePlayerCharacterPlugin = CommandPlugin.FromOptions<{
  character: string;
}>({
  keyword: 'change_player_character',
  argTypes: [{ name: 'character', type: 'string' }],
  runner: async (cmd) => {
    const { character } = cmd.options;
    useConfig().config.characters.config.playerCharacter = character;
  },
});

export const changeGameCharacterPlugin = CommandPlugin.FromOptions<{
  character: string;
}>({
  keyword: 'change_game_character',
  argTypes: [{ name: 'character', type: 'string' }],
  runner: async (cmd) => {
    const { character } = cmd.options;
    useConfig().config.characters.config.gameCharacter = character;
  },
});

export const jsonEncode = CommandPlugin.FromOptions<{
  value: any;
}>({
  keyword: 'json_stringify',
  argTypes: [{ name: 'value', type: 'any' }],
  runner: async (cmd) => {
    const { value } = cmd.options;
    return JSON.stringify(value);
  },
});

export const jsonDecode = CommandPlugin.FromOptions<{
  value: string;
}>({
  keyword: 'json_parse',
  argTypes: [{ name: 'value', type: 'string' }],
  runner: async (cmd) => {
    const { value } = cmd.options;
    return JSON.parse(value);
  },
});

export const setDialogPanelMode = CommandPlugin.FromOptions<{
  mode: 'auto' | 'on' | 'off';
}>({
  keyword: 'set_dialog_panel_mode',
  argTypes: [{ name: 'mode', type: 'string' }],
  runner: async (cmd) => {
    const { mode } = cmd.options;
    useRenderingStore().dialogPanelMode = mode;
  },
});

export const animatePlugin = CommandPlugin.FromOptions<{
  element: string;
  animation: string;
  duration?: number;
}>({
  keyword: 'animate',
  argTypes: [
    { name: 'element', type: 'string' },
    { name: 'animation', type: 'string' },
    { name: 'duration', optional: true, type: 'number' },
  ],
  runner: async (cmd) => {
    const { element, animation, duration } = cmd.options;
    animate(element, animation, { duration });
  },
});

export const animateWaitPlugin = CommandPlugin.FromOptions<{
  element: string;
  animation: string;
  duration?: number;
}>({
  keyword: 'animate_wait',
  argTypes: [
    { name: 'element', type: 'string' },
    { name: 'animation', type: 'string' },
    { name: 'duration', optional: true, type: 'number' },
  ],
  runner: async (cmd) => {
    const { element, animation, duration } = cmd.options;
    await animate(element, animation, { duration });
  },
});
