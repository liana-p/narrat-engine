import { Type, Static } from '@sinclair/typebox';

export const TooltipsConfigSchema = Type.Object({
  options: Type.Object({
    delay: Type.Optional(Type.Number()),
    width: Type.Number(),
  }),
  keywords: Type.Array(
    Type.Object({
      keyword: Type.String(),
      title: Type.String(),
      description: Type.String(),
    }),
  ),
});
export type TooltipsConfig = Static<typeof TooltipsConfigSchema>;
export const defaultTooltipsConfig = {
  options: {
    delay: 0,
    width: 300,
  },
  keywords: [],
};
