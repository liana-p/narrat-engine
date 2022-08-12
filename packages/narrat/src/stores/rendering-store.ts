import { aspectRatioFit } from '@/utils/helpers';
import { defineStore } from 'pinia';
import { getConfig } from '../config';

export interface RenderingState {
  screenWidth: number;
  screenHeight: number;
  layoutMode: 'horizontal' | 'vertical';
}

// Generate a pinia store named rendering with a state using the type RenderingState, with actions:
// updateScreenSize(width: number, height: number, textWidth: number): Updates the screen size
export const useRenderingStore = defineStore('rendering', {
  state: () =>
    ({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      layoutMode: 'horizontal',
    } as RenderingState),
  actions: {
    updateScreenSize(width: number, height: number) {
      this.screenHeight = height;
      this.screenWidth = width;
      if (width < getConfig().layout.verticalLayoutThreshold) {
        this.layoutMode = 'vertical';
        document.querySelector('html')!.style.fontSize = '40px';
      } else {
        this.layoutMode = 'horizontal';
        document.querySelector('html')!.style.fontSize = '16px';
      }
    },
  },
  getters: {
    gameScaleRatio(state: RenderingState): number {
      const config = getConfig();
      const ratio = aspectRatioFit(
        this.screenWidth,
        this.screenHeight,
        this.gameWidth,
        this.gameHeight,
      );
      return ratio;
    },
    overlayMode(state: RenderingState): boolean {
      if (
        getConfig()?.layout?.dialogPanel?.overlayMode &&
        state.layoutMode === 'horizontal'
      ) {
        return true;
      }
      return false;
    },
    gameWidth(): number {
      const config = getConfig();
      if (this.layoutMode === 'vertical' || this.overlayMode) {
        return config.layout.backgrounds.width;
      } else {
        return config.layout.backgrounds.width + config.layout.minTextWidth;
      }
    },
    gameHeight(): number {
      const config = getConfig();
      if (this.layoutMode === 'vertical') {
        return config.layout.backgrounds.height;
      } else {
        return config.layout.backgrounds.height;
      }
    },
    dialogWidth(): number {
      if (this.layoutMode === 'vertical') {
        return this.viewportWidth;
      } else {
        const width =
          getConfig().layout.dialogPanel?.width ??
          getConfig().layout.minTextWidth ??
          400;
        return width;
      }
    },
    dialogHeight(): number {
      if (this.layoutMode === 'vertical') {
        return this.actualGameHeight - this.gameHeight;
      } else {
        return getConfig().layout.dialogPanel?.height ?? this.gameHeight;
      }
    },
    actualGameHeight(): number {
      let height = this.gameHeight;
      if (this.layoutMode === 'vertical') {
        height = this.screenHeight / this.gameScaleRatio;
      }
      return height;
    },
    viewportRatio(state: RenderingState): number {
      if (this.layoutMode === 'vertical') {
        const conf = getConfig().layout.backgrounds;
        return state.screenWidth / conf.width;
      }
      return 1;
    },
    viewportHeight(state: RenderingState): number {
      return getConfig().layout.backgrounds.height * this.viewportRatio;
    },
    viewportWidth(state: RenderingState): number {
      return getConfig().layout.backgrounds.width * this.viewportRatio;
    },
  },
});
