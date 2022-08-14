import { defaultConfig } from './defaultConfig';
import { AppOptions } from './types/app-types';
import { loadDataFile } from './utils/ajax';
import { error } from './utils/error-handling';
import { transitionSettings, TransitionSettings } from './utils/transition';

let config!: Config;

export async function loadConfig(options: AppOptions) {
  config = { ...defaultConfig };
  if (options.baseAssetsPath) {
    config.baseAssetsPath = options.baseAssetsPath;
  }
  if (options.baseDataPath) {
    config.baseDataPath = options.baseDataPath;
  }
  const baseConf = await loadDataFile<Config>(options.configPath);
  if (
    baseConf.items &&
    typeof baseConf.items !== 'string' &&
    !baseConf.items.categories
  ) {
    // Handle older version of items config that was just a list of items...
    baseConf.items = {
      ...defaultConfig.items,
      items: baseConf.items as any,
    };
  }
  config = { ...config, ...baseConf };
  // Loads all the possible split config files
  if (typeof config.screens === 'string') {
    const screensConf = await loadDataFile<SplitConfig['screens']>(
      getDataUrl(config.screens),
    );
    config.screens = screensConf;
  }
  if (typeof config.buttons === 'string') {
    const buttonsConf = await loadDataFile<SplitConfig['buttons']>(
      getDataUrl(config.buttons),
    );
    config.buttons = buttonsConf;
  }
  if (typeof config.skills === 'string') {
    const skillsConf = await loadDataFile<SplitConfig['skills']>(
      getDataUrl(config.skills),
    );
    config.skills = skillsConf.skills;
    config.skillOptions = { ...config.skillOptions, ...skillsConf.options };
    config.skillChecks = { ...config.skillChecks, ...skillsConf.skillChecks };
  }
  if (typeof config.scripts === 'string') {
    const scriptsConf = await loadDataFile<SplitConfig['scripts']>(
      getDataUrl(config.scripts),
    );
    config.scripts = scriptsConf;
  }
  if (typeof config.audio === 'string') {
    const audioConf = await loadDataFile<SplitConfig['audio']>(
      getDataUrl(config.audio),
    );
    config.audio = audioConf.files;
    config.audioOptions = { ...config.audioOptions, ...audioConf.options };
  }
  if (typeof config.items === 'string') {
    let itemsConf = await loadDataFile<SplitConfig['items']>(
      getDataUrl(config.items),
    );
    if (!itemsConf.categories) {
      // Handle older version of items config that was just a list of items...
      const oldItemsConf = itemsConf;
      itemsConf = {
        ...defaultConfig.items,
        items: oldItemsConf as any,
      };
    }
    config.items = itemsConf;
  }
  if (typeof config.quests === 'string') {
    const questsConf = await loadDataFile<SplitConfig['quests']>(
      getDataUrl(config.quests),
    );
    config.quests = questsConf;
  }
  if (config.transitions) {
    for (const key in config.transitions) {
      if (!transitionSettings[key]) {
        transitionSettings[key] = config.transitions[key];
      } else {
        Object.assign(transitionSettings[key], config.transitions[key]);
      }
    }
  }
}

export function getConfig() {
  return config;
}

export function getSkillConfig(id: string) {
  const skill = config.skills[id];
  if (!skill) {
    error(`Skill config for skill ${id} doesn't exist`);
  }
  return skill;
}

export function getImageUrl(imageKeyOrUrl: string) {
  if (imageKeyOrUrl.startsWith('http')) {
    return imageKeyOrUrl;
  }
  if (config.images[imageKeyOrUrl]) {
    return getAssetUrl(config.images[imageKeyOrUrl]);
  } else {
    return getAssetUrl(imageKeyOrUrl);
  }
}

export function getAssetUrl(assetPath: string) {
  if (assetPath.startsWith('http')) {
    return assetPath;
  }
  if (config.baseAssetsPath) {
    return `${config.baseAssetsPath}${assetPath}`;
  } else {
    return assetPath;
  }
}

export function getDataUrl(dataPath: string) {
  if (config.baseDataPath) {
    return `${config.baseDataPath}${dataPath}`;
  } else {
    return dataPath;
  }
}

export function getButtonConfig(button: string) {
  return config.buttons[button];
}

export function getItemConfig(id: string) {
  const item = config.items.items[id];
  if (!item) {
    error(`Item config for skill ${id} doesn't exist`);
  }
  return item;
}

export function getQuestConfig(questId: string) {
  return config.quests[questId];
}
export function getObjectiveConfig(quest: string, objectiveId: string) {
  return getQuestConfig(quest).objectives[objectiveId];
}

export interface AppOptionsDeprecated {
  logging: boolean;
  debug: boolean;
}

export interface SplitConfig {
  screens: Config['screens'];
  buttons: Config['buttons'];
  skills: {
    skills: Config['skills'];
    options: Config['skillOptions'];
    skillChecks: Config['skillChecks'];
  };
  scripts: Config['scripts'];
  audio: {
    files: Config['audio'];
    options: Config['audioOptions'];
  };
  items: Config['items'];
  quests: Config['quests'];
}

