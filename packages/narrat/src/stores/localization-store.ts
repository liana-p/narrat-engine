import { acceptHMRUpdate, defineStore } from 'pinia';
import i18next from 'i18next';
import { getLocalizationConfig } from '@/config';
import { error } from '@/utils/error-handling';
import { LocalizationConfig } from '@/config/localization-config';
import { useSettings } from '@/stores/settings-store';

export interface LocalizationState {
  pluralCount: number;
}

export interface LocalizationGlobalSaveData {}

export interface LocalizationLocalSaveData {
  pluralCount: number;
}
export const useLocalization = defineStore('localization', {
  state: (): LocalizationState => ({
    pluralCount: 1,
  }),
  actions: {
    reset(config: LocalizationConfig) {
      this.$reset();
      const settings = useSettings();

      if (settings.getCurrentLanguageSetting() === 'NONE') {
        this.setCurrentLanguage(config.defaultLanguage, false);
      }
    },
    generateGlobalSaveData(): LocalizationGlobalSaveData {
      return {};
    },
    loadGlobalSaveData(save: LocalizationGlobalSaveData) {
      // Nothing here for now
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
      i18next.changeLanguage(languageConfig.languageCode);

      // Update settings store to keep it in sync (avoid circular dependency with dynamic import)
      const settings = useSettings();
      settings.setLanguage(language, save);
    },
    languageChanged(language: string) {
      const languageConfig = getLocalizationConfig().languages[language];
      if (!languageConfig) {
        error(
          `Localization language "${language}" not found in config. Available languages: ${Object.keys(getLocalizationConfig().languages).join(', ')}`,
        );
        return;
      }
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
