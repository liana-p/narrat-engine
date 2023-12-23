import { Type, Static } from '@sinclair/typebox';

export const SoundPerLetterConfigSchema = Type.Object({
  prefix: Type.Optional(Type.String()),
  suffix: Type.Optional(Type.String()),
  volume: Type.Optional(Type.Number()),
});

export const DialogAudioOptionsSchema = Type.Object({
  soundOnNewLine: Type.Optional(Type.String()),
  soundPerLetter: Type.Optional(SoundPerLetterConfigSchema),
});
export type DialogAudioOptions = Static<typeof DialogAudioOptionsSchema>;

export const DialogAudioConfigSchema = Type.Object({
  defaultAudio: Type.Optional(DialogAudioOptionsSchema),
  characterAudio: Type.Optional(
    Type.Record(Type.String(), DialogAudioOptionsSchema),
  ),
});
export type DialogAudioConfig = Static<typeof DialogAudioConfigSchema>;

export const AudioFileConfigSchema = Type.Object({
  src: Type.String(),
  path: Type.Optional(Type.String()),
  volume: Type.Optional(Type.Number()),
  rate: Type.Optional(Type.Number()),
  html5: Type.Optional(Type.Boolean()),
  fadeInTime: Type.Optional(Type.Number()),
  fadeInDelay: Type.Optional(Type.Number()),
  fadeOutTime: Type.Optional(Type.Number()),
  loop: Type.Optional(Type.Boolean()),
});
export type AudioFileConfig = Static<typeof AudioFileConfigSchema>;

export const AudioRecordConfigSchema = Type.Record(
  Type.String(),
  AudioFileConfigSchema,
);
export type AudioRecordConfig = Static<typeof AudioRecordConfigSchema>;

export const AudioOptionsSchema = Type.Object({
  volume: Type.Optional(Type.Number()),
  defaultMusic: Type.Optional(Type.String()),
  musicFadeInTime: Type.Optional(Type.Number()),
  musicFadeOutTime: Type.Optional(Type.Number()),
  musicFadeInDelay: Type.Optional(Type.Number()),
});
export type AudioOptions = Static<typeof AudioOptionsSchema>;

const AudioTriggersSchema = Type.Record(Type.String(), Type.String());
export type AudioTriggers = Static<typeof AudioTriggersSchema>;

export const AudioInputConfigSchema = Type.Object({
  files: AudioRecordConfigSchema,
  audioTriggers: AudioTriggersSchema,
  options: AudioOptionsSchema,
  dialogAudio: Type.Optional(DialogAudioConfigSchema),
});

export type AudioInputConfig = Static<typeof AudioInputConfigSchema>;

export interface AudioConfig {
  files: AudioRecordConfig;
  audioTriggers: AudioTriggers;
  options: {
    volume: number;
    defaultMusic?: string;
    musicFadeInTime: number;
    musicFadeOutTime: number;
    musicFadeInDelay: number;
  };
  dialogAudio?: DialogAudioConfig;
}

export const defaultAudioConfig: AudioConfig = {
  files: {},
  audioTriggers: {},
  options: {
    volume: 1,
    musicFadeInTime: 0.5,
    musicFadeInDelay: 0.5,
    musicFadeOutTime: 0.5,
  },
};
