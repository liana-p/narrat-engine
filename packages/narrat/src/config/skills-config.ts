import { Type, Static } from '@sinclair/typebox';
import { SkillCheckOptionsConfigSchema } from './skillchecks-config';

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

export const SkillsConfigSchema = Type.Object({
  skills: SkillsListConfigSchema,
  skillOptions: SkillOptionsSchema,
});
export type SkillsConfig = Static<typeof SkillsConfigSchema>;

export const SkillsInputConfigSchema = Type.Object({
  skills: Type.Optional(SkillsListConfigSchema),
  skillOptions: Type.Optional(SkillOptionsSchema),
});
export type SkillsInputConfig = Static<typeof SkillsInputConfigSchema>;

export const defaultSkillsConfig: SkillsConfig = {
  skills: {},
  skillOptions: {
    xpPerLevel: 10,
    notifyLevelUp: true,
  },
};
