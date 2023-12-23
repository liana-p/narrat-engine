import { getHudStatConfig } from '@/config';
import { CommonConfig, HudStatsConfig } from '@/config/common-config';
import { deepCopy } from '@/utils/data-helpers';
import deepmerge from 'deepmerge';
import { acceptHMRUpdate, defineStore } from 'pinia';

export interface HudStatsState {
  [key: string]: HudStat;
}

export interface HudStat {
  value: number;
}
export interface HudState {
  hudStats: HudStatsState;
  visible: boolean;
}
export type HudSave = HudState;

export const useHud = defineStore('hud', {
  state: () =>
    ({
      hudStats: {},
      visible: true,
    }) as HudState,
  actions: {
    updateConfig(common: CommonConfig) {
      for (const stat in common.hudStats) {
        if (!this.hudStats[stat]) {
          this.hudStats[stat] = {
            value: common.hudStats[stat].startingValue,
          };
        }
      }
    },
    reset(common: CommonConfig) {
      this.$reset();
      this.updateConfig(common);
    },
    setStat(stat: string, value: number) {
      this.hudStats[stat].value = value;
      if (this.getStat(stat).value < (getHudStatConfig(stat).minValue ?? 0)) {
        this.hudStats[stat].value = getHudStatConfig(stat).minValue ?? 0;
      }
      if (
        this.getStat(stat).value > (getHudStatConfig(stat).maxValue ?? Infinity)
      ) {
        this.hudStats[stat].value = getHudStatConfig(stat).maxValue ?? Infinity;
      }
    },
    addStat(stat: string, value: number) {
      this.setStat(stat, this.getStatValue(stat) + value);
    },
    getStat(stat: string) {
      return this.hudStats[stat];
    },
    getStatValue(stat: string) {
      return this.hudStats[stat].value;
    },
    generateSaveData(): HudSave {
      return {
        hudStats: deepCopy(this.hudStats),
        visible: this.visible,
      };
    },
    loadSaveData(data: HudSave) {
      this.hudStats = deepmerge(this.hudStats, data.hudStats);
      this.visible = data.visible;
    },
    setVisibility(visible: boolean) {
      this.visible = visible;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHud, import.meta.hot));
}
