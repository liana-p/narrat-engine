import { Config } from '@/config/config-output';
import { CustomSetting, CustomSettingsChoice } from '@/config/settings-config';
import { DEFAULT_TEXT_SPEED } from '@/constants';
import { useConfig } from '@/stores/config-store';
import { error } from '@/utils/error-handling';
import { deepCopy } from '@/utils/data-helpers';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { CommonConfig } from '@/config/common-config';
import { getCommonConfig, getLocalizationConfig } from '@/config';
import { updateGlobalSave } from '@/application/saving';

export interface GameUserSettings {
  baseSettings: {
    [key: string]: any;
    textSpeed: number;
    animateText: boolean;
    fontSize: number;
    language: string;
  };
  customSettings: {
    [key: string]: any;
  };
  settingsSchema: {
    [key: string]: CustomSetting;
  };
  customSettingsSchema: {
    [key: string]: CustomSetting;
  };
  saveInitialised: boolean;
}

export type GameGlobalSettingsSave = Omit<
  GameUserSettings,
  'customSettingsSchema' | 'settingsSchema' | 'saveInitialised'
>;
export const useSettings = defineStore('settings', {
  state: () =>
    ({
      baseSettings: {
        textSpeed: 30,
        animateText: true,
        fontSize: 16,
        language: 'en',
      },
      settingsSchema: {
        textSpeed: {
          type: 'number',
          defaultValue: 30,
          minValue: 1,
          maxValue: 100,
          step: 5,
          name: 'narrat.system_menu.text_speed',
          description: 'The speed at which text plays.',
        },
        animateText: {
          type: 'boolean',
          defaultValue: true,
          name: 'narrat.system_menu.animate_text',
          description: 'Whether or not text should animate.',
        },
        fontSize: {
          type: 'choice',
          defaultValue: 16,
          choices: [
            { value: 12, label: 'narrat.system_menu.font_size_smallest' },
            { value: 14, label: 'narrat.system_menu.font_size_small' },
            { value: 16, label: 'narrat.system_menu.font_size_medium' },
            { value: 18, label: 'narrat.system_menu.font_size_large' },
            { value: 20, label: 'narrat.system_menu.font_size_largest' },
          ],
          name: 'narrat.system_menu.font_size',
          description: 'The base font size for the game.',
          presentation: 'cycle',
        },
        language: {
          type: 'choice',
          defaultValue: 'NONE',
          choices: [],
          name: 'narrat.settings.language',
          description: 'The language for the game interface.',
          presentation: 'dropdown',
        },
      },
      customSettings: {},
      customSettingsSchema: {},
      saveInitialised: false,
    }) as GameUserSettings,
  actions: {
    reset(config: CommonConfig) {
      this.$reset();
      this.updateConfig(config);
      this.updateLanguageChoices();
    },
    updateLanguageChoices() {
      const localizationConfig = getLocalizationConfig();
      const languageChoices = Object.entries(localizationConfig.languages).map(
        ([id, lang]) => ({
          value: id,
          label: lang.name,
        }),
      );
      (this.settingsSchema.language as CustomSettingsChoice).choices =
        languageChoices;
      this.baseSettings.language = localizationConfig.defaultLanguage;
    },
    getSetting(key: string) {
      if (typeof this.baseSettings[key] !== 'undefined') {
        return this.baseSettings[key];
      } else if (typeof this.customSettings[key] !== 'undefined') {
        return this.customSettings[key];
      }
      error(`Setting ${key} does not exist.`);
    },
    getSettingSchema(key: string) {
      if (typeof this.settingsSchema[key] !== 'undefined') {
        return this.settingsSchema[key];
      } else if (typeof this.customSettingsSchema[key] !== 'undefined') {
        return this.customSettingsSchema[key];
      }
      error(`Setting ${key} does not exist.`);
      return undefined;
    },
    getAllSettingSchemas() {
      return {
        ...this.settingsSchema,
        ...this.customSettingsSchema,
      } as Record<string, CustomSetting>;
    },
    setLanguage(value: string, save: boolean = true) {
      this.baseSettings.language = value;
      if (save && this.saveInitialised) {
        updateGlobalSave();
      }
      // Import the localization store dynamically to avoid circular dependency
      import('@/stores/localization-store').then(({ useLocalization }) => {
        const localization = useLocalization();
        localization.languageChanged(value);
      });
    },
    setSetting(key: string, value: any) {
      if (typeof this.baseSettings[key] !== 'undefined') {
        this.baseSettings[key] = value;
      } else if (typeof this.customSettings[key] !== 'undefined') {
        this.customSettings[key] = value;
      } else {
        error(`Setting ${key} does not exist.`);
      }
      if (key === 'fontSize') {
        document.documentElement.style.setProperty('font-size', `${value}px`);
      }
      if (key === 'textSpeed') {
        getCommonConfig().dialogPanel.textSpeed = value;
      }
      if (key === 'animateText') {
        getCommonConfig().dialogPanel.animateText = value;
      }
      if (key === 'language') {
        // Import the localization store dynamically to avoid circular dependency
        import('@/stores/localization-store').then(({ useLocalization }) => {
          const localization = useLocalization();
          localization.languageChanged(value);
        });
      }
      if (this.saveInitialised) {
        updateGlobalSave();
      }
    },
    getCurrentLanguageSetting() {
      return this.getSetting('language');
    },
    updateConfig(config: CommonConfig) {
      this.setSetting(
        'textSpeed',
        config.dialogPanel.textSpeed ?? DEFAULT_TEXT_SPEED,
      );
      this.setSetting('animateText', config.dialogPanel.animateText ?? true);
      this.setSetting('fontSize', config.layout.defaultFontSize ?? 16);

      // Set language from localization config
      const localizationConfig = getLocalizationConfig();
      this.setSetting('language', localizationConfig.defaultLanguage);

      if (config.settings?.customSettings) {
        for (const key in config.settings.customSettings) {
          this.addCustomSetting(key, config.settings.customSettings[key]);
        }
      }
    },
    addCustomSetting(key: string, schema: CustomSetting) {
      this.customSettings[key] = schema.defaultValue;
      this.customSettingsSchema[key] = schema;
    },
    generateGlobalSaveData(): GameGlobalSettingsSave {
      return {
        baseSettings: deepCopy(this.baseSettings),
        customSettings: deepCopy(this.customSettings),
      };
    },
    loadGlobalSaveData(data: GameGlobalSettingsSave) {
      for (const key in data.baseSettings) {
        this.setSetting(key, deepCopy(data.baseSettings[key]));
      }
      for (const key in data.customSettings) {
        if (typeof this.customSettings[key] !== 'undefined') {
          this.setSetting(key, deepCopy(data.customSettings[key]));
        }
      }
      this.saveInitialised = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot));
}
