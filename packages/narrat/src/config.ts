import { AppOptions } from './types/app-types';
import { error } from './utils/error-handling';
import { useConfig } from './stores/config-store';
import { Config, defaultConfig } from './config/config-output';
import { DEFAULT_DIALOG_WIDTH } from './constants';
import { defaultItemsConfig, ItemsConfigSchema } from './config/items-config';
import {
  defaultScreensConfig,
  ScreensConfigSchema,
  ScreensInputConfigSchema,
} from './config/screens-config';
import {
  ButtonsConfigSchema,
  defaultButtonsConfig,
} from './config/buttons-config';
import {
  defaultSkillsConfig,
  SkillsConfigSchema,
  SkillsInputConfigSchema,
} from './config/skills-config';
import {
  defaultScriptsConfig,
  ScriptsConfigSchema,
} from './config/common-config';
import {
  AudioInputConfigSchema,
  defaultAudioConfig,
} from './config/audio-config';
import {
  defaultQuestsConfig,
  QuestsConfigSchema,
} from './config/quests-config';
import { loadDataFile } from './utils/ajax';
import { ConfigInput, ConfigInputSchema } from './config/config-input';
import Ajv from 'ajv';

let config: Config;

// List of config keys loaded from split files

// 0: key, 1: schema, 2: default value
const splitConfigs = [
  ['items', ItemsConfigSchema, defaultItemsConfig],
  ['screens', ScreensInputConfigSchema, defaultScreensConfig],
  ['skills', SkillsInputConfigSchema, defaultSkillsConfig],
  ['scripts', ScriptsConfigSchema, defaultScriptsConfig],
  ['audio', AudioInputConfigSchema, defaultAudioConfig],
  ['quests', QuestsConfigSchema, defaultQuestsConfig],
] as const;

// List of other keys that are simply copied from input config to new config
const baseConfigKeys = [
  'baseAssetsPath',
  'baseDataPath',
  'gameTitle',
  'images',
  'layout',
  'gameFlow',
  'dialogPanel',
  'splashScreens',
  'notifications',
  'hudStats',
  'interactionTags',
  'transitions',
  'menuButtons',
  'debugging',
  'saves',
] as const;

export async function setupConfig(configInput: ConfigInput) {
  const newConfig: Config = { ...defaultConfig };
  // Setup the base keys from the config
  for (const baseConfigKey of baseConfigKeys) {
    const value = configInput[baseConfigKey];
    if (value) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        newConfig[baseConfigKey] = {
          ...(newConfig[baseConfigKey] as any),
          ...value,
        };
      } else {
        newConfig[baseConfigKey] = value as any;
      }
    }
  }
  // Setup all the split config keys
  for (const splitConfig of splitConfigs) {
    const key = splitConfig[0];
    const schema = splitConfig[1];
    const defaultValue = splitConfig[2];
    let currentValue = configInput[key];
    if (currentValue && typeof currentValue === 'string') {
      try {
        currentValue = await loadDataFile<any>(
          getSplitConfigUrl(configInput.baseDataPath!, currentValue),
        );
        const validator = new Ajv({ allErrors: true });
        const result = validator.validate(schema, currentValue);
        if (!result) {
          console.error(validator.errors);
          throw new Error(`${validator.errorsText()}`);
        }
      } catch (e) {
        console.error(e);
        error(`${key} config error: ${e}`);
        currentValue = { ...defaultValue };
      }
    }
    if (currentValue) {
      if (Array.isArray(currentValue)) {
        newConfig[key] = currentValue as any;
      } else if (typeof currentValue === 'object') {
        newConfig[key] = { ...defaultValue, ...currentValue } as any;
      } else {
        newConfig[key] = currentValue as any;
      }
    }
  }
  config = newConfig;
  return newConfig;
}
export async function loadConfig(options: AppOptions) {
  const userConfig = await loadDataFile<ConfigInput>(options.configPath);
  if (options.baseAssetsPath) {
    userConfig.baseAssetsPath = options.baseAssetsPath;
  }
  if (options.baseDataPath) {
    userConfig.baseDataPath = options.baseDataPath;
  }
  const ajv = new Ajv({ allErrors: true });
  const result = ajv.validate(ConfigInputSchema, userConfig);
  if (!result) {
    error(`Config file validation failed.`);
    console.log(ajv.errors);
    error(ajv.errorsText());
  }
  return setupConfig(userConfig);
  // config = { ...defaultConfig };
  // if (options.baseAssetsPath) {
  //   config.baseAssetsPath = options.baseAssetsPath;
  // }
  // if (options.baseDataPath) {
  //   config.baseDataPath = options.baseDataPath;
  // }
  // const baseConf = await loadDataFile<Config>(options.configPath);
  // if (
  //   baseConf.items &&
  //   typeof baseConf.items !== 'string' &&
  //   !baseConf.items.categories
  // ) {
  //   // Handle older version of items config that was just a list of items...
  //   baseConf.items = {
  //     ...defaultConfig.items,
  //     items: baseConf.items as any,
  //   };
  // }
  // config = { ...config, ...baseConf };
  // // Loads all the possible split config files
  // if (typeof config.screens === 'string') {
  //   const screensConf = await loadDataFile<SplitConfig['screens']>(
  //     getDataUrl(config.screens),
  //   );
  //   config.screens = screensConf;
  // }
  // if (typeof config.buttons === 'string') {
  //   const buttonsConf = await loadDataFile<SplitConfig['buttons']>(
  //     getDataUrl(config.buttons),
  //   );
  //   config.buttons = buttonsConf;
  // }
  // if (typeof config.skills === 'string') {
  //   const skillsConf = await loadDataFile<SplitConfig['skills']>(
  //     getDataUrl(config.skills),
  //   );
  //   config.skills = skillsConf.skills;
  //   config.skillOptions = { ...config.skillOptions, ...skillsConf.options };
  //   config.skillChecks = { ...config.skillChecks, ...skillsConf.skillChecks };
  // }
  // if (typeof config.scripts === 'string') {
  //   const scriptsConf = await loadDataFile<SplitConfig['scripts']>(
  //     getDataUrl(config.scripts),
  //   );
  //   config.scripts = scriptsConf;
  // }
  // if (typeof config.audio === 'string') {
  //   const audioConf = await loadDataFile<SplitConfig['audio']>(
  //     getDataUrl(config.audio),
  //   );
  //   config.audio = audioConf.files;
  //   config.audioOptions = { ...config.audioOptions, ...audioConf.options };
  // }
  // if (typeof config.items === 'string') {
  //   let itemsConf = await loadDataFile<SplitConfig['items']>(
  //     getDataUrl(config.items),
  //   );
  //   if (!itemsConf.categories) {
  //     // Handle older version of items config that was just a list of items...
  //     const oldItemsConf = itemsConf;
  //     itemsConf = {
  //       ...defaultConfig.items,
  //       items: oldItemsConf as any,
  //     };
  //   }
  //   config.items = itemsConf;
  // }
  // if (typeof config.quests === 'string') {
  //   const questsConf = await loadDataFile<SplitConfig['quests']>(
  //     getDataUrl(config.quests),
  //   );
  //   config.quests = questsConf;
  // }
  // if (config.transitions) {
  //   for (const key in config.transitions) {
  //     if (!transitionSettings[key]) {
  //       transitionSettings[key] = config.transitions[key];
  //     } else {
  //       Object.assign(transitionSettings[key], config.transitions[key]);
  //     }
  //   }
  // }
}

