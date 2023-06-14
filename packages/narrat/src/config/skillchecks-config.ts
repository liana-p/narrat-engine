import { Type, Static } from '@sinclair/typebox';

export const SkillCheckOptionsConfigSchema = Type.Object({
  diceRange: Type.Tuple([Type.Number(), Type.Number()]),
  diceCount: Type.Number(),
  difficultyText: Type.Array(Type.Tuple([Type.Number(), Type.String()])),
  extraPointsPerLevel: Type.Number(),
  successOnRollsBelowThreshold: Type.Boolean(),
});

export type SkillCheckOptionsConfig = Static<
  typeof SkillCheckOptionsConfigSchema
>;

export const SkillCheckConfigSchema = Type.Object({
  skill: Type.String(),
  difficulty: Type.Number(),
  hideAfterRoll: Type.Optional(Type.Boolean()),
  repeatable: Type.Optional(Type.Boolean()),
});
export type SkillCheckConfig = Static<typeof SkillCheckConfigSchema>;

export const SkillChecksInputConfigSchema = Type.Object({
  options: SkillCheckOptionsConfigSchema,
  skillChecks: Type.Record(Type.String(), SkillCheckConfigSchema),
});
export type SkillChecksInputConfig = Static<
  typeof SkillChecksInputConfigSchema
>;
export const SkillChecksConfigSchema = SkillChecksInputConfigSchema;
export type SkillChecksConfig = Static<typeof SkillChecksConfigSchema>;
export const defaultSkillChecksConfig: SkillChecksConfig = {
  options: {
    diceRange: [1, 6],
    extraPointsPerLevel: 1,
    diceCount: 2,
    successOnRollsBelowThreshold: false,
    difficultyText: [
      [2, 'Very Easy'],
      [4, 'Easy'],
      [6, 'Medium'],
      [8, 'Hard'],
      [10, 'Very Hard'],
      [11, 'Extremely Hard'],
      [12, 'Near Impossible'],
    ],
  },
  skillChecks: {},
};
