import { Type, Static } from '@sinclair/typebox';

export const LanguageConfigSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  languageCode: Type.String(),
});
export type LanguageConfig = Static<typeof LanguageConfigSchema>;

export const LocalizationConfigSchema = Type.Object({
  languages: Type.Record(Type.String(), LanguageConfigSchema),
});
export type LocalizationConfig = Static<typeof LocalizationConfigSchema>;
export const defaultLocalizationConfig: LocalizationConfig = {
  languages: {
    english: {
      id: 'english',
      name: 'English',
      languageCode: 'en',
    },
  },
};
