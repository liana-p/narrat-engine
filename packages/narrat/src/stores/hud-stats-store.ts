import { deepCopy } from '@/utils/data-helpers';
import deepmerge from 'deepmerge';
import { defineStore } from 'pinia';
import { HudStatConfig } from '../config';

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
    } as HudState),
  actions: {
    setupHudStats(stats: { [key: string]: HudStatConfig }) {
      for (const stat in stats) {
        this.hudStats[stat] = {
          value: stats[stat].startingValue,
        };
      }
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
