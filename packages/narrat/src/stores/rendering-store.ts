import { defineStore } from 'pinia';
import { getConfig } from '../config';

export interface RenderingState {
  screenWidth: number;
  screenHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  renderRatio: number;
  topOffset: number;
  leftOffset: number;
  layoutMode: 'horizontal' | 'vertical';
}

// Generate a pinia store named rendering with a state using the type RenderingState, with actions:
// updateScreenSize(width: number, height: number, textWidth: number): Updates the screen size
export const useRenderingStore = defineStore('rendering', {
  state: () =>
    ({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      renderRatio: 1,
      topOffset: 0,
      leftOffset: 0,
      layoutMode: 'horizontal',
    } as RenderingState),
  actions: {
    updateScreenSize(width: number, height: number, textWidth: number) {
      this.screenHeight = height;
      this.screenWidth = width;
      this.renderRatio = 1;
      this.topOffset = 0;
      this.leftOffset = 0;
      if (width < getConfig().layout.verticalLayoutThreshold) {
        this.layoutMode = 'vertical';
      } else {
        this.layoutMode = 'horizontal';
      }
    },
  },
});
