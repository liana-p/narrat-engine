import { Theme } from '../NarratThemesPlugin';
import TextOnlyThemeCSS from './text-only.css?inline';
export const textOnlyTheme: Theme = {
  id: 'narrat-text-only',
  css: TextOnlyThemeCSS,
  extendedConfig: {
    dialogPanel: {
      textSpeed: 30,
      animateText: true,
      timeBetweenLines: 100,
      overlayMode: true,
      rightOffset: 300,
      bottomOffset: 150,
      width: 700,
      height: 680,
    },
  },
};
