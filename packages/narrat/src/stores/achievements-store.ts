// create a pinia store named achievements with a state containing achievements and actions to add and delete achievements

import { AchievementConfig } from '@/config/achievements-config';
import { deepCopy } from '@/utils/data-helpers';
import { defineStore } from 'pinia';
import { getAchievementConfig, getAchievementsConfig } from '../config';
import { useNotifications } from './notification-store';
import { error } from '@/utils/error-handling';

export interface AchievementState {
  id: string;
  unlocked: boolean;
  unlockTime?: string;
}

export interface AchievementsState {
  /** Note: Achievements are an object so that it's easy to access specific achievements in game scripts.
   * One side effect of this is that the order achievements appear in isn't technicaclly guaranteed.
   * It also means there can only be one "stack" of an achievement at a time */
  achievements: { [key: string]: AchievementState };
}

export type AchievementsSave = AchievementsState;

export interface AchievementsSetupConfig {
  [key: string]: AchievementConfig;
}
export const useAchievements = defineStore('achievements', {
  state: (): AchievementsState => ({
    achievements: {},
  }),
  actions: {
    generateSaveData(): AchievementsSave {
      return {
        achievements: deepCopy(this.achievements),
      };
    },
    loadSaveData(save: AchievementsSave) {
      this.achievements = {
        ...this.achievements,
        ...deepCopy(save.achievements),
      };
    },
    setupAchievements(achievements: AchievementsSetupConfig) {
      Object.keys(achievements).forEach((key) => {
        this.achievements[key] = {
          id: key,
          unlocked: false,
        };
      });
    },
    reset(achievements: AchievementsSetupConfig) {
      this.$reset();
      this.setupAchievements(achievements);
    },
    hasAchievement(achievementId: string): boolean {
      return this.achievements[achievementId]?.unlocked ?? false;
    },
    getExistingAchievement(id: string): AchievementState | undefined {
      return this.achievements[id];
    },
    unlock(achievement: string) {
      const existingAchievement = this.getExistingAchievement(achievement);
      if (!existingAchievement) {
        error(
          `Tried to unlock achievement ${achievement} but it doesn't exist`,
        );
        return;
      }
      if (!existingAchievement.unlocked) {
        const unlockTime = new Date().toISOString();
        existingAchievement.unlocked = true;
        existingAchievement.unlockTime = unlockTime;
      }
      if (getAchievementsConfig().notifyNewAchievements) {
        const conf = getAchievementConfig(achievement);
        useNotifications().addNotification(
          `New Achievement: ${conf.name}`,
          conf.description,
          conf.icon,
        );
      }
    },
  },
});
