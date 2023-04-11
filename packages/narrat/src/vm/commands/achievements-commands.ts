import { useAchievements } from '@/stores/achievements-store';
import { CommandPlugin } from './command-plugin';

export type AchievementIdArg = {
  id: string;
};

export const unlockAchievement = new CommandPlugin<AchievementIdArg>(
  'unlock_achievement',
  [{ name: 'id', type: 'string' }],
  async (cmd) => {
    const { id } = cmd.options;
    const achievements = useAchievements();
    achievements.unlock(id);
  },
);

export const hasAchievementPlugin = new CommandPlugin<AchievementIdArg>(
  'has_achievement?',
  [{ name: 'id', type: 'string' }],
  async (cmd) => {
    const { id } = cmd.options;
    const achievements = useAchievements();
    return achievements.hasAchievement(id);
  },
);
