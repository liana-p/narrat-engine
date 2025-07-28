import { Type, Static } from '@sinclair/typebox';

export type PresentationType = 'slider' | 'checkbox' | 'text' | 'dropdown' | 'cycle';

export const ChoiceOptionSchema = Type.Object({
  value: Type.Union([Type.String(), Type.Number()]),
  label: Type.String(),
});
export type ChoiceOption = Static<typeof ChoiceOptionSchema>;

export const CustomSettingGenericSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  presentation: Type.Optional(Type.Union([
    Type.Literal('slider'),
    Type.Literal('checkbox'), 
    Type.Literal('text'),
    Type.Literal('dropdown'),
    Type.Literal('cycle')
  ])),
  liveUpdate: Type.Optional(Type.Boolean()),
});

export const CustomSettingsNumberSchema = Type.Intersect([
  CustomSettingGenericSchema,
  Type.Object({
    type: Type.Literal('number'),
    defaultValue: Type.Number(),
    step: Type.Number(),
    minValue: Type.Number(),
    maxValue: Type.Number(),
  }),
]);
export type CustomSettingsNumber = Static<typeof CustomSettingsNumberSchema>;

export const CustomSettingsIntegerSchema = Type.Intersect([
  CustomSettingGenericSchema,
  Type.Object({
    type: Type.Literal('integer'),
    defaultValue: Type.Number(),
    step: Type.Number(),
    minValue: Type.Number(),
    maxValue: Type.Number(),
  }),
]);
export type CustomSettingsInteger = Static<typeof CustomSettingsIntegerSchema>;

export const CustomSettingsBooleanSchema = Type.Intersect([
  CustomSettingGenericSchema,
  Type.Object({
    type: Type.Literal('boolean'),
    defaultValue: Type.Boolean(),
  }),
]);
export type CustomSettingsBoolean = Static<typeof CustomSettingsBooleanSchema>;

export const CustomSettingsStringSchema = Type.Intersect([
  CustomSettingGenericSchema,
  Type.Object({
    type: Type.Literal('string'),
    defaultValue: Type.String(),
  }),
]);
export type CustomSettingsString = Static<typeof CustomSettingsStringSchema>;

export const CustomSettingsChoiceSchema = Type.Intersect([
  CustomSettingGenericSchema,
  Type.Object({
    type: Type.Literal('choice'),
    defaultValue: Type.Union([Type.String(), Type.Number()]),
    choices: Type.Array(ChoiceOptionSchema),
  }),
]);
export type CustomSettingsChoice = Static<typeof CustomSettingsChoiceSchema>;

export const CustomSettingSchema = Type.Union([
  CustomSettingsNumberSchema,
  CustomSettingsIntegerSchema,
  CustomSettingsBooleanSchema,
  CustomSettingsStringSchema,
  CustomSettingsChoiceSchema,
]);
export type CustomSetting = Static<typeof CustomSettingSchema>;
export function isSettingNumber(
  setting: CustomSetting,
): setting is CustomSettingsNumber {
  return setting.type === 'number';
}
export function isSettingInteger(
  setting: CustomSetting,
): setting is CustomSettingsInteger {
  return setting.type === 'integer';
}
export function isSettingBoolean(
  setting: CustomSetting,
): setting is CustomSettingsBoolean {
  return setting.type === 'boolean';
}
export function isSettingString(
  setting: CustomSetting,
): setting is CustomSettingsString {
  return setting.type === 'string';
}
export function isSettingChoice(
  setting: CustomSetting,
): setting is CustomSettingsChoice {
  return setting.type === 'choice';
}

export function getSettingPresentation(setting: CustomSetting): PresentationType {
  if (setting.presentation) {
    return setting.presentation;
  }
  
  // Default presentations based on type
  switch (setting.type) {
    case 'number':
    case 'integer':
      return 'slider';
    case 'boolean':
      return 'checkbox';
    case 'string':
      return 'text';
    case 'choice':
      return 'dropdown';
    default:
      return 'text';
  }
}
export const SettingsConfigSchema = Type.Object({
  customSettings: Type.Optional(
    Type.Record(Type.String(), CustomSettingSchema),
  ),
});
export type SettingsConfig = Static<typeof SettingsConfigSchema>;
