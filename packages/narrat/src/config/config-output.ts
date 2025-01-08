import { AudioConfig, defaultAudioConfig } from '@/config/audio-config';
import { CommonConfig, defaultCommonConfig } from '@/config/common-config';
import { defaultItemsConfig, ItemsConfig } from '@/config/items-config';
import { defaultQuestsConfig, QuestsConfig } from '@/config/quests-config';
import { defaultScreensConfig, ScreensConfig } from '@/config/screens-config';
import { defaultSkillsConfig, SkillsConfig } from '@/config/skills-config';
import { ButtonsConfig, defaultButtonsConfig } from './buttons-config';
import {
  CharactersFilesConfig,
  defaultCharactersConfig,
} from './characters-config';
import { defaultTooltipsConfig, TooltipsConfig } from './tooltips-config';
import {
  AchievementsConfig,
  defaultAchievementsConfig,
} from './achievements-config';
import {
  SkillChecksConfig,
  defaultSkillChecksConfig,
} from './skillchecks-config';
import { ChoicesConfig, defaultChoicesConfig } from './choices-config';
import { AnimationsConfig, defaultAnimationsConfig } from './animations-config';
import { MacrosConfig, defaultMacrosConfig } from './macros-config';
import { PreloadConfig, defaultPreloadConfig } from './preload-config';
import { defaultFontsConfig, FontsConfig } from './fonts-config';

export interface Config {
  common: CommonConfig;
  screens: ScreensConfig;
  buttons: ButtonsConfig;
  skills: SkillsConfig;
  skillChecks: SkillChecksConfig;
  scripts: string[];
  audio: AudioConfig;
  items: ItemsConfig;
  achievements: AchievementsConfig;
  quests: QuestsConfig;
  characters: CharactersFilesConfig;
  animations: AnimationsConfig;
  tooltips: TooltipsConfig;
  choices: ChoicesConfig;
  macros: MacrosConfig;
  preload: PreloadConfig;
  fonts: FontsConfig;
}

export const defaultConfig: Config = {
  common: defaultCommonConfig,
  screens: defaultScreensConfig,
  buttons: defaultButtonsConfig,
  skills: defaultSkillsConfig,
  skillChecks: defaultSkillChecksConfig,
  scripts: [],
  audio: defaultAudioConfig,
  tooltips: defaultTooltipsConfig,
  achievements: defaultAchievementsConfig,
  items: defaultItemsConfig,
  quests: defaultQuestsConfig,
  characters: defaultCharactersConfig,
  choices: defaultChoicesConfig,
  animations: defaultAnimationsConfig,
  macros: defaultMacrosConfig,
  preload: defaultPreloadConfig,
  fonts: defaultFontsConfig,
};
// Hack so that the previous config has a static type
export const defaultConfigTyped: Config = defaultConfig;
export type ConfigKey = keyof Config;

export interface ConfigModule {
  id: string;
  configKey: keyof Config;
  code: Config[keyof Config];
}
