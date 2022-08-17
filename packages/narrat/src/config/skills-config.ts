import { Type, Static } from '@sinclair/typebox';

export const SkillConfigSchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  startingLevel: Type.Number(),
  hidden: Type.Optional(Type.Boolean()),
  icon: Type.String(),
});
export type SkillConfig = Static<typeof SkillConfigSchema>;

export const SkillsListConfigSchema = Type.Record(
  Type.String(),
  SkillConfigSchema,
);
export type SkillsListConfig = Static<typeof SkillsListConfigSchema>;

export const SkillOptionsSchema = Type.Object({
  xpPerLevel: Type.Number(),
  notifyLevelUp: Type.Boolean(),
});
export type SkillOptions = Static<typeof SkillOptionsSchema>;

export const SkillChecksConfigSchema = Type.Object({
  rollRange: Type.Number(),
  skillMultiplier: Type.Number(),
  failureChance: Type.Number(),
  difficultyText: Type.Array(Type.Tuple([Type.Number(), Type.String()])),
});
export type SkillChecksConfig = Static<typeof SkillChecksConfigSchema>;

export const SkillsConfigSchema = Type.Object({
  skills: SkillsListConfigSchema,
  skillChecks: SkillChecksConfigSchema,
  skillOptions: SkillOptionsSchema,
});
export type SkillsConfig = Static<typeof SkillsConfigSchema>;

export const SkillsInputConfigSchema = Type.Object({
  skills: Type.Optional(SkillsListConfigSchema),
  skillChecks: Type.Optional(SkillChecksConfigSchema),
  skillOptions: Type.Optional(SkillOptionsSchema),
});
export type SkillsInputConfig = Static<typeof SkillsInputConfigSchema>;

export const defaultSkillsConfig: SkillsConfig = {
  skills: {},
  skillChecks: {
    rollRange: 100,
    skillMultiplier: 10,
    failureChance: 1,
    difficultyText: [
      [0, 'Very Easy'],
      [10, 'Easy'],
      [30, 'Medium'],
      [50, 'Hard'],
      [70, 'Very Hard'],
      [80, 'Extremely Hard'],
      [90, 'Near Impossible'],
    ],
  },
  skillOptions: {
    xpPerLevel: 10,
    notifyLevelUp: true,
  },
};
