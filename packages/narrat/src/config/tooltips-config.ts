import { Type, Static } from '@sinclair/typebox';

export const TooltipStylingSchema = Type.Object({
  cssClass: Type.Optional(Type.String()),
  textCssClass: Type.Optional(Type.String()),
  titleCssClass: Type.Optional(Type.String()),
});
export type TooltipStyling = Static<typeof TooltipStylingSchema>;
export const TooltipsConfigSchema = Type.Object({
  options: Type.Object({
    delay: Type.Optional(Type.Number()),
    width: Type.Number(),
    keywordsPrefix: Type.String(),
    keywordsSuffix: Type.Optional(Type.String()),
    screenEdgesMinimumMargin: Type.Optional(Type.Number()),
    styling: Type.Optional(TooltipStylingSchema),
    // Old system had a prefix and no suffix
    useNewSystem: Type.Optional(Type.Boolean()),
  }),
  tooltips: Type.Array(
    Type.Object({
      keywords: Type.Array(Type.String()),
      title: Type.String(),
      description: Type.String(),
      styling: Type.Optional(TooltipStylingSchema),
    }),
  ),
});
export type TooltipsConfig = Static<typeof TooltipsConfigSchema>;
export const defaultTooltipsConfig: TooltipsConfig = {
  options: {
    delay: 0,
    width: 350,
    keywordsPrefix: '@@',
  },
  tooltips: [],
};
