import { Static, Type } from '@sinclair/typebox';
export const AchievementConfigSchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  icon: Type.Optional(Type.String()),
  lockedIcon: Type.Optional(Type.String()),
  secret: Type.Optional(Type.Boolean()),
  hidden: Type.Optional(Type.Boolean()),
  category: Type.Optional(Type.String()),
  extraData: Type.Optional(Type.Any()),
});

export type AchievementConfig = Static<typeof AchievementConfigSchema>;

export const AchievementCategorySchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
});

export type AchievementCategory = Static<typeof AchievementCategorySchema>;

export const AchievementsListSchema = Type.Record(
  Type.String(),
  AchievementConfigSchema,
);
export type AchievementsList = Static<typeof AchievementsListSchema>;

export const AchievementsConfigSchema = Type.Object({
  defaultAchievementIcon: Type.String(),
  categories: Type.Array(AchievementCategorySchema),
  achievements: AchievementsListSchema,
  notifyNewAchievements: Type.Boolean(),
  secretAchievements: Type.Optional(
    Type.Object({
      censorDescription: Type.Optional(Type.Boolean()),
      censorName: Type.Optional(Type.Boolean()),
      hideUntilObtained: Type.Optional(Type.Boolean()),
    }),
  ),
});
export type AchievementsConfig = Static<typeof AchievementsConfigSchema>;

export const AchievementsInputConfigSchema = Type.Object({
  categories: Type.Optional(Type.Array(AchievementCategorySchema)),
  achievements: Type.Optional(AchievementsListSchema),
});
export type AchievementsInputConfig = Static<
  typeof AchievementsInputConfigSchema
>;

export const defaultAchievementsConfig: AchievementsConfig = {
  categories: [
    {
      id: 'default',
      title: 'Achievements',
    },
  ],
  achievements: {},
  notifyNewAchievements: true,
  defaultAchievementIcon: 'img/achievements/trophy.png',
};
