import { Static, Type } from '@sinclair/typebox';

export const ChoicePromptConfigSchema = Type.Object({
  cssClass: Type.Optional(Type.String()),
  textTemplate: Type.Optional(Type.String()),
});
export type ChoicePromptConfig = Static<typeof ChoicePromptConfigSchema>;

export const ChoicePromptListSchema = Type.Record(
  Type.String(),
  ChoicePromptConfigSchema,
);
export type ChoicePromptList = Static<typeof ChoicePromptListSchema>;

export const ChoicesConfigSchema = Type.Object({
  choiceTextTemplate: Type.String(),
  choicePrompts: ChoicePromptListSchema,
});

export type ChoicesConfig = Static<typeof ChoicesConfigSchema>;

export const ChoicesInputConfigSchema = Type.Object({
  choiceTextTemplate: Type.Optional(Type.String()),
  choicePrompts: Type.Optional(ChoicePromptListSchema),
});
export type ChoicesInputConfig = Static<typeof ChoicesInputConfigSchema>;

export const defaultChoicesConfig: ChoicesConfig = {
  choicePrompts: {},
  choiceTextTemplate:
    '<span class="choice-index">%{$index}. </span> <span class="choice-text">%{$choice}</span>',
};
