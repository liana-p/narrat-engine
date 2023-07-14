import { Config } from '@/config/config-output';
import { CustomSetting } from '@/config/settings-config';
import { DEFAULT_TEXT_SPEED } from '@/constants';
import { useConfig } from '@/stores/config-store';
import { error } from '@/utils/error-handling';
import { deepCopy } from '@/utils/data-helpers';
import { acceptHMRUpdate, defineStore } from 'pinia';

export interface GameUserSettings {
  baseSettings: {
    [key: string]: any;
    textSpeed: number;
    animateText: boolean;
    fontSize: number;
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
}

export type GameUserSettingsSave = Omit<
  GameUserSettings,
  'customSettingsSchema' | 'settingsSchema'
>;
export const useSettings = defineStore('settings', {
  state: () =>
    ({
      baseSettings: {
        textSpeed: 30,
        animateText: true,
        fontSize: 16,
      },
      settingsSchema: {
        textSpeed: {
          type: 'number',
          defaultValue: 30,
          minValue: 1,
          maxValue: 100,
          step: 5,
          name: 'Text Speed',
          description: 'The speed at which text plays.',
        },
        animateText: {
          type: 'boolean',
          defaultValue: true,
          name: 'Animate Text',
          description: 'Whether or not text should animate.',
        },
        fontSize: {
          type: 'integer',
          defaultValue: 16,
          minValue: 8,
          maxValue: 64,
          step: 1,
          name: 'Font Size',
          description: 'The base font size for the game.',
        },
      },
      customSettings: {},
      customSettingsSchema: {},
    }) as GameUserSettings,
  actions: {
    reset(config: Config) {
      this.$reset();
      this.setupSettings(config);
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
      };
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
        useConfig().config.dialogPanel.textSpeed = value;
      }
      if (key === 'animateText') {
        useConfig().config.dialogPanel.animateText = value;
      }
    },
    setupSettings(config: Config) {
      this.setSetting(
        'textSpeed',
        config.dialogPanel.textSpeed ?? DEFAULT_TEXT_SPEED,
      );
      this.setSetting('animateText', config.dialogPanel.animateText ?? true);
      this.setSetting('fontSize', config.layout.defaultFontSize ?? 16);
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
    generateSaveData(): GameUserSettingsSave {
      return {
        baseSettings: deepCopy(this.baseSettings),
        customSettings: deepCopy(this.customSettings),
      };
    },
    loadSaveData(data: GameUserSettingsSave) {
      for (const key in data.baseSettings) {
        this.setSetting(key, data.baseSettings[key]);
      }
      for (const key in data.customSettings) {
        if (typeof this.customSettings[key] !== 'undefined') {
          this.setSetting(key, data.customSettings[key]);
        }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot));
}
