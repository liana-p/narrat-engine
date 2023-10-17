import { ArgTypes, CommandPlugin } from './command-plugin';
import { loadDataFile } from '@/utils/ajax';
import { getDataUrl } from '@/config';
import { useConfig } from '@/stores/config-store';
import { useRenderingStore } from '@/stores/rendering-store';
import { animate } from '@/utils/animation';
import { Parser } from '@/types/parser';

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

export interface AnimationOptions {
  element: string;
  animation: string;
  duration?: number;
  iterations?: number;
}
export const animationArgs: ArgTypes = [
  { name: 'element', type: 'string' },
  { name: 'animation', type: 'string' },
  { name: 'duration', optional: true, type: 'number' },
  { name: 'iterations', optional: true, type: 'number' },
];

function setupAnimationOptions(cmd: Parser.Command<AnimationOptions>) {
  const { element, animation, duration, iterations } = cmd.options;
  const extraOptions: any = {};
  if (iterations) {
    extraOptions.iterations = iterations;
  }
  if (duration) {
    extraOptions.duration = duration;
  }
  return extraOptions;
}

export const animatePlugin = CommandPlugin.FromOptions<AnimationOptions>({
  keyword: 'animate',
  argTypes: animationArgs,
  runner: async (cmd) => {
    const { element, animation } = cmd.options;
    const extraOptions = setupAnimationOptions(cmd);
    animate(element, animation, extraOptions);
  },
});

export const animateWaitPlugin = CommandPlugin.FromOptions<AnimationOptions>({
  keyword: 'animate_wait',
  argTypes: animationArgs,
  runner: async (cmd) => {
    const { element, animation } = cmd.options;
    await animate(element, animation, setupAnimationOptions(cmd));
  },
});
