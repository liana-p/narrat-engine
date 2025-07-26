import { acceptHMRUpdate, defineStore } from 'pinia';
import i18next from 'i18next';
import { getLocalizationConfig } from '@/config';
import { error } from '@/utils/error-handling';

export interface LocalizationState {
  currentLanguage: string;
  pluralCount: number;
}

export interface LocalizationGlobalSaveData {
  currentLanguage: string;
}

export interface LocalizationLocalSaveData {
  pluralCount: number;
}
export const useLocalization = defineStore('localization', {
  state: (): LocalizationState => ({
    currentLanguage: 'english',
    pluralCount: 1,
  }),
  actions: {
    generateGlobalSaveData(): LocalizationGlobalSaveData {
      return {
        currentLanguage: this.currentLanguage,
      };
    },
    loadGlobalSaveData(save: LocalizationGlobalSaveData) {
      this.currentLanguage = save.currentLanguage;
    },
    generateSaveData(): LocalizationLocalSaveData {
      return {
        pluralCount: this.pluralCount,
      };
    },
    loadSaveData(save: LocalizationLocalSaveData) {
      this.pluralCount = save.pluralCount;
    },
    setCurrentLanguage(language: string) {
      const languageConfig = getLocalizationConfig().languages[language];
      if (!languageConfig) {
        error(
          `Localization language "${language}" not found in config. Available languages: ${Object.keys(getLocalizationConfig().languages).join(', ')}`,
        );
        return;
      }
      this.currentLanguage = language;
      i18next.changeLanguage(languageConfig.languageCode);
    },
    setPluralCount(count: number) {
      this.pluralCount = count;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocalization, import.meta.hot));
}
