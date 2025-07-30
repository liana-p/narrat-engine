import { audioConfig, audioFileConfig, getAudioFadeTimings } from '@/config';
import { getAudio, stopHowlerById } from '@/utils/audio-loader';
import { deepCopy } from '@/utils/data-helpers';
import { error } from '@/utils/error-handling';
import { timeout } from '@/utils/promises';
import { generateObjectFromList } from '@/utils/type-utils';
import { Howler } from 'howler';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const audioModesArray = ['music', 'ambient', 'sound'] as const;
export const audioModes = generateObjectFromList(audioModesArray);
export type AudioModeKey = keyof typeof audioModes;
export type AudioModes = Map<AudioModeKey, AudioModeState>;
export type AudioMode = 'music' | 'ambiance' | 'sound';
export interface AudioChannel {
  audio: string;
  howlerId: number;
}

export type AudioModeState = {
  channels: Array<AudioChannel | null>;
};

export interface AudioState {
  modes: AudioModes;
}

export interface AudioSaveMode {
  channels: Array<{
    audio: string | null;
  }>;
}
export type AudioSave = {
  modes: {
    [key: string]: AudioSaveMode;
  };
};

export const useAudio = defineStore('audio', {
  state: () => {
    const modes = new Map<AudioModeKey, AudioModeState>();
    for (const key in audioModes) {
      modes.set(key as AudioModeKey, {
        channels: [],
      });
    }
    return {
      modes,
    } as AudioState;
  },
  actions: {
    stopAll() {
      this.modes.forEach((mode) => {
        mode.channels.forEach((channel, key) => {
          if (channel) {
            this.actuallyStopChannel(channel);
            mode.channels[key] = null;
          }
        });
      });
    },
    async stopChannel(mode: AudioModeKey, channelIndex: number) {
      const audioChannel = this.getAudioChannel(mode, channelIndex);
      if (!audioChannel) {
        return;
      }
      const { fadeOutTime } = getAudioFadeTimings(audioChannel.audio);
      this.setAudioChannel(mode, channelIndex, null);
      if (audioConfig().options.musicFadeOutTime) {
        const audio = getAudio(audioChannel.audio);
        if (audio) {
          audio.fade(
            audio.volume(audioChannel.howlerId) as number,
            0,
            fadeOutTime,
            audioChannel.howlerId,
          );
        }
        await timeout(fadeOutTime);
      }
      this.actuallyStopChannel(audioChannel);
    },
    async pauseChannel(mode: AudioModeKey, channelIndex: number) {
      const audioChannel = this.getAudioChannel(mode, channelIndex);
      if (!audioChannel) {
        return;
      }
      const audio = getAudio(audioChannel.audio);
      if (!audio) {
        error(`Could not find audio ${audioChannel.audio}`);
        return;
      }
      audio.pause(audioChannel.howlerId);
    },
    async playChannel(mode: AudioModeKey, audio: string, channelIndex: number) {
      if (Howler.ctx.state === 'suspended') {
        console.warn('Audio context is suspended :o');
        Howler.ctx.resume();
        // return;
      }
      const audioChannel = this.getAudioChannel(mode, channelIndex);
      if (mode === 'sound') {
        return this.actuallyPlayChannel(mode, channelIndex, audio);
      }
      if (audioChannel && audioChannel.audio !== audio) {
        await this.changeChannel(mode, audio, channelIndex);
      } else if (audioChannel && audioChannel.audio === audio) {
        await this.resumeChannel(mode, channelIndex);
      } else {
        await this.actuallyPlayChannel(mode, channelIndex, audio);
      }
    },
    async resumeChannel(mode: AudioModeKey, channelIndex: number) {
      const audioChannel = this.getAudioChannel(mode, channelIndex);
      if (!audioChannel) {
        return;
      }
      const audio = getAudio(audioChannel.audio);
      if (!audio) {
        error(`Could not find audio ${audioChannel.audio}`);
        return;
      }
      audio.play(audioChannel.howlerId);
    },
    async changeChannel(
      mode: AudioModeKey,
      audio: string,
      channelIndex: number,
    ) {
      const audioChannel = this.getAudioChannel(mode, channelIndex);
      if (audioChannel && mode !== 'sound') {
        await this.stopChannel(mode, channelIndex);
      }
      await this.actuallyPlayChannel(mode, channelIndex, audio);
    },
    actuallyStopChannel(channel: AudioChannel) {
      stopHowlerById(channel.audio, channel.howlerId);
    },
    getAudioChannel(
      mode: AudioModeKey,
      channelIndex: number,
    ): AudioChannel | null {
      return this.modes.get(mode)!.channels[channelIndex] || null;
    },
    setAudioChannel(
      mode: AudioModeKey,
      channelIndex: number,
      value: AudioChannel | null,
    ) {
      this.modes.get(mode)!.channels[channelIndex] = value;
    },
    async actuallyPlayChannel(
      mode: AudioModeKey,
      channelIndex: number,
      audio: string,
    ) {
      const newAudio = getAudio(audio);
      if (!newAudio) {
        error(`Could not find audio ${audio}`);
        return;
      }
      const { fadeInTime, fadeInDelay } = getAudioFadeTimings(audio);
      const volume = this.audioVolume(mode, audio);
      if (mode !== 'sound') {
        const newId = newAudio.play();
        newAudio.volume(0, newId);
        newAudio.pause(newId);
        this.setAudioChannel(mode, channelIndex, {
          audio,
          howlerId: newId,
        });
        await timeout(fadeInDelay);
        // We're checking the the audio hasn't been changed again in the background before playing the audio
        const currentValue = this.getAudioChannel(mode, channelIndex);
        if (currentValue !== null && currentValue.audio === audio) {
          newAudio.play(newId);
          // newAudio.volume(0.5, newId);
          newAudio.fade(0, volume, fadeInTime, newId);
        }
      } else if (mode === 'sound') {
        const newId = newAudio.play();
        newAudio.volume(volume, newId);
        this.setAudioChannel(mode, channelIndex, {
          audio,
          howlerId: newId,
        });
      }
    },
    reloadAudio(save: AudioSave) {
      for (const key in save.modes) {
        if (key === 'sound') {
          continue;
        }
        const channel = key as AudioModeKey;
        for (const index in save.modes[channel].channels) {
          const sound = save.modes[channel].channels[index];
          if (sound && sound.audio) {
            this.actuallyPlayChannel(channel, Number(index), sound.audio);
          }
        }
      }
    },
    stopSound(key: string) {
      const sound = getAudio(key);
      if (sound) {
        sound.stop();
      }
    },
    generateSaveData(): AudioSave {
      const modes: AudioSave['modes'] = {} as any;
      for (const key in audioModes) {
        const mode = this.modes.get(key as AudioModeKey);
        modes[key] = {
          channels: deepCopy(mode!.channels).map((channel) => {
            if (!channel) {
              return { audio: null };
            }
            return { audio: channel.audio };
          }),
        };
      }
      return {
        modes,
      };
    },
    loadSaveData(data: AudioSave) {
      // Audio save data no longer contains volume information
      // Volume is now handled by the settings store
    },
    reset() {
      this.stopAll();
    },
    setModeVolume(mode: AudioModeKey, volume: number) {
      // Volume is now stored in settings, update all channels
      const modeState = this.modes.get(mode)!;
      for (const channel in modeState.channels) {
        const channelState = modeState.channels[channel];
        if (channelState) {
          const audio = getAudio(channelState.audio);
          if (audio) {
            audio.volume(this.modeVolume(mode), channelState.howlerId);
          }
        }
      }
    },
    setMasterVolume(volume: number) {
      // Volume is now stored in settings
      Howler.volume(volume);
    },
    getMasterVolume(): number {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { useSettings } = require('@/stores/settings-store');
        const settingsStore = useSettings();
        return settingsStore.getSetting('masterVolume') ?? 1;
      } catch (e) {
        return 1;
      }
    },
    getModeVolume(mode: AudioModeKey): number {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { useSettings } = require('@/stores/settings-store');
        const settingsStore = useSettings();
        return settingsStore.getSetting(`${mode}Volume`) ?? 1;
      } catch (e) {
        return 1;
      }
    },
    modeVolume(mode: AudioModeKey): number {
      return this.getMasterVolume() * this.getModeVolume(mode);
    },
    audioVolume(mode: AudioModeKey, audio: string): number {
      return this.modeVolume(mode) * (audioFileConfig(audio)?.volume ?? 1);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAudio, import.meta.hot));
}
