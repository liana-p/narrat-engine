import { Type, Static } from '@sinclair/typebox';

export const LayoutConfigSchema = Type.Object({
  backgrounds: Type.Object({
    width: Type.Number(),
    height: Type.Number(),
  }),
  dialogBottomPadding: Type.Union([Type.Number(), Type.String()]),
  minTextWidth: Type.Optional(Type.Number()),
  verticalLayoutThreshold: Type.Number(),
  defaultFontSize: Type.Optional(Type.Number()),
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

export const defaultLayoutConfig: LayoutConfig = {
  backgrounds: {
    width: 880,
    height: 720,
  },
  dialogBottomPadding: 70,
  verticalLayoutThreshold: 600,
  defaultFontSize: 16,
  portraits: {
    width: 100,
    height: 100,
  },
};
