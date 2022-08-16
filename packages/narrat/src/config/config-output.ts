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
import {
  ButtonConfig,
  defaultScreensConfig,
  ScreensConfig,
} from '@/config/screens-config';
import { defaultSkillsConfig, SkillsConfig } from '@/config/skills-config';

export interface Config {
  baseAssetsPath: string;
  baseDataPath: string;
  gameTitle: string;
  images: {
    [key: string]: string;
  };
  gameFlow: {
    labelToJumpOnScriptEnd?: string;
  };
  dialogPanel: DialogPanelConfig;
  splashScreens: SplashScreenConfig;
  screens: ScreensConfig;
  buttons: {
    [key: string]: ButtonConfig;
  };
  skills: SkillsConfig;
  scripts: string[];
  audio: AudioConfig;
  notifications: NotificationsConfig;
  hudStats: HudStatsConfig;
  items: ItemsConfig;
  interactionTags: InteractionTagsConfig;
  quests: QuestsConfig;
  transitions: TransitionsConfig;
  audioTriggers: {
    [key: string]: string;
  };
  menuButtons: MenuButtonsConfig;
  debugging: DebuggingConfig;
  saves: SavesConfig;
}

export const defaultConfig: Config = {
  baseAssetsPath: '',
  baseDataPath: '',
  gameTitle: 'Narrat Game',
  images: {},
  gameFlow: {},
  dialogPanel: {
    overlayMode: true,
    rightOffset: 100,
    bottomOffset: 50,
    width: 475,
    height: 680,
    textSpeed: 30,
    animateText: true,
    timeBetweenLines: 100,
  },
  splashScreens: {},
  screens: defaultScreensConfig,
  buttons: {},
  skills: defaultSkillsConfig,
  scripts: [],
  audio: defaultAudioConfig,
  notifications: {
    timeOnScreen: 2.5,
    alsoPrintInDialogue: false,
  },
  hudStats: {},
  items: defaultItemsConfig,
  interactionTags: {
    default: {
      onlyInteractOutsideOfScripts: true,
    },
  },
  quests: {},
  transitions: {},
  audioTriggers: {},
  menuButtons: {},
  debugging: {
    showScriptFinishedMessage: false,
  },
  saves: {
    mode: 'manual',
    slots: 10,
  },
};
