import { getConfig } from '@/config';
import { getAudio, stopHowlerById } from '@/utils/audio-loader';
import { deepCopy } from '@/utils/data-helpers';
import { error, warning } from '@/utils/error-handling';
import { timeout } from '@/utils/promises';
import { generateObjectFromList } from '@/utils/type-utils';
import { Howler } from 'howler';
import { defineStore } from 'pinia';

export const audioModesArray = ['music', 'ambiant', 'sound'] as const;
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
  options: {
    volume: number;
  };
};

export interface AudioState {
  modes: AudioModes;
  masterVolume: number;
}

export type AudioSave = {
  modes: {
    [key: string]: {
      channels: Array<{
        audio: string | null;
      }>;
      options: {
        volume: number;
      };
    };
  };
  masterVolume: number;
};

// Generate a pinia store named audio with a state using the type AudioState, and save type AudioSave, with actions:
// stopMusic(): Stops the current music
// setMusic(music: string, soundId: number): Sets the current music to the given music
// generateSaveData(): Function that generates an AudioSave object from the data in the state
// loadSaveData(data: AudioSave): Function that loads the data into the state
export const useAudio = defineStore('audio', {
  state: () => {
    const modes = new Map<AudioModeKey, AudioModeState>();
    for (const key in audioModes) {
      modes.set(key as AudioModeKey, {
        channels: [],
        options: {
          volume: 1,
        },
      });
    }
    return {
      modes,
      masterVolume: 1,
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
      this.setAudioChannel(mode, channelIndex, null);
      if (getConfig().audioOptions.musicFadeOutTime) {
        const audio = getAudio(audioChannel.audio);
        if (audio) {
          audio.fade(
            audio.volume(audioChannel.howlerId) as number,
            0,
            getConfig().audioOptions.musicFadeOutTime * 1000,
            audioChannel.howlerId,
          );
        }
        await timeout(getConfig().audioOptions.musicFadeOutTime * 1000);
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
        console.warn('Audio context not started yet, skipping audio');
        return;
      }
      const audioChannel = this.getAudioChannel(mode, channelIndex);
      if (mode === 'sound') {
        return this.actuallyPlayChannel(mode, channelIndex, audio);
      }
      if (audioChannel && audioChannel.audio !== audio) {
        await this.changeChannel(mode, audio, channelIndex);
      } else if (audioChannel && audioChannel.audio === audio) {
        // Ignore, it's the same music
      } else {
        await this.actuallyPlayChannel(mode, channelIndex, audio);
      }
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
      if (mode !== 'sound') {
        const newId = newAudio.play();
        newAudio.volume(0, newId);
        newAudio.pause(newId);
        this.setAudioChannel(mode, channelIndex, {
          audio,
          howlerId: newId,
        });
        await timeout(getConfig().audioOptions.musicFadeInDelay * 1000);
        // We're checking the the audio hasn't been changed again in the background before playing the audio
        const currentValue = this.getAudioChannel(mode, channelIndex);
        if (currentValue !== null && currentValue.audio === audio) {
          newAudio.play(newId);
          // newAudio.volume(0.5, newId);
          newAudio.fade(
            0,
            this.modeVolume(mode),
            getConfig().audioOptions.musicFadeInTime * 1000,
            newId,
          );
        }
      } else if (mode === 'sound') {
        const newId = newAudio.play();
        newAudio.volume(this.modeVolume(mode), newId);
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
        this.modes.get(channel)!.options = deepCopy(
          save.modes[channel].options,
        );
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
          options: deepCopy(mode!.options),
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
        masterVolume: this.masterVolume,
      };
    },
    loadSaveData(data: AudioSave) {
      this.masterVolume = data.masterVolume;
    },
    reset() {
      this.stopAll();
    },
    setModeVolume(mode: AudioModeKey, volume: number) {
      const modeState = this.modes.get(mode)!;
      modeState.options.volume = volume;
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
      this.masterVolume = volume;
      Howler.volume(volume);
    },
    modeVolume(mode: AudioModeKey): number {
      return this.masterVolume * this.modes.get(mode)!.options.volume;
    },
  },
});
