<template>
  <div class="inventory-section" :class="`section-${props.id}`">
    <h3>{{ title }}</h3>
    <div class="inventory-section-items">
      <button
        @click="() => $emit('chosen', item.id)"
        class="item-display"
        :class="`item-${item.id}`"
        :style="getItemStyle(item.id)"
        v-for="item in items"
        :key="item.id"
      >
        <h3 class="item-title">{{ getItemName(item.id) }}</h3>
        <h3 class="item-amount">{{ item.amount }}</h3>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getAssetUrl, getItemConfig } from '@/config';
import { ItemState } from '@/stores/inventory-store';

export interface InventorySectionProps {
  items: ItemState[];
  title: string;
  id: string;
}
const props = defineProps<InventorySectionProps>();

function getItemStyle(item: string): any {
  return {
    backgroundImage: `url(${getAssetUrl(getItemConfig(item).icon)})`,
  };
}
function getItemName(item: string): string {
  return getItemConfig(item).name;
}
</script>

<style>
.inventory-section {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.inventory-section-items {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 20px;
}

.item-display {
  width: 200px;
  height: 200px;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
}

.item-title {
  position: absolute;
  bottom: 0px;
  text-align: center;
  width: 100%;
  color: var(--inventory-text-color);
  background: var(--inventory-text-background);
}

.item-amount {
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--inventory-amount-color);
  width: 40px;
  height: 40px;
  background-color: var(--inventory-amount-background);
}
</style>
