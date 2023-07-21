import { Static, Type } from '@sinclair/typebox';

export const DialogStyleConfigSchema = Type.Object({
  color: Type.Optional(Type.String()),
  boxCss: Type.Optional(Type.Record(Type.String(), Type.Any())),
  nameCss: Type.Optional(Type.Record(Type.String(), Type.Any())),
  textCss: Type.Optional(Type.Record(Type.String(), Type.Any())),
});
export type DialogStyleConfig = Static<typeof DialogStyleConfigSchema>;

export const VideoCharacterPoseSchema = Type.Object({
  video: Type.String(),
  autoplay: Type.Optional(Type.Boolean()),
  loop: Type.Optional(Type.Boolean()),
  muted: Type.Optional(Type.Boolean()),
  width: Type.Optional(Type.Number()),
  height: Type.Optional(Type.Number()),
});
export type VideoCharacterPose = Static<typeof VideoCharacterPoseSchema>;
export const ImageCharacterPoseSchema = Type.Object({
  image: Type.String(),
  width: Type.Optional(Type.Number()),
  height: Type.Optional(Type.Number()),
});
export type ImageCharacterPose = Static<typeof ImageCharacterPoseSchema>;
export const CharacterPoseSchema = Type.Union([
  Type.String(),
  VideoCharacterPoseSchema,
  ImageCharacterPoseSchema,
]);
export type CharacterPose = Static<typeof CharacterPoseSchema>;

export const CharacterConfigSchema = Type.Object({
  sprites: Type.Optional(Type.Record(Type.String(), CharacterPoseSchema)),
  name: Type.String(),
  style: Type.Optional(DialogStyleConfigSchema),
});
export type CharacterConfig = Static<typeof CharacterConfigSchema>;

export const CharactersFilesConfigSchema = Type.Object({
  config: Type.Object({
    imagesPath: Type.String(),
    playerCharacter: Type.Optional(Type.String()),
    gameCharacter: Type.Optional(Type.String()),
  }),
  characters: Type.Record(Type.String(), CharacterConfigSchema),
});
export type CharactersFilesConfig = Static<typeof CharactersFilesConfigSchema>;
export const defaultCharactersConfig: CharactersFilesConfig = {
  config: {
    imagesPath: '',
    playerCharacter: 'player',
    gameCharacter: 'game',
  },
  characters: {},
};
