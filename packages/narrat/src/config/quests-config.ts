import { Static, Type } from '@sinclair/typebox';

export const ObjectiveDataSchema = Type.Object({
  description: Type.String(),
  hidden: Type.Optional(Type.Boolean()),
});
export type ObjectiveData = Static<typeof ObjectiveDataSchema>;

export const QuestDataSchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
  objectives: Type.Record(Type.String(), ObjectiveDataSchema),
});
export type QuestData = Static<typeof QuestDataSchema>;

export const QuestsListSchema = Type.Record(Type.String(), QuestDataSchema);
export type QuestsList = Static<typeof QuestsListSchema>;

export const QuestsConfigSchema = Type.Object({
  quests: QuestsListSchema,
});
export type QuestsConfig = Static<typeof QuestsConfigSchema>;

export const defaultQuestsConfig: QuestsConfig = {
  quests: {},
};
