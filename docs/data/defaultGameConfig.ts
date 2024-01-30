import { ConfigInputWithCommon } from 'narrat';
export const gameConfig: ConfigInputWithCommon = {
  screens: {
    screens: {
      default: {
        background: '@empty',
      },
    },
  },
  skills: {},
  audio: {
    files: {},
    audioTriggers: {},
    options: {
      volume: 1,
      musicFadeInTime: 0,
      musicFadeOutTime: 0,
      musicFadeInDelay: 0,
    },
  },
  characters: {
    config: {
      imagesPath: './img/characters',
    },
    characters: {
      game: {
        name: '',
        style: {
          color: 'white',
        },
      },
      player: {
        name: 'You',
        style: {
          color: 'orange',
        },
      },
    },
  },
  common: {
    gameTitle: 'Docs demo',
    saveFileName: 'docs-demo',
    layout: {
      backgrounds: {
        width: 1280,
        height: 720,
      },
      dialogBottomPadding: 70,
      verticalLayoutThreshold: 600,
      portraits: {
        width: 100,
        height: 100,
      },
    },
    hudStats: {},
  },
};
