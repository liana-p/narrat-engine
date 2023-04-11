import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import {
  AchievementsSetupConfig,
  useAchievements,
} from '../achievements-store';
import { mockConfig } from '@/tests/mock-config';
import cloneDeep from 'clone-deep';
import { useConfig } from '@/stores/config-store';

const mockData: AchievementsSetupConfig = {
  normalAchievement: {
    id: 'normalAchievement',
    name: 'Normal Achievement',
    description: 'This is a normal achievement',
    icon: 'normal',
  },
  secretAchievement: {
    id: 'secretAchievement',
    name: 'Secret Achievement',
    description: 'This is a secret achievement',
    icon: 'secret',
  },
};

const mockAchievementsConfig = {
  achievements: mockData,
};

describe('Achievements Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const config = cloneDeep(mockConfig);
    config.achievements = mockAchievementsConfig;
    useConfig().setConfig(config);
  });

  it('generateSaveData: generates the save data', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    const unlockTime = new Date().toISOString();
    achievements.unlock('normalAchievement');
    expect(achievements.generateSaveData()).toEqual({
      achievements: {
        normalAchievement: {
          id: 'normalAchievement',
          unlocked: true,
          unlockTime,
        },
        secretAchievement: {
          id: 'secretAchievement',
          unlocked: false,
        },
      },
    });
  });

  it('setupAchievements: sets up the achievements when passed for configuration', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    expect(achievements.achievements).toEqual({
      normalAchievement: {
        id: 'normalAchievement',
        unlocked: false,
      },
      secretAchievement: {
        id: 'secretAchievement',
        unlocked: false,
      },
    });
  });

  it('reset: resets the achievements when passed for configuration', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    achievements.unlock('normalAchievement');
    achievements.reset(mockData);
    expect(achievements.achievements).toEqual({
      normalAchievement: {
        id: 'normalAchievement',
        unlocked: false,
      },
      secretAchievement: {
        id: 'secretAchievement',
        unlocked: false,
      },
    });
  });
});
