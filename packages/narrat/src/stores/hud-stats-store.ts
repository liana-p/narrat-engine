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

// Create a pinia store named hud with a state using the type HudState, and save type HudSave, with actions:
// setupHudStats(stats: { [key: string]: HudStatConfig }): Iterates the stats argument to add new stats to the state
// setStat(stat: string, value: number): Sets the value of a stat
// addStat(stat: string, value: number): Adds a value to a stat
// generateSaveData(): Function that generates a HudSave object from the data in the state
// loadSaveData(data: HudSave): Function that loads the data into the state
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
