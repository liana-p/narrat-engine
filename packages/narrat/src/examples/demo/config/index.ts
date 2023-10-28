import achievements from './achievements.yaml';
import audio from './audio.yaml';
import buttons from './buttons.yaml';
import characters from './characters.yaml';
import common from './common.yaml';
import items from './items.yaml';
import quests from './quests.yaml';
import screens from './screens.yaml';
import skills from './skills.yaml';
import skillChecks from './skillchecks.yaml';
import { ModuleConfigInput } from '@/config/config-input';

const defaultGameConfigs: ModuleConfigInput = {
  achievements,
  audio,
  buttons,
  characters,
  common,
  items,
  quests,
  screens,
  skills,
  skillChecks,
};
export default defaultGameConfigs;
