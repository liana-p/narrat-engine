import { processText } from '@/utils/string-helpers';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { getTooltipConfig, tooltipsConfig } from '../config';

export interface TooltipState {
  title?: string;
  text: string;
  x: number;
  y: number;
  width: number;
}

export interface TooltipsState {
  tooltip: TooltipState | null;
}

export const useTooltips = defineStore('tooltips', {
  state: () => ({ tooltip: null }) as TooltipsState,
  actions: {
    addCustomTooltip(tooltip: TooltipState) {
      if (tooltip.title) {
        tooltip.title = processText(tooltip.title);
      }
      tooltip.text = processText(tooltip.text);
      this.tooltip = tooltip;
    },
    addTooltip(keyword: string, position?: { x: number; y: number }) {
      const config = getTooltipConfig(keyword);
      if (config) {
        this.addCustomTooltip({
          title: config.title,
          text: config.description,
          x: position?.x ?? window.screenX,
          y: position?.y ?? window.screenY,
          width: tooltipsConfig().options.width,
        });
      }
    },
    deleteTooltip() {
      this.tooltip = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTooltips, import.meta.hot));
}
