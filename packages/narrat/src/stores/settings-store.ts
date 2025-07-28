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
    masterVolume: number;
    musicVolume: number;
    ambientVolume: number;
    soundVolume: number;
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
        masterVolume: 1,
        musicVolume: 1,
        ambientVolume: 1,
        soundVolume: 1,
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
        masterVolume: {
          type: 'number',
          defaultValue: 1,
          minValue: 0,
          maxValue: 1,
          step: 0.1,
          name: 'narrat.system_menu.master_volume',
          description: 'The master volume for all audio.',
          presentation: 'slider',
        },
        musicVolume: {
          type: 'number',
          defaultValue: 1,
          minValue: 0,
          maxValue: 1,
          step: 0.1,
          name: 'narrat.system_menu.music',
          description: 'The volume for music.',
          presentation: 'slider',
        },
        ambientVolume: {
          type: 'number',
          defaultValue: 1,
          minValue: 0,
          maxValue: 1,
          step: 0.1,
          name: 'narrat.system_menu.ambient',
          description: 'The volume for ambient sounds.',
          presentation: 'slider',
        },
        soundVolume: {
          type: 'number',
          defaultValue: 1,
          minValue: 0,
          maxValue: 1,
          step: 0.1,
          name: 'narrat.system_menu.sound_effects',
          description: 'The volume for sound effects.',
          presentation: 'slider',
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
      // Get the schema to determine the expected type
      const schema = this.getSettingSchema(key);
      if (!schema) {
        error(`Setting ${key} does not exist.`);
        return;
      }
      
      // Convert value to the correct type based on schema
      let convertedValue = value;
      if (schema.type === 'number' || schema.type === 'integer') {
        convertedValue = typeof value === 'string' ? parseFloat(value) : value;
        if (schema.type === 'integer') {
          convertedValue = Math.round(convertedValue);
        }
      } else if (schema.type === 'boolean') {
        convertedValue = Boolean(value);
      } else if (schema.type === 'string') {
        convertedValue = String(value);
      } else if (schema.type === 'choice') {
        // For choice types, preserve the original value type (could be string or number)
        // The value should match one of the choice values exactly
        convertedValue = value;
      }
      
      if (typeof this.baseSettings[key] !== 'undefined') {
        this.baseSettings[key] = convertedValue;
      } else if (typeof this.customSettings[key] !== 'undefined') {
        this.customSettings[key] = convertedValue;
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
      if (key === 'masterVolume') {
        // Update master volume through audio store
        import('@/stores/audio-store').then(({ useAudio }) => {
          const audio = useAudio();
          audio.setMasterVolume(value);
        });
      }
      if (key === 'musicVolume' || key === 'ambientVolume' || key === 'soundVolume') {
        // Trigger volume update for all audio channels
        import('@/stores/audio-store').then(({ useAudio }) => {
          const audio = useAudio();
          const mode = key.replace('Volume', '') as any;
          audio.setModeVolume(mode, value);
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

      // Initialize volume settings to defaults
      this.setSetting('masterVolume', 1);
      this.setSetting('musicVolume', 1);
      this.setSetting('ambientVolume', 1);
      this.setSetting('soundVolume', 1);

      if (config.settings?.customSettings) {
        for (const key in config.settings.customSettings) {
          this.addCustomSetting(key, config.settings.customSettings[key]);
        }
      }
      
      // Initialize audio volumes
      this.updateAudioVolumes();
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
      
      // Ensure audio volumes are applied after loading settings
      this.updateAudioVolumes();
    },
    updateAudioVolumes() {
      // Update all audio volumes through audio store methods
      import('@/stores/audio-store').then(({ useAudio }) => {
        const audio = useAudio();
        
        // Update master volume
        audio.setMasterVolume(this.getSetting('masterVolume') ?? 1);
        
        // Update mode volumes
        const modes = ['music', 'ambient', 'sound'] as const;
        modes.forEach(mode => {
          const volume = this.getSetting(`${mode}Volume`) ?? 1;
          audio.setModeVolume(mode, volume);
        });
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot));
}
