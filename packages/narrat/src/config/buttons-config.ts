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

export const ButtonsConfigSchema = Type.Record(
  Type.String(),
  ButtonConfigSchema,
);
export type ButtonsConfig = Static<typeof ButtonsConfigSchema>;

export const defaultButtonsConfig: ButtonsConfig = {};
