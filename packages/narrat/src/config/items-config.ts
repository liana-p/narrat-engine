import { Static, Type } from '@sinclair/typebox';
export const ItemConfigSchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  icon: Type.String(),
  onUse: Type.Optional(
    Type.Object({
      action: Type.String(),
      label: Type.String(),
    }),
  ),
  tag: Type.Optional(Type.String()),
  category: Type.Optional(Type.String()),
  showIfEmpty: Type.Optional(Type.Boolean()),
});
export type ItemConfig = Static<typeof ItemConfigSchema>;

export const ItemCategorySchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
});
export type ItemCategory = Static<typeof ItemCategorySchema>;

export const ItemsListSchema = Type.Record(Type.String(), ItemConfigSchema);
export type ItemsList = Static<typeof ItemsListSchema>;

export const ItemsConfigSchema = Type.Object({
  categories: Type.Array(ItemCategorySchema),
  items: ItemsListSchema,
});
export type ItemsConfig = Static<typeof ItemsConfigSchema>;

export const ItemsInputConfigSchema = Type.Object({
  categories: Type.Optional(Type.Array(ItemCategorySchema)),
  items: Type.Optional(ItemsListSchema),
});
export type ItemsInputConfig = Static<typeof ItemsInputConfigSchema>;

export const defaultItemsConfig: ItemsConfig = {
  categories: [
    {
      id: 'default',
      title: 'Items',
    },
  ],
  items: {},
};
