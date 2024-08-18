import { aspectRatioFit } from '@/utils/helpers';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { getCommonConfig, getDialogPanelWidth } from '../config';
import { useMain } from './main-store';
import { useSettings } from './settings-store';
import { useScreens } from './screens-store';
import { debounce } from '@/utils/debounce';

export interface RenderingState {
  screenWidth: number;
  screenHeight: number;
  layoutMode: 'horizontal' | 'vertical';
  containerElement: HTMLElement | null;
  narratAppElement: HTMLElement | null;
  resizeObserver: ResizeObserver | null;
  dialogPanelMode: 'auto' | 'off' | 'on';
}

export type RenderingSaveData = Pick<RenderingState, 'dialogPanelMode'>;

export const useRenderingStore = defineStore('rendering', {
  state: () =>
    ({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      layoutMode: 'horizontal',
      resizeObserver: null,
      containerElement: null,
      narratAppElement: null,
      dialogPanelMode: 'auto',
    }) as RenderingState,
  actions: {
    generateSaveData(): RenderingSaveData {
      return {
        dialogPanelMode: this.dialogPanelMode,
      };
    },
    loadSaveData(saveData: RenderingSaveData) {
      this.dialogPanelMode = saveData.dialogPanelMode;
    },
    reset() {
      this.dialogPanelMode = 'auto';
    },
    updateScreenSize(width: number, height: number) {
      this.screenHeight = height;
      this.screenWidth = width;
      if (width < getCommonConfig().layout.verticalLayoutThreshold) {
        this.layoutMode = 'vertical';
        document.querySelector('html')!.style.fontSize =
          `${useSettings().baseSettings.fontSize ?? 40}px`;
      } else {
        this.layoutMode = 'horizontal';
        document.querySelector('html')!.style.fontSize =
          `${useSettings().baseSettings.fontSize ?? 16}px`;
      }
    },
    setContainer(container: HTMLElement) {
      this.containerElement = container;
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      this.resizeObserver = new ResizeObserver(
        debounce(
          () => {
            this.refreshScreenSize();
          },
          100,
          {
            maxWait: 200,
          },
        ),
      );
      this.resizeObserver.observe(container);
      this.refreshScreenSize();
    },
    refreshScreenSize() {
      const container = this.containerElement;
      if (container) {
        this.updateScreenSize(container.clientWidth, container.clientHeight);
      }
    },
  },
  getters: {
    gameScaleRatio(state: RenderingState): number {
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
        getCommonConfig().dialogPanel.overlayMode &&
        state.layoutMode === 'horizontal'
      ) {
        return true;
      }
      return false;
    },
    gameWidth(): number {
      const config = getCommonConfig();
      if (this.layoutMode === 'vertical' || this.overlayMode) {
        return config.layout.backgrounds.width;
      } else {
        return config.layout.backgrounds.width + getDialogPanelWidth();
      }
    },
    gameHeight(): number {
      const config = getCommonConfig();
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
        const width = getDialogPanelWidth();
        return width;
      }
    },
    dialogHeight(): number {
      if (this.layoutMode === 'vertical') {
        return this.actualGameHeight - this.gameHeight;
      } else {
        return getCommonConfig().dialogPanel.height ?? this.gameHeight;
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
        const conf = getCommonConfig().layout.backgrounds;
        return state.screenWidth / conf.width;
      }
      return 1;
    },
    viewportHeight(state: RenderingState): number {
      return getCommonConfig().layout.backgrounds.height * this.viewportRatio;
    },
    viewportWidth(state: RenderingState): number {
      return getCommonConfig().layout.backgrounds.width * this.viewportRatio;
    },
    showDialog(state: RenderingState): boolean {
      if (this.dialogPanelMode === 'on') {
        return true;
      } else if (this.dialogPanelMode === 'off') {
        return false;
      }
      if (!this.overlayMode || this.layoutMode === 'vertical') {
        return true;
      }
      const inDialogue = useMain().inScript;
      let result = true;
      if (
        useScreens().isTransitioning &&
        getCommonConfig().dialogPanel.hideDuringTransition
      ) {
        result = false;
      }
      if (!getCommonConfig().dialogPanel.showAfterScriptEnd && !inDialogue) {
        result = false;
      }
      return result;
    },
    container(): HTMLElement {
      if (this.containerElement) {
        return this.containerElement;
      } else {
        return document.body;
      }
    },
    inputsContainer(): HTMLElement {
      if (useMain().hasCustomContainer) {
        return this.container;
      } else {
        return window as any;
      }
    },
    narratApp(): HTMLElement {
      if (this.narratAppElement) {
        return this.narratAppElement;
      } else {
        return document.body;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRenderingStore, import.meta.hot));
}
