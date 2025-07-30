import achievements from './achievements.yaml';
import animations from './animations.yaml';
import audio from './audio.yaml';
import buttons from './buttons.yaml';
import characters from './characters.yaml';
import choices from './choices.yaml';
import common from './common.yaml';
import items from './items.yaml';
import quests from './quests.yaml';
import screens from './screens.yaml';
import skills from './skills.yaml';
import skillChecks from './skillchecks.yaml';
import tooltips from './tooltips.yaml';
import macros from './macros.yaml';
import preload from './preload.yaml';
import fonts from './fonts.yaml';
import localization from './localization.yaml';

import { ModuleConfigInput } from '@/config/config-input';

const defaultGameConfigs: ModuleConfigInput = {
  achievements,
  animations,
  audio,
  buttons,
  characters,
  choices,
  common,
  items,
  quests,
  screens,
  skills,
  skillChecks,
  tooltips,
  macros,
  preload,
  fonts,
  localization,
};
export default defaultGameConfigs;