export interface Config {
  baseAssetsPath?: string;
  baseDataPath?: string;
  gameTitle: string;
  images: {
    [key: string]: string;
  };
  layout: {
    dialogPanel?: {
      overlayMode?: boolean;
      rightOffset?: number;
      bottomOffset?: number;
      width?: number;
      height?: number;
    };
    backgrounds: {
      width: number;
      height: number;
    };
    dialogBottomPadding: number;
    minTextWidth: number;
    mobileDialogHeightPercentage: number;
    verticalLayoutThreshold: number;
    portraits: {
      width: number;
      height: number;
      offset?: {
        landscape?: {
          right: number;
          bottom: number;
        };
        portrait?: {
          right: number;
          bottom: number;
        };
      };
    };
  };
  gameFlow: {
    labelToJumpOnScriptEnd?: string;
  };
  dialoguePanel: {
    animateText?: boolean;
    textSpeed?: number;
    timeBetweenLines?: number;
  };
  splashScreens: {
    engineSplashScreen?: {
      skip?: boolean;
      fadeDuration?: number;
      timeBeforeFadeout?: number;
      overrideText?: string;
      overrideLogo?: string;
    };
    gameSplashScreen?: {
      startButtonText?: string;
    };
  };
  screens: {
    [key: string]: ScreenConfig;
  };
  buttons: {
    [key: string]: ButtonConfig;
  };
  skills: {
    [key: string]: SkillData;
  };
  skillOptions: {
    xpPerLevel: number;
    notifyLevelUp: boolean;
  };
  skillChecks: {
    rollRange: number;
    skillMultiplier: number;
    failureChance: number;
    difficultyText: Array<[number, string]>;
  };
  scripts: string[];
  audio: {
    [key: string]: AudioConfig;
  };
  audioOptions: {
    volume: number;
    defaultMusic?: string;
    musicFadeInTime: number;
    musicFadeInDelay: number;
    musicFadeOutTime: number;
  };
  sound?: {
    [key: string]: AudioConfig;
  };
  music?: {
    [key: string]: AudioConfig;
  };
  notifications: {
    timeOnScreen: number;
    alsoPrintInDialogue?: boolean;
  };
  hudStats: {
    [key: string]: HudStatConfig;
  };
  items: {
    categories: ItemCategory[];
    items: {
      [key: string]: ItemData;
    };
  };
  interactionTags: {
    [key: string]: {
      onlyInteractOutsideOfScripts: boolean;
    };
  };
  quests: {
    [key: string]: QuestData;
  };
  transitions: {
    [key: string]: TransitionSettings;
  };
  audioTriggers: {
    [key: string]: string;
  };
  menuButtons: {
    [key: string]: MenuButtonData;
  };
  debugging: {
    showScriptFinishedMessage?: boolean;
  };
  saves: {
    mode: 'game-slots' | 'manual';
    slots: number;
  };
}

export interface ScreenConfig {
  background: string;
  buttons: Array<string | InlineButtonConfig>;
}

export interface MenuButtonData {
  text: string;
}

export interface QuestData {
  title: string;
  description: string;
  objectives: {
    [key: string]: ObjectiveData;
  };
}

export interface ObjectiveData {
  description: string;
  hidden?: boolean;
}

export interface ItemData {
  name: string;
  description: string;
  icon: string;
  onUse?: {
    action: 'jump' | 'run';
    label: string;
  };
  tag?: string;
  category?: string;
}

export interface ItemCategory {
  id: string;
  title: string;
}

export interface HudStatConfig {
  name: string;
  icon: string;
  startingValue: number;
  minValue?: number;
  maxValue?: number;
}
export interface AudioConfig {
  src: string;
  path?: string;
  volume?: number;
  rate?: number;
  html5?: boolean;
}

export interface MusicConfig extends AudioConfig {
  loop?: boolean;
}
export interface ButtonConfig {
  // Whether this button is enabled by default
  enabled: boolean;
  // Button background image
  background?: string;
  // Optional button text
  text?: string;
  // Optional css class
  cssClass?: string;
  // Position in pixels
  position: {
    left: number;
    top: number;
    width?: number;
    height?: number;
  };
  // Anchor for the button's position. 0 means left/top, 1 means right/bottom, 0.5 means center.
  anchor?: {
    x: number;
    y: number;
  };
  // Name of the label to run when clicking on the button
  action: string;
  // Default is using a jump
  actionType?: 'jump' | 'run';
  tag?: string;
}

export interface InlineButtonConfig extends ButtonConfig {
  id: string;
}

export interface SkillData {
  name: string;
  description: string;
  startingLevel: number;
  // If supplied, this option makes the skill be hidden in the skill window until it reaches level 1 at least
  hidden?: boolean;
  icon: string;
}
