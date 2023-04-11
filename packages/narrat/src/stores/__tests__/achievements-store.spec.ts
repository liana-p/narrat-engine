import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  AchievementsSetupConfig,
  useAchievements,
} from '../achievements-store';
import { mockConfig } from '@/tests/mock-config';
import cloneDeep from 'clone-deep';
import { useConfig } from '@/stores/config-store';
import { useNotifications } from '../notification-store';

const unlockTime = new Date(2023, 4, 1);

const mockData: AchievementsSetupConfig = {
  normalAchievement: {
    name: 'Normal Achievement',
    description: 'This is a normal achievement',
    icon: 'normal',
  },
  secretAchievement: {
    name: 'Secret Achievement',
    description: 'This is a secret achievement',
    icon: 'secret',
  },
};

describe('Achievements Store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(unlockTime);
    setActivePinia(createPinia());
    const config = cloneDeep(mockConfig);
    config.achievements.achievements = mockData;
    useConfig().setConfig(config);
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it('loadSaveData: loads the save data', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    achievements.unlock('normalAchievement');
    const saveData = achievements.generateSaveData();
    achievements.reset(mockData);
    achievements.loadSaveData(saveData);
    expect(achievements.achievements).toEqual({
      normalAchievement: {
        id: 'normalAchievement',
        unlocked: true,
        unlockTime: unlockTime.toISOString(),
      },
      secretAchievement: {
        id: 'secretAchievement',
        unlocked: false,
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

  it('hasAchievement: returns true if the achievement is unlocked', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    achievements.unlock('normalAchievement');
    expect(achievements.hasAchievement('normalAchievement')).toBe(true);
  });

  it('hasAchievement: returns false if the achievement is not unlocked', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    expect(achievements.hasAchievement('normalAchievement')).toBe(false);
  });

  it('getExistingAchievement: returns the achievement if it exists', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    expect(achievements.getExistingAchievement('normalAchievement')).toEqual({
      id: 'normalAchievement',
      unlocked: false,
    });
  });

  it('unlock: unlocks the achievement', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    achievements.unlock('normalAchievement');
    expect(achievements.hasAchievement('normalAchievement')).toBe(true);
  });
  it('unlock: sends a notification if the option is enabled', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    const config = useConfig().config;
    config.achievements.notifyNewAchievements = true;
    useConfig().setConfig(config);
    const notifications = useNotifications();
    const spy = vi.spyOn(notifications, 'addNotification');
    achievements.unlock('normalAchievement');
    expect(spy).toHaveBeenCalled();
  });
  it('unlock: does not send a notification if the option is disabled', () => {
    const achievements = useAchievements();
    achievements.setupAchievements(mockData);
    const config = useConfig().config;
    config.achievements.notifyNewAchievements = false;
    useConfig().setConfig(config);
    const notifications = useNotifications();
    const spy = vi.spyOn(notifications, 'addNotification');
    achievements.unlock('normalAchievement');
    expect(spy).not.toHaveBeenCalled();
  });
});
