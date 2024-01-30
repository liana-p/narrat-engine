import { ConfigInputWithCommon } from 'narrat';
export const gameConfig: ConfigInputWithCommon = {
  screens: {
    screens: {
      default: {
        background: '/placeholder-narrat-bg-darker.webp',
        buttons: ['replay'],
      },
    },
  },
  buttons: {
    buttons: {
      replay: {
        enabled: true,
        text: 'Replay',
        position: {
          left: 100,
          top: 100,
        },
        action: 'main',
        cssClass: 'replay-button',
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
      imagesPath: '/',
    },
    characters: {
      narrat: {
        name: 'Narrat',
        sprites: {
          idle: 'narrat-portrait.webp',
        },
      },
      game: {
        name: '',
        style: {
          color: 'white',
        },
        sprites: {
          idle: 'narrat-portrait.webp',
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
        width: 120,
        height: 175,
      },
    },
    dialogPanel: {
      overlayMode: true,
      rightOffset: 100,
      bottomOffset: 50,
      width: 600,
      height: 700,
    },
    hudStats: {},
  },
};
