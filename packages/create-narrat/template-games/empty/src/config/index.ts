import audio from './audio.yaml';
import buttons from './buttons.yaml';
import characters from './characters.yaml';
import common from './common.yaml';
import items from './items.yaml';
import quests from './quests.yaml';
import screens from './screens.yaml';
import skills from './skills.yaml';
import skillChecks from './skillchecks.yaml';
import fonts from './fonts.yaml';

import { ModuleConfigInput } from 'narrat';

const gameConfigs: ModuleConfigInput = {
  audio,
  buttons,
  characters,
  common,
  items,
  quests,
  screens,
  skills,
  skillChecks,
  fonts,
};
export default gameConfigs;
