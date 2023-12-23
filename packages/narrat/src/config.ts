import { AppOptions } from './types/app-types';
import { error, warning } from './utils/error-handling';
import { useConfig } from './stores/config-store';
import { Config, ConfigKey, defaultConfig } from './config/config-output';
import {
  DEFAULT_DIALOG_WIDTH,
  EMPTY_SCREEN,
  defaultScreenConfig,
} from './constants';
import {
  defaultItemsConfig,
  ItemsInputConfigSchema,
} from './config/items-config';
import {
  defaultScreensConfig,
  ScreenConfig,
  ScreensInputConfigSchema,
} from './config/screens-config';
import {
  ButtonsConfigSchema,
  defaultButtonsConfig,
  ButtonConfig,
} from './config/buttons-config';
import {
  defaultSkillsConfig,
  SkillsInputConfigSchema,
} from './config/skills-config';
import {
  CommonConfig,
  CommonConfigInput,
  CommonConfigInputSchema,
  defaultCommonConfig,
  defaultScriptsConfig,
  HudStatData,
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
import {
  ConfigInput,
  ConfigInputSchema,
  ConfigInputWithCommon,
  ConfigInputWithoutCommon,
  isConfigInputWithCommon,
} from './config/config-input';
import Ajv from 'ajv';
import { transitionSettings } from './utils/transition';
import {
  defaultTooltipsConfig,
  TooltipsConfigSchema,
} from './config/tooltips-config';
import {
  CharactersFilesConfigSchema,
  defaultCharactersConfig,
} from './config/characters-config';
import {
  AchievementsInputConfigSchema,
  defaultAchievementsConfig,
} from './config/achievements-config';
import {
  SkillChecksInputConfigSchema,
  defaultSkillChecksConfig,
} from './config/skillchecks-config';
import {
  ChoicesInputConfigSchema,
  defaultChoicesConfig,
} from './config/choices-config';
import {
  AnimationsConfigSchema,
  defaultAnimationsConfig,
} from './config/animations-config';
import { isNarratYaml } from './hmr/hmr';
import { processConfigUpdate } from './config/config-helpers';
import {
  MacrosConfigSchema,
  defaultMacrosConfig,
} from './config/macros-config';
import { createMacro } from './vm/macros';
import { ArgTypes } from './vm/commands/command-plugin';

let config: Config;

// List of config keys loaded from split files

// 0: key, 1: schema, 2: default value
const splitConfigs = [
  ['items', ItemsInputConfigSchema, defaultItemsConfig],
  ['achievements', AchievementsInputConfigSchema, defaultAchievementsConfig],
  ['screens', ScreensInputConfigSchema, defaultScreensConfig],
  ['skills', SkillsInputConfigSchema, defaultSkillsConfig],
  ['skillChecks', SkillChecksInputConfigSchema, defaultSkillChecksConfig],
  ['buttons', ButtonsConfigSchema, defaultButtonsConfig],
  ['scripts', ScriptsConfigSchema, defaultScriptsConfig],
  ['audio', AudioInputConfigSchema, defaultAudioConfig],
  ['quests', QuestsConfigSchema, defaultQuestsConfig],
  ['tooltips', TooltipsConfigSchema, defaultTooltipsConfig],
  ['characters', CharactersFilesConfigSchema, defaultCharactersConfig],
  ['choices', ChoicesInputConfigSchema, defaultChoicesConfig],
  ['animations', AnimationsConfigSchema, defaultAnimationsConfig],
  ['macros', MacrosConfigSchema, defaultMacrosConfig],
] as const;

const extendedConfigs = [
  ['common', CommonConfigInputSchema, defaultCommonConfig],
] as const;

const ajv = new Ajv({ allErrors: true });

// For backwards compatibility
const baseConfigKeys = [
  'baseAssetsPath',
  'baseDataPath',
  'gameTitle',
  'saveFileName',
  'images',
  'layout',
  'settings',
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
export async function extendBaseConfig(
  newConfig: Config,
  configInput: ConfigInputWithCommon,
) {
  for (const [key, schema, defaultValue] of extendedConfigs) {
    const value = configInput[key];
    let currentValue = copyValue(defaultValue);
    try {
      const result = ajv.validate(schema, value);
      if (!result) {
        console.error(ajv.errors);
        throw new Error(`${ajv.errorsText()}`);
      }
    } catch (e) {
      console.error(e);
      error(`${key} config error: ${e}`);
    }
    if (typeof value !== 'undefined') {
      currentValue = copyValue(value, currentValue) as CommonConfig;
    }
    newConfig[key] = currentValue as any;
  }
}

export function copyValue<T>(value: T, base?: T): T {
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return [...value] as any;
    } else {
      return { ...base, ...value };
    }
  } else {
    return typeof value !== 'undefined' ? value : base!;
  }
}

