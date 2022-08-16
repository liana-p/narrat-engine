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
});
export type ItemConfig = Static<typeof ItemConfigSchema>;

export const ItemCategorySchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
});
export type ItemCategory = Static<typeof ItemCategorySchema>;

export const ItemsConfigSchema = Type.Object({
  categories: Type.Array(ItemCategorySchema),
  items: Type.Record(Type.String(), ItemConfigSchema),
});
export type ItemsConfig = Static<typeof ItemsConfigSchema>;

export const defaultItemsConfig: ItemsConfig = {
  categories: [
    {
      id: 'default',
      title: 'Items',
    },
  ],
  items: {},
};
