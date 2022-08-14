import { Config } from './config';

export const defaultConfig: Config = {
  gameTitle: 'Narrat Game Example',
  images: {
    narrat: 'img/backgrounds/narrat.png',
  },
  layout: {
    backgrounds: {
      width: 880,
      height: 720,
    },
    dialogBottomPadding: 70,
    minTextWidth: 475,
    mobileDialogHeightPercentage: 60,
    verticalLayoutThreshold: 600,
    portraits: {
      width: 100,
      height: 100,
    },
  },
  dialoguePanel: {
    textSpeed: 30,
    animateText: true,
    timeBetweenLines: 100,
  },
  gameFlow: {},
  splashScreens: {},
  screens: {
    default: {
      background: 'narrat',
      buttons: [],
    },
    map: {
      background: 'map',
      buttons: ['shopButton', 'parkButton'],
    },
  },
  buttons: {},
  skills: {},
  skillOptions: {
    xpPerLevel: 10,
    notifyLevelUp: true,
  },
  transitions: {},
  skillChecks: {
    rollRange: 100,
    skillMultiplier: 10,
    failureChance: 1,
    difficultyText: [
      [0, 'Very Easy'],
      [10, 'Easy'],
      [30, 'Medium'],
      [50, 'Hard'],
      [70, 'Very Hard'],
      [80, 'Extremely Hard'],
      [90, 'Near Impossible'],
    ],
  },
  scripts: ['data/example.nar'],
  audio: {},
  audioOptions: {
    volume: 0.5,
    musicFadeInTime: 0.5,
    musicFadeInDelay: 0.5,
    musicFadeOutTime: 0.5,
  },
  notifications: {
    timeOnScreen: 3,
    alsoPrintInDialogue: false,
  },
  hudStats: {},
  items: {
    categories: [
      {
        id: 'default',
        title: 'Items',
      },
    ],
    items: {},
  },
  interactionTags: {
    default: {
      onlyInteractOutsideOfScripts: true,
    },
  },
  quests: {},
  audioTriggers: {},
  menuButtons: {},
  debugging: {
    showScriptFinishedMessage: true,
  },
  saves: {
    mode: 'manual',
    slots: 10,
  },
};
