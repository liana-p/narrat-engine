<template>
  <div class="inventory-section" :class="`section-${props.id}`">
    <h3>{{ title }}</h3>
    <div class="inventory-section-items" ref="itemsContainer">
      <button
        @click="() => choose(item.id)"
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
import { NavigationState, useNavigation } from '@/inputs/useNavigation';
import { InputListener } from '@/stores/inputs-store';
import { ItemState } from '@/stores/inventory-store';
import { onMounted, onUnmounted, ref } from 'vue';

export interface InventorySectionProps {
  items: ItemState[];
  title: string;
  id: string;
}
const props = defineProps<
  InventorySectionProps & {
    inputListener: InputListener;
  }
>();
const itemsContainer = ref<HTMLElement | null>(null);
const navigation = ref<NavigationState | null>(null);
const emit = defineEmits(['chosen']);

function choose(item: string) {
  emit('chosen', item);
}
function getItemStyle(item: string): any {
  return {
    backgroundImage: `url(${getAssetUrl(getItemConfig(item).icon)})`,
  };
}
function getItemName(item: string): string {
  return getItemConfig(item).name;
}

onMounted(() => {
  navigation.value = useNavigation({
    mode: 'grid',
    listener: props.inputListener,
    columns: 3,
    container: itemsContainer,
    onChosen: (index: number) => {
      choose(props.items[index].id);
    },
  }) as any;
  navigation.value!.mount();
});

onUnmounted(() => {
  if (navigation.value) {
    navigation.value.disable();
    navigation.value = null;
  }
});
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

.item-display.selected {
  border: var(--selected-border);
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
