import { Static, Type } from '@sinclair/typebox';

export const ChoicePromptConfigSchema = Type.Object({
  cssClass: Type.Optional(Type.String()),
  textTemplate: Type.Optional(Type.String()),
});
export type ChoicePromptConfig = Static<typeof ChoicePromptConfigSchema>;

export const ChoicesFileConfigSchema = Type.Object({
  choiceTextTemplate: Type.Optional(Type.String()),
  choicePrompts: Type.Record(Type.String(), ChoicePromptConfigSchema),
});
export type ChoicesFileConfig = Static<typeof ChoicesFileConfigSchema>;
export const defaultChoicesConfig: ChoicesFileConfig = {
  choicePrompts: {},
};