export function getConfig(): Config {
  return useConfig().config;
}
export function audioConfig() {
  return getConfig().audio;
}
export function skillsConfig() {
  return getConfig().skills;
}
export function itemsConfig() {
  return getConfig().items;
}
export function questsConfig() {
  return getConfig().quests;
}
export function screensConfig() {
  return getConfig().screens;
}

export function getSkillConfig(id: string) {
  const skill = getConfig().skills.skills[id];
  if (!skill) {
    error(`Skill config for skill ${id} doesn't exist`);
  }
  return skill;
}

export function getImageUrl(imageKeyOrUrl: string) {
  if (imageKeyOrUrl.startsWith('http')) {
    return imageKeyOrUrl;
  }
  if (getConfig().images[imageKeyOrUrl]) {
    return getAssetUrl(getConfig().images[imageKeyOrUrl]);
  } else {
    return getAssetUrl(imageKeyOrUrl);
  }
}

export function getAssetUrl(assetPath: string) {
  if (assetPath.startsWith('http')) {
    return assetPath;
  }
  if (getConfig().baseAssetsPath) {
    return `${getConfig().baseAssetsPath}${assetPath}`;
  } else {
    return assetPath;
  }
}

export function getSplitConfigUrl(basePath: string, url: string) {
  return `${basePath}${url}`;
}

export function getDataUrl(dataPath: string) {
  if (getConfig().baseDataPath) {
    return `${getConfig().baseDataPath}${dataPath}`;
  } else {
    return dataPath;
  }
}

export function getButtonConfig(button: string) {
  return screensConfig().buttons[button];
}

export function getItemConfig(id: string) {
  const item = itemsConfig().items[id];
  if (!item) {
    error(`Item config for skill ${id} doesn't exist`);
  }
  return item;
}

export function getQuestConfig(questId: string) {
  return questsConfig().quests[questId];
}
export function getObjectiveConfig(quest: string, objectiveId: string) {
  return getQuestConfig(quest).objectives[objectiveId];
}

export function getDialogPanelWidth(): number {
  const dialogPanel = getConfig().dialogPanel;
  return dialogPanel.width ?? DEFAULT_DIALOG_WIDTH;
}