export async function addOldBaseConfig(
  newConfig: Config,
  configInput: ConfigInputWithoutCommon,
) {
  for (const baseConfigKey of baseConfigKeys) {
    const value = configInput[baseConfigKey];
    if (value) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        newConfig.common[baseConfigKey] = {
          ...(newConfig.common[baseConfigKey] as any),
          ...value,
        };
      } else {
        newConfig.common[baseConfigKey] = value as any;
      }
    }
  }
}

export async function setupConfig(configInput: ConfigInput) {
  const newConfig: Config = { ...defaultConfig };
  if (isConfigInputWithCommon(configInput)) {
    await extendBaseConfig(newConfig, configInput);
  } else {
    addOldBaseConfig(newConfig, configInput);
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
          getSplitConfigUrl(newConfig.common.baseDataPath!, currentValue),
        );
        const result = ajv.validate(schema, currentValue);
        if (!result) {
          console.error(ajv.errors);
          throw new Error(`${ajv.errorsText()}`);
        }
      } catch (e) {
        console.error(e);
        error(`${key} config error: ${e}`);
        currentValue = { ...defaultValue } as any;
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
  for (const key in newConfig) {
    processConfigUpdate(
      newConfig,
      key as ConfigKey,
      newConfig[key as ConfigKey],
    );
  }
  for (const macro of newConfig.macros.macros) {
    const macroOptions = (macro.options ?? []) as ArgTypes;
    createMacro(macro.keyword, macroOptions, macro.label);
  }
  return newConfig;
}

export async function loadConfig(options: AppOptions) {
  let userConfig: ConfigInput;
  if (options.config) {
    const config = options.config!;
    userConfig = {} as any;
    for (const key in config) {
      const value = config[key as keyof typeof config];
      if (isNarratYaml(value)) {
        useConfig().addConfigModule(key as keyof typeof config, {
          id: value.id,
          configKey: key as keyof typeof config,
          code: value.code,
        });
        (userConfig as any)[key] = value.code;
      } else {
        (userConfig as any)[key] = value;
      }
    }
  } else if (options.configPath) {
    userConfig = await loadDataFile<ConfigInput>(options.configPath);
  } else {
    error(`No config file or config object provided`);
    throw new Error(`No config file or config object provided`);
  }
  let common: CommonConfigInput = userConfig as ConfigInputWithoutCommon as any;
  if (isConfigInputWithCommon(userConfig)) {
    common = (userConfig as any).common;
  }
  common.baseAssetsPath = options.baseAssetsPath ?? common.baseAssetsPath ?? '';
  common.baseDataPath = options.baseDataPath ?? common.baseDataPath ?? '';
  const result = ajv.validate(ConfigInputSchema, userConfig);
  if (!result) {
    error(`Config file validation failed.`);
    console.log(ajv.errors);
    error(ajv.errorsText());
  }
  return setupConfig(userConfig);
}

export function getConfig(): Config {
  return useConfig().config;
}

export function getCommonConfig(): CommonConfig {
  return getConfig().common;
}
export function getHudStatConfig(stat: string): HudStatData {
  const value = getCommonConfig().hudStats[stat];
  if (!value) {
    error(`Hud stat ${stat} doesn't exist`);
  }
  return value;
}
export function audioConfig() {
  return getConfig().audio;
}
export function audioFileConfig(key: string) {
  const res = audioConfig().files[key];
  if (!res) {
    warning(`Audio file ${key} doesn't exist`);
    return undefined;
  }
  return res;
}
export function getAudioFadeTimings(audio: string) {
  const audioConf = audioFileConfig(audio);
  const fadeInDelay =
    (audioConf?.fadeInDelay ?? audioConfig().options.musicFadeInDelay) * 1000;
  const fadeInTime =
    (audioConf?.fadeInTime ?? audioConfig().options.musicFadeInTime) * 1000;
  const fadeOutTime =
    (audioConf?.fadeOutTime ?? audioConfig().options.musicFadeOutTime) * 1000;
  return {
    fadeInDelay,
    fadeInTime,
    fadeOutTime,
  };
}

