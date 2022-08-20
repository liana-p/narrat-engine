import { Type, Static } from '@sinclair/typebox';
import { ButtonConfigSchema } from './buttons-config';

export const InlineButtonConfigSchema = Type.Intersect([
  ButtonConfigSchema,
  Type.Object({
    id: Type.String(),
  }),
]);
export type InlineButtonConfig = Static<typeof InlineButtonConfigSchema>;

export const ScreenConfigSchema = Type.Object({
  background: Type.String(),
  buttons: Type.Optional(
    Type.Array(Type.Union([Type.String(), InlineButtonConfigSchema])),
  ),
});
export type ScreenConfig = Static<typeof ScreenConfigSchema>;

export const ScreensListSchema = Type.Record(Type.String(), ScreenConfigSchema);
export type ScreensList = Static<typeof ScreensListSchema>;

export const ScreensConfigSchema = Type.Object({
  screens: ScreensListSchema,
});
export type ScreensConfig = Static<typeof ScreensConfigSchema>;

export const ScreensInputConfigSchema = Type.Object({
  screens: Type.Optional(ScreensListSchema),
});
export type ScreensInputConfig = Static<typeof ScreensInputConfigSchema>;

export const defaultScreensConfig: ScreensConfig = {
  screens: {},
};
