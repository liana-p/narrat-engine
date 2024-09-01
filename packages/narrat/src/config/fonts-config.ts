import { Type, Static } from '@sinclair/typebox';

export const FontFileConfigSchema = Type.Object({
  file: Type.String(),
  options: Type.Record(Type.String(), Type.Any()),
});
export type FontFileConfig = Static<typeof FontFileConfigSchema>;
export const FontConfigSchema = Type.Object({
  name: Type.String(),
  files: Type.Array(Type.Union([Type.String(), FontFileConfigSchema])),
  fontFamily: Type.String(),
});
export type FontConfig = Static<typeof FontConfigSchema>;

export const FontSetConfigSchema = Type.Record(Type.String(), FontConfigSchema);

export type FontSetConfig = Static<typeof FontSetConfigSchema>;

export const FontsConfigSchema = Type.Object({
  fontSets: Type.Optional(Type.Record(Type.String(), FontSetConfigSchema)),
  allowChoosingFont: Type.Optional(Type.Boolean()),
});

export type FontsConfig = Static<typeof FontsConfigSchema>;

export const defaultFontsConfig: FontsConfig = {
  fontSets: {},
  allowChoosingFont: false,
};
