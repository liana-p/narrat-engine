import { Type, Static } from '@sinclair/typebox';

export const TooltipsConfigSchema = Type.Object({
  options: Type.Object({
    delay: Type.Optional(Type.Number()),
    width: Type.Number(),
    keywordsPrefix: Type.String(),
    screenEdgesMinimumMargin: Type.Optional(Type.Number()),
  }),
  tooltips: Type.Array(
    Type.Object({
      keywords: Type.Array(Type.String()),
      title: Type.String(),
      description: Type.String(),
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
