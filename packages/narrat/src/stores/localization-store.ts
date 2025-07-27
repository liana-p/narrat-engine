import { acceptHMRUpdate, defineStore } from 'pinia';
import i18next from 'i18next';
import { getLocalizationConfig } from '@/config';
import { error } from '@/utils/error-handling';
import { LocalizationConfig } from '@/config/localization-config';
import { updateGlobalSave } from '@/application/saving';

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
    currentLanguage: 'NONE',
    pluralCount: 1,
  }),
  actions: {
    reset(config: LocalizationConfig) {
      this.$reset();
      if (this.currentLanguage === 'NONE') {
        this.setCurrentLanguage(config.defaultLanguage, false);
      }
    },
    generateGlobalSaveData(): LocalizationGlobalSaveData {
      return {
        currentLanguage: this.currentLanguage,
      };
    },
    loadGlobalSaveData(save: LocalizationGlobalSaveData) {
      this.setCurrentLanguage(save.currentLanguage);
    },
    generateSaveData(): LocalizationLocalSaveData {
      return {
        pluralCount: this.pluralCount,
      };
    },
    loadSaveData(save: LocalizationLocalSaveData) {
      this.pluralCount = save.pluralCount;
    },
    setCurrentLanguage(language: string, save: boolean = true) {
      const languageConfig = getLocalizationConfig().languages[language];
      if (!languageConfig) {
        error(
          `Localization language "${language}" not found in config. Available languages: ${Object.keys(getLocalizationConfig().languages).join(', ')}`,
        );
        return;
      }
      this.currentLanguage = language;
      i18next.changeLanguage(languageConfig.languageCode);
      if (save) {
        updateGlobalSave();
      }
    },
    setPluralCount(count: number) {
      this.pluralCount = count;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocalization, import.meta.hot));
}
