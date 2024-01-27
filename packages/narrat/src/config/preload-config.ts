import { Static, Type } from '@sinclair/typebox';

export const AssetTypeSchema = Type.Object({
  assets: Type.Record(Type.String(), Type.String()),
});

export const PreloadConfigSchema = Type.Object({
  images: Type.Optional(AssetTypeSchema),
  audio: Type.Optional(AssetTypeSchema),
  video: Type.Optional(AssetTypeSchema),
});
export type PreloadConfig = Static<typeof PreloadConfigSchema>;

export const defaultPreloadConfig: PreloadConfig = {
  images: {
    assets: {},
  },
  audio: {
    assets: {},
  },
  video: {
    assets: {},
  },
};
