import { Theme } from 'narrat';
import JrpgCss from './jrpg.css?inline';

export const jrpgTheme: Theme = {
  id: 'jrpg',
  css: JrpgCss,
  extendedConfig: {
    dialogPanel: {
      width: 1200,
      height: 300,
      rightOffset: 50,
      bottomOffset: 50,
    },
    layout: {
      portraits: {
        width: 200,
        height: 300,
        offset: {
          landscape: {
            right: -700,
            bottom: 200,
          },
          portrait: {
            right: 10,
            bottom: 0,
          },
        },
      },
    },
  },
} as Theme;
