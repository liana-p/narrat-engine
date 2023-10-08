import { AudioConfig, defaultAudioConfig } from '@/config/audio-config';
import {
  DebuggingConfig,
  DialogPanelConfig,
  InteractionTagsConfig,
  MenuButtonsConfig,
  NotificationsConfig,
  SavesConfig,
  SplashScreenConfig,
  TransitionsConfig,
  HudStatsConfig,
} from '@/config/common-config';
import { defaultItemsConfig, ItemsConfig } from '@/config/items-config';
import { defaultQuestsConfig, QuestsConfig } from '@/config/quests-config';
import { defaultScreensConfig, ScreensConfig } from '@/config/screens-config';
import { defaultSkillsConfig, SkillsConfig } from '@/config/skills-config';
import { DEFAULT_TEXT_SPEED } from '@/constants';
import { ButtonsConfig, defaultButtonsConfig } from './buttons-config';
import {
  CharactersFilesConfig,
  defaultCharactersConfig,
} from './characters-config';
import { defaultLayoutConfig, LayoutConfig } from './layout-config';
import { defaultTooltipsConfig, TooltipsConfig } from './tooltips-config';
import {
  AchievementsConfig,
  defaultAchievementsConfig,
} from './achievements-config';
import {
  SkillChecksConfig,
  defaultSkillChecksConfig,
} from './skillchecks-config';
import { SettingsConfig } from './settings-config';
import { ChoicesConfig, defaultChoicesConfig } from './choices-config';

export interface Config {
  baseAssetsPath: string;
  baseDataPath: string;
  gameTitle: string;
  saveFileName: string;
  images: {
    [key: string]: string;
  };
  layout: LayoutConfig;
  settings: SettingsConfig;
  gameFlow: {
    labelToJumpOnScriptEnd?: string;
  };
  dialogPanel: DialogPanelConfig;
  splashScreens: SplashScreenConfig;
  screens: ScreensConfig;
  buttons: ButtonsConfig;
  skills: SkillsConfig;
  skillChecks: SkillChecksConfig;
  scripts: string[];
  audio: AudioConfig;
  notifications: NotificationsConfig;
  tooltips: TooltipsConfig;
  hudStats: HudStatsConfig;
  items: ItemsConfig;
  achievements: AchievementsConfig;
  interactionTags: InteractionTagsConfig;
  quests: QuestsConfig;
  transitions: TransitionsConfig;
  menuButtons: MenuButtonsConfig;
  debugging: DebuggingConfig;
  saves: SavesConfig;
  characters: CharactersFilesConfig;
  choices: ChoicesConfig;
}

export const defaultConfig = {
  baseAssetsPath: '',
  baseDataPath: '',
  gameTitle: 'Narrat Game',
  saveFileName: 'narrat save',
  images: {},
  layout: defaultLayoutConfig,
  settings: {},
  gameFlow: {},
  dialogPanel: {
    overlayMode: true,
    rightOffset: 100,
    bottomOffset: 50,
    width: 475,
    height: 680,
    textSpeed: DEFAULT_TEXT_SPEED,
    animateText: true,
    timeBetweenLines: 100,
  },
  splashScreens: {},
  screens: defaultScreensConfig,
  buttons: defaultButtonsConfig,
  skills: defaultSkillsConfig,
  skillChecks: defaultSkillChecksConfig,
  scripts: [],
  audio: defaultAudioConfig,
  notifications: {
    timeOnScreen: 2.5,
    alsoPrintInDialogue: false,
  },
  tooltips: defaultTooltipsConfig,
  hudStats: {},
  achievements: defaultAchievementsConfig,
  items: defaultItemsConfig,
  interactionTags: {
    default: {
      onlyInteractOutsideOfScripts: true,
    },
  },
  quests: defaultQuestsConfig,
  transitions: {},
  menuButtons: {},
  debugging: {
    showScriptFinishedMessage: false,
  },
  saves: {
    mode: 'manual',
    slots: 10,
  },
  characters: defaultCharactersConfig,
  choices: defaultChoicesConfig,
};
// Hack so that the previous config has a static type
export const defaultConfigTyped: Config = defaultConfig;
