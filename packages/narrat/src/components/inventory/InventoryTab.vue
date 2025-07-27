<template>
  <div>
    <SubTabController
      :tabs="inventoryTabs"
      :defaultTab="0"
      :inputListener="inputListener"
    />
  </div>
</template>

<script setup lang="ts">
import { getConfig, getItemConfig } from '@/config';
import SubTabController from '../tabs/SubTabController.vue';
import { InventorySectionProps } from './inventory-section.vue';
import InventoryUi from '../inventory-ui.vue';
import { computed } from 'vue';
import { useTranslation } from 'i18next-vue';
import { useInventory } from '@/stores/inventory-store';
import { TabOptions } from '../tabs/tab-selector.vue';
import { InputListener } from '@/stores/inputs-store';

defineProps<{
  inputListener: InputListener;
}>();
const { t } = useTranslation();
const store = useInventory();
const items = computed(() => store.items);

const itemsToDisplay = computed(() => {
  return Object.values(items.value).filter((itemState) => {
    if (itemState.amount > 0) {
      return true;
    } else {
      const config = getItemConfig(itemState.id);
      if (config.showIfEmpty) {
        return true;
      }
    }
    return false;
  });
});

const inventorySections = computed(() => {
  const categories = getConfig().items.categories;
  const sections: InventorySectionProps[] = [];
  if (categories.length > 1) {
    // Add a section that combines all categories
    const allItemsSection: InventorySectionProps = {
      id: 'all',
      title: t('narrat.game_menu.inventory.category.all'),
      items: itemsToDisplay.value,
    };
    sections.push(allItemsSection);
  }
  for (const categoryIndex in categories) {
    const categoryConfig = categories[categoryIndex];
    const categoryId = categoryConfig.id;
    const validItems = itemsToDisplay.value.filter(
      (item) => getItemConfig(item.id).category === categoryId,
    );
    sections.push({
      id: categoryId,
      title: categoryConfig.title,
      items: validItems,
    });
  }
  return sections;
});

const inventoryTabs = computed(() => {
  const tabs: TabOptions[] = [];
  inventorySections.value.forEach((section) => {
    tabs.push({
      id: section.id,
      label: section.title,
      component: InventoryUi,
      extraProps: {
        section,
      },
    });
  });
  return tabs;
});
</script>

<style scoped></style>
