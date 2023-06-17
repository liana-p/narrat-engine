import { Type, Static } from '@sinclair/typebox';

export const CustomSettingGenericSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
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

export const CustomSettingSchema = Type.Union([
  CustomSettingsNumberSchema,
  CustomSettingsIntegerSchema,
  CustomSettingsBooleanSchema,
  CustomSettingsStringSchema,
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
export const SettingsConfigSchema = Type.Object({
  customSettings: Type.Optional(
    Type.Record(Type.String(), CustomSettingSchema),
  ),
});
export type SettingsConfig = Static<typeof SettingsConfigSchema>;
