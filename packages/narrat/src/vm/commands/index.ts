import {
  addLevelPlugin,
  addXpPlugin,
  getLevelPlugin,
  getSkillCheckPlugin,
  getSkillCheckResultPlugin,
  getXpPlugin,
  resetSkillCheck,
  rollPlugin,
  setLevelPlugin,
} from './skill-commands';
import {
  addStatPlugin,
  getStatPlugin,
  hideHud,
  setStatPlugin,
  showHud,
} from './stats-commands';
import {
  defineVariablePlugin,
  jumpCommand,
  logPlugin,
  newCommandPlugin,
  resetGlobalPlugin,
  returnMainMenuPlugin,
  returnPlugin,
  runLabelPlugin,
  savePlugin,
  savePromptPlugin,
} from './flow-commands';
import {
  pauseCommand,
  playCommand,
  resumeCommand,
  stopCommand,
} from './audio-commands';
import { addPlugin, setCommand } from './set';
import {
  emptyLayerCommand,
  setButtonCommand,
  setScreenCommand,
} from './screen-commands';
import { talkCommand, textCommandPlugin, thinkCommand } from './text';
import { VM } from '../vm';
import {
  addItemPlugin,
  disableInteractionPlugin,
  enableInteractionPlugin,
  hasItemPlugin,
  itemAmountPlugin,
  removeItemPlugin,
} from './inventory-commands';
import {
  completeObjectivePlugin,
  completeQuestPlugin,
  getQuestEnding,
  objectiveCompletedPlugin,
  objectiveStartedPlugin,
  questCompletedPlugin,
  questFailedPlugin,
  questHasEnding,
  questStartedPlugin,
  questSucceededPlugin,
  startObjectivePlugin,
  startQuestPlugin,
} from './quest-commands';
import { waitCommand } from './wait';
import {
  disableNotifications,
  enableNotifications,
  notifyPlugin,
} from './notify';
import { clearDialogPlugin } from './clear_dialog';
import { ifCommand } from './if';
import {
  andPlugin,
  equalPlugin,
  greaterOrEqualPlugin,
  greaterThanPlugin,
  lesserOrEqualPlugin,
  lesserThanPlugin,
  notEqualPlugin,
  notPlugin,
  orPlugin,
  ternaryPlugin,
} from './logic-command';
import {
  absPlugin,
  additionPlugin,
  divisionPlugin,
  multiplicationPlugin,
  negPlugin,
  substractionPlugin,
} from './arithmetic-commands';
import { choicePlugin, choicePromptCommandPlugin } from './choice';
import { textFieldPlugin, textFieldPromptPlugin } from './text-field';
import {
  randomFloatPlugin,
  randomFromArgsPlugin,
  randomFromArrayPlugin,
  randomIntPlugin,
} from './random-commands';
import {
  stringConcatPlugin,
  stringJoinPlugin,
  stringSplitPlugin,
} from './string-commands';
import {
  ceilPlugin,
  clampPlugin,
  floorPlugin,
  maxPlugin,
  minPlugin,
  powPlugin,
  roundPlugin,
  sqrtPlugin,
} from './math-commands';
import {
  createObjectCommand,
  createSpriteCommand,
  deleteSpriteCommand,
  emptySpritesCommand,
} from './sprite-commands';
import {
  arrayEntriesCommand,
  arrayEveryCommand,
  arrayFilterCommand,
  arrayFindCommand,
  arrayFindIndexCommand,
  arrayMapCommand,
  arrayReduceCommand,
  arraySomeCommand,
  concatCommand,
  includesCommand,
  joinCommand,
  popCommand,
  pushCommand,
  reverseCommand,
  shiftCommand,
  shuffleCommand,
  sliceCommand,
  spliceCommand,
  unshiftCommand,
} from './array-commands';
import {
  animatePlugin,
  animateWaitPlugin,
  changeGameCharacterPlugin,
  changePlayerCharacterPlugin,
  jsonDecode,
  jsonEncode,
  loadDataPlugin,
  setDialogPanelMode,
} from './util-commands';
import {
  nowPlugin,
  sessionPlaytimePlugin,
  toDaysPlugin,
  toHoursPlugin,
  toMinutesPlugin,
  toSecondsPlugin,
  totalPlaytimePlugin,
} from './time-commands';
import {
  hasAchievementPlugin,
  unlockAchievement,
} from './achievements-commands';
import { getSettingPlugin, setSettingPlugin } from './settings-commands';
import {
  forInCommand,
  forOfCommand,
  objectEntriesCommand,
  objectHasCommand,
  objectKeysCommand,
  objectValuesCommand,
} from './object-commands';
import { createMacro, createMacroCommand } from '../macros';
import { changeSceneCommand } from './scene-commands';

