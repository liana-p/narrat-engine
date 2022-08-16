import { Type, Static } from '@sinclair/typebox';

export const LayoutConfigSchema = Type.Object({
  dialogPanel: Type.Optional(
    Type.Object({
      overlayMode: Type.Optional(Type.Boolean()),
      rightOffset: Type.Optional(Type.Number()),
      bottomOffset: Type.Optional(Type.Number()),
      width: Type.Optional(Type.Number()),
      height: Type.Optional(Type.Number()),
    }),
  ),
  backgrounds: Type.Object({
    width: Type.Number(),
    height: Type.Number(),
  }),
  dialogBottomPadding: Type.Number(),
  minTextWidth: Type.Optional(Type.Number()),
  verticalLayoutThreshold: Type.Number(),
  portraits: Type.Object({
    width: Type.Number(),
    height: Type.Number(),
    offset: Type.Optional(
      Type.Object({
        landscape: Type.Optional(
          Type.Object({
            right: Type.Number(),
            bottom: Type.Number(),
          }),
        ),
        portrait: Type.Optional(
          Type.Object({
            right: Type.Number(),
            bottom: Type.Number(),
          }),
        ),
      }),
    ),
  }),
});
export type LayoutConfig = Static<typeof LayoutConfigSchema>;
