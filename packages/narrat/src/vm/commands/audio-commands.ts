import { AudioModeKey, audioModesArray, useAudio } from '@/stores/audio-store';
import { Parser } from '@/types/parser';
import { commandRuntimeError } from './command-helpers';
import { ArgumentDescription, CommandPlugin } from './command-plugin';

export interface PlayCommandArgs {
  mode: string;
  audio: string;
  channel?: number;
}
const playCommandArgs: ArgumentDescription[] = [
  { name: 'mode', type: 'string' },
  { name: 'audio', type: 'string' },
  { name: 'channel', type: 'number', optional: true },
];

export const playCommand = new CommandPlugin<PlayCommandArgs>(
  'play',
  playCommandArgs,
  async (cmd) => {
    const audioStore = useAudio();
    const { mode: modeInput, audio, channel } = cmd.options;
    const mode = validateAudioMode(cmd, modeInput);
    if (mode) {
      audioStore.playChannel(mode, audio, channel ?? 0);
    }
  },
);

export const pauseCommand = new CommandPlugin<{
  mode: string;
  channel?: number;
}>(
  'pause',
  [
    { name: 'mode', type: 'string' },
    { name: 'channel', type: 'number', optional: true },
  ],
  async (cmd) => {
    const audioStore = useAudio();
    const { mode: modeInput, channel } = cmd.options;
    const mode = validateAudioMode(cmd, modeInput);
    if (mode) {
      audioStore.pauseChannel(mode, channel ?? 0);
    }
  },
);

export const stopCommand = new CommandPlugin<{
  mode: string;
  channel?: number;
}>(
  'stop',
  [
    { name: 'mode', type: 'string' },
    { name: 'channel', type: 'number', optional: true },
  ],
  async (cmd) => {
    const audioStore = useAudio();
    const { mode: modeInput, channel } = cmd.options;
    const mode = validateAudioMode(cmd, modeInput);
    if (mode) {
      audioStore.stopChannel(mode, channel ?? 0);
    }
  },
);

function validateAudioMode(
  cmd: Parser.Command<any, any>,
  key: string,
): false | AudioModeKey {
  if (!isAudioModeKey(key)) {
    commandRuntimeError(cmd, `${key} is not a valid audio mode.`);
    return false;
  }
  return key;
}
function isAudioModeKey(key: string): key is AudioModeKey {
  if (audioModesArray.includes(key as any)) {
    return true;
  } else {
    return false;
  }
}