export function registerBaseCommands(vm: VM) {
  // Choices
  vm.addCommand(choicePlugin);
  vm.addCommand(choicePromptCommandPlugin);

  vm.addCommand(ifCommand);

  // Stats
  vm.addCommand(addStatPlugin);
  vm.addCommand(setStatPlugin);
  vm.addCommand(getStatPlugin);
  vm.addCommand(showHud);
  vm.addCommand(hideHud);

  vm.addCommand(clearDialogPlugin);

  // Notifications
  vm.addCommand(notifyPlugin);
  vm.addCommand(disableNotifications);
  vm.addCommand(enableNotifications);

  // Audio
  vm.addCommand(pauseCommand);
  vm.addCommand(playCommand);
  vm.addCommand(resumeCommand);
  vm.addCommand(stopCommand);

  // Screens
  vm.addCommand(setButtonCommand);
  vm.addCommand(setScreenCommand);
  vm.addCommand(emptyLayerCommand);

  // Sprites
  vm.addCommand(createSpriteCommand);
  vm.addCommand(createObjectCommand);
  vm.addCommand(deleteSpriteCommand);
  vm.addCommand(emptySpritesCommand);

  vm.addCommand(waitCommand);

  // Logic operations
  vm.addCommand(equalPlugin);
  vm.addCommand(greaterThanPlugin);
  vm.addCommand(lesserThanPlugin);
  vm.addCommand(greaterOrEqualPlugin);
  vm.addCommand(lesserOrEqualPlugin);
  vm.addCommand(notEqualPlugin);
  vm.addCommand(notPlugin);
  vm.addCommand(andPlugin);
  vm.addCommand(orPlugin);
  vm.addCommand(ternaryPlugin);

  // Arithmetic operations
  vm.addCommand(additionPlugin);
  vm.addCommand(substractionPlugin);
  vm.addCommand(multiplicationPlugin);
  vm.addCommand(divisionPlugin);
  vm.addCommand(negPlugin);
  vm.addCommand(absPlugin);

  // Setting variables
  vm.addCommand(addPlugin);
  vm.addCommand(setCommand);

  // Text display
  vm.addCommand(textCommandPlugin);
  vm.addCommand(talkCommand);
  vm.addCommand(thinkCommand);

  // // functions and labels
  vm.addCommand(jumpCommand);
  vm.addCommand(runLabelPlugin);
  vm.addCommand(defineVariablePlugin);
  vm.addCommand(returnPlugin);
  vm.addCommand(logPlugin);
  vm.addCommand(returnMainMenuPlugin);
  vm.addCommand(savePlugin);
  vm.addCommand(resetGlobalPlugin);
  vm.addCommand(savePromptPlugin);
  vm.addCommand(newCommandPlugin);

  // // Quests
  vm.addCommand(startQuestPlugin);
  vm.addCommand(startObjectivePlugin);
  vm.addCommand(completeObjectivePlugin);
  vm.addCommand(completeQuestPlugin);
  vm.addCommand(questStartedPlugin);
  vm.addCommand(objectiveStartedPlugin);
  vm.addCommand(questCompletedPlugin);
  vm.addCommand(questSucceededPlugin);
  vm.addCommand(questFailedPlugin);
  vm.addCommand(getQuestEnding);
  vm.addCommand(questHasEnding);
  vm.addCommand(objectiveCompletedPlugin);

  // // Inventory
  vm.addCommand(addItemPlugin);
  vm.addCommand(removeItemPlugin);
  vm.addCommand(enableInteractionPlugin);
  vm.addCommand(disableInteractionPlugin);
  vm.addCommand(hasItemPlugin);
  vm.addCommand(itemAmountPlugin);
  // Skills
  vm.addCommand(addLevelPlugin);
  vm.addCommand(setLevelPlugin);
  vm.addCommand(addXpPlugin);
  vm.addCommand(rollPlugin);
  vm.addCommand(resetSkillCheck);
  vm.addCommand(getSkillCheckPlugin);
  vm.addCommand(getSkillCheckResultPlugin);
  vm.addCommand(getLevelPlugin);
  vm.addCommand(getXpPlugin);
  // Text Fields
  vm.addCommand(textFieldPlugin);
  vm.addCommand(textFieldPromptPlugin);

  // Random
  vm.addCommand(randomIntPlugin);
  vm.addCommand(randomFloatPlugin);
  vm.addCommand(randomFromArgsPlugin);
  vm.addCommand(randomFromArrayPlugin);

  // Strings
  vm.addCommand(stringConcatPlugin);
  vm.addCommand(stringJoinPlugin);
  vm.addCommand(stringSplitPlugin);

  // Maths
  vm.addCommand(minPlugin);
  vm.addCommand(maxPlugin);
  vm.addCommand(clampPlugin);
  vm.addCommand(floorPlugin);
  vm.addCommand(roundPlugin);
  vm.addCommand(ceilPlugin);
  vm.addCommand(sqrtPlugin);
  vm.addCommand(powPlugin);

  // Arrays
  vm.addCommand(shuffleCommand);
  vm.addCommand(pushCommand);
  vm.addCommand(popCommand);
  vm.addCommand(shiftCommand);
  vm.addCommand(unshiftCommand);
  vm.addCommand(joinCommand);
  vm.addCommand(concatCommand);
  vm.addCommand(includesCommand);
  vm.addCommand(reverseCommand);
  vm.addCommand(sliceCommand);
  vm.addCommand(spliceCommand);
  vm.addCommand(arrayFindIndexCommand);
  vm.addCommand(arrayFindCommand);
  vm.addCommand(arrayFilterCommand);
  vm.addCommand(arrayMapCommand);
  vm.addCommand(arrayReduceCommand);
  vm.addCommand(arraySomeCommand);
  vm.addCommand(arrayEveryCommand);
  vm.addCommand(arrayEntriesCommand);

  // Object commands
  vm.addCommand(objectKeysCommand);
  vm.addCommand(objectValuesCommand);
  vm.addCommand(objectEntriesCommand);
  vm.addCommand(objectHasCommand);

  // For commands
  vm.addCommand(forOfCommand);
  vm.addCommand(forInCommand);

  // Util commands
  vm.addCommand(loadDataPlugin);
  vm.addCommand(changePlayerCharacterPlugin);
  vm.addCommand(changeGameCharacterPlugin);
  vm.addCommand(jsonEncode);
  vm.addCommand(jsonDecode);
  vm.addCommand(setDialogPanelMode);
  vm.addCommand(animatePlugin);
  vm.addCommand(animateWaitPlugin);

  // Time commands
  vm.addCommand(nowPlugin);
  vm.addCommand(totalPlaytimePlugin);
  vm.addCommand(sessionPlaytimePlugin);
  vm.addCommand(toDaysPlugin);
  vm.addCommand(toHoursPlugin);
  vm.addCommand(toMinutesPlugin);
  vm.addCommand(toSecondsPlugin);

  // Achievements
  vm.addCommand(unlockAchievement);
  vm.addCommand(hasAchievementPlugin);

  // Settings
  vm.addCommand(setSettingPlugin);
  vm.addCommand(getSettingPlugin);

  // Macros
  vm.addCommand(createMacroCommand);

  // Scenes
  vm.addCommand(changeSceneCommand);
}
