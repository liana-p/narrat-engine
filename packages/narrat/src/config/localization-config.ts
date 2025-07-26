import { Type, Static } from '@sinclair/typebox';

export const LanguageConfigSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  languageCode: Type.String(),
});
export type LanguageConfig = Static<typeof LanguageConfigSchema>;

export const LocalizationConfigSchema = Type.Object({
  languages: Type.Record(Type.String(), LanguageConfigSchema),
  defaultLanguage: Type.String(),
});
export type LocalizationConfig = Static<typeof LocalizationConfigSchema>;
export const defaultLocalizationConfig: LocalizationConfig = {
  defaultLanguage: 'en',
  languages: {
    en: {
      id: 'en',
      name: 'English',
      languageCode: 'en',
    },
  },
};
