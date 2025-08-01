import { ItemsInputConfig } from '@/config/items-config';
import type { ConfigInput, ModuleConfigInput } from '../config/config-input';
import { AchievementsInputConfig } from '@/config/achievements-config';
import { ScreensInputConfig } from '@/config/screens-config';
import { SkillsInputConfig } from '@/config/skills-config';
import { SkillChecksInputConfig } from '@/config/skillchecks-config';
import { ButtonsConfig } from '@/config/buttons-config';
import { ScriptsConfig } from '@/config/common-config';
import { AudioInputConfig } from '@/config/audio-config';
import { QuestsConfig } from '@/config/quests-config';
import { TooltipsConfig } from '@/config/tooltips-config';
import { CharactersFilesConfig } from '@/config/characters-config';
import { ChoicesInputConfig } from '@/config/choices-config';
import { AnimationsConfig } from '@/config/animations-config';
import type { InitOptions } from 'i18next';
export type NarratModule = {
  code: any;
  fileName: string;
  id: string;
  type: 'script' | 'yaml';
};

export type NarratScript = NarratModule & {
  type: 'script';
  code: string;
};
export type NarratYaml = NarratModule & {
  type: 'yaml';
  code: any;
};

export interface ConfigFiles {
  items: ItemsInputConfig;
  achievements: AchievementsInputConfig;
  screens: ScreensInputConfig;
  skills: SkillsInputConfig;
  skillChecks: SkillChecksInputConfig;
  buttons: ButtonsConfig;
  scripts: ScriptsConfig;
  audio: AudioInputConfig;
  quests: QuestsConfig;
  tooltips: TooltipsConfig;
  characters: CharactersFilesConfig;
  choices: ChoicesInputConfig;
  animations: AnimationsConfig;
}

export interface AppOptions {
  scripts: NarratScript[];
  localization?: InitOptions;
  baseAssetsPath?: string;
  baseDataPath?: string;
  savePathPrefix?: string;
  configPath?: string;
  logging?: boolean;
  debug?: boolean;
  container?: HTMLElement | string;
  config?: ModuleConfigInput;
}

export type AppOptionsInput = Partial<AppOptions>;