export function skillsConfig() {
  return getConfig().skills;
}
export function skillChecksConfig() {
  return getConfig().skillChecks;
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
export function buttonsConfig() {
  return getConfig().buttons;
}
export function tooltipsConfig() {
  return getConfig().tooltips;
}
export function charactersConfig() {
  return getConfig().characters;
}
export function choicesConfig() {
  return getConfig().choices;
}
export function animationsConfig() {
  return getConfig().animations;
}
export function getChoicePromptConfig(flag: string) {
  return choicesConfig().choicePrompts[flag];
}

export function getScreenConfig(screen: string): ScreenConfig {
  if (screen === EMPTY_SCREEN) {
    return defaultScreenConfig;
  }
  if (!screensConfig().screens[screen]) {
    error(`Screen config for screen ${screen} doesn't exist`);
    return defaultScreenConfig;
  }
  return screensConfig().screens[screen];
}

export function getTooltipConfig(keyword: string) {
  const config = tooltipsConfig();
  const data = config.tooltips.find((k) => k.keywords.includes(keyword));
  if (!data) {
    error(`Tooltip config for keyword ${keyword} not found`);
    return null;
  }
  return data;
}

export function getSkillConfig(id: string) {
  const skill = getConfig().skills.skills[id];
  if (!skill) {
    error(`Skill config for skill ${id} doesn't exist`);
  }
  return skill;
}

export function getSkillCheckConfig(id: string) {
  const skillCheck = getConfig().skillChecks.skillChecks[id];
  if (!skillCheck) {
    error(`Skill check config for skill check ${id} doesn't exist`);
  }
  return skillCheck;
}
export function skillCheckConfigExists(id: string) {
  return !!getConfig().skillChecks.skillChecks[id];
}

export function getImageUrl(imageKeyOrUrl: string) {
  if (imageKeyOrUrl.startsWith('http')) {
    return imageKeyOrUrl;
  }
  if (getCommonConfig().images[imageKeyOrUrl]) {
    return getAssetUrl(getCommonConfig().images[imageKeyOrUrl]);
  } else {
    return getAssetUrl(imageKeyOrUrl);
  }
}

export function getAssetUrl(assetPath: string) {
  if (assetPath.startsWith('http')) {
    return assetPath;
  }
  if (getCommonConfig().baseAssetsPath) {
    return `${getCommonConfig().baseAssetsPath}${assetPath}`;
  } else {
    return assetPath;
  }
}

export function getSplitConfigUrl(basePath: string, url: string) {
  return `${basePath}${url}`;
}

export function getDataUrl(dataPath: string) {
  if (getCommonConfig().baseDataPath) {
    return `${getCommonConfig().baseDataPath}${dataPath}`;
  } else {
    return dataPath;
  }
}

export function getButtonConfig(button: string): ButtonConfig {
  const result = buttonsConfig().buttons[button];
  if (!result) {
    error(`Button config for button ${button} doesn't exist`);
  }
  return result;
}

export function getItemConfig(id: string) {
  const item = itemsConfig().items[id];
  if (!item) {
    error(`Item config for skill ${id} doesn't exist`);
  }
  return item;
}

export function getAchievementsConfig() {
  return getConfig().achievements;
}

export function getAchievementConfig(id: string) {
  const achievement = getAchievementsConfig().achievements[id];
  if (!achievement) {
    error(`Achievement config for achievement ${id} doesn't exist`);
  }
  return achievement;
}

export function getQuestConfig(questId: string) {
  return questsConfig().quests[questId];
}
export function getQuestEndingConfig(questId: string, ending: string) {
  const quest = getQuestConfig(questId);
  const endings = quest.endings!;
  if (!endings) {
    error(`Quest ${questId} doesn't have any endings`);
  }
  if (!endings[ending]) {
    error(`Quest ${questId} has no ending called ${ending}`);
  }
  return endings[ending];
}
export function getObjectiveConfig(quest: string, objectiveId: string) {
  return getQuestConfig(quest).objectives[objectiveId];
}

export function getDialogPanelWidth(): number {
  const dialogPanel = getCommonConfig().dialogPanel;
  return dialogPanel.width ?? DEFAULT_DIALOG_WIDTH;
}
