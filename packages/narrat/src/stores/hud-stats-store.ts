import { HudStatsConfig } from '@/config/common-config';
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
}
export type HudSave = HudState;

export const useHud = defineStore('hud', {
  state: () =>
    ({
      hudStats: {},
    }) as HudState,
  actions: {
    setupHudStats(stats: HudStatsConfig) {
      for (const stat in stats) {
        this.hudStats[stat] = {
          value: stats[stat].startingValue,
        };
      }
    },
    reset(stats: HudStatsConfig) {
      this.$reset();
      this.setupHudStats(stats);
    },
    setStat(stat: string, value: number) {
      this.hudStats[stat].value = value;
    },
    addStat(stat: string, value: number) {
      this.hudStats[stat].value += value;
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
      };
    },
    loadSaveData(data: HudSave) {
      this.hudStats = deepmerge(this.hudStats, data.hudStats);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHud, import.meta.hot));
}
