import { Type, Static } from '@sinclair/typebox';

export const ButtonConfigSchema = Type.Object({
  enabled: Type.Boolean(),
  background: Type.Optional(Type.String()),
  text: Type.Optional(Type.String()),
  cssClass: Type.Optional(Type.String()),
  position: Type.Object({
    left: Type.Number(),
    top: Type.Number(),
    width: Type.Optional(Type.Number()),
    height: Type.Optional(Type.Number()),
  }),
  anchor: Type.Optional(
    Type.Object({
      x: Type.Number(),
      y: Type.Number(),
    }),
  ),
  action: Type.String(),
  actionType: Type.Optional(Type.String()),
  tag: Type.Optional(Type.String()),
});
export type ButtonConfig = Static<typeof ButtonConfigSchema>;

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

export const ScreensConfigSchema = Type.Record(
  Type.String(),
  ScreenConfigSchema,
);
export type ScreensConfig = Static<typeof ScreensConfigSchema>;

export const defaultScreensConfig: ScreensConfig = {};
