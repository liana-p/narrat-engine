<template>
  <div>
    <div class="flex flex-row item-description-container">
      <div class="flex item-left">
        <div class="item-display" :style="itemStyle"></div>
      </div>
      <div class="flex item-right">
        <h2>{{ itemData.name }}</h2>
        <hr class="hr-solid" />
        <h3>Amount: {{ item.amount }}</h3>
        <p>{{ itemData.description }}</p>
        <button
          @click="$emit('use')"
          class="button"
          :class="canUse ? '' : 'disabled'"
        >
          Use
        </button>
      </div>
    </div>
    <button class="button" @click="$emit('close')">{{ '<--' }}</button>
  </div>
</template>
<script lang="ts" setup>
import { getAssetUrl, getItemConfig } from '@/config';
import { ItemState, useInventory } from '@/stores/inventory-store';
import { computed } from 'vue';

const props = defineProps<{
  item: ItemState;
}>();
defineEmits(['close', 'use']);

const itemData = computed(() => {
  return getItemConfig(props.item.id);
});

const itemStyle = computed(() => {
  return {
    backgroundImage: `url(${getAssetUrl(itemData.value.icon)})`,
  };
});

const canUse = computed(() => {
  return useInventory().canUseItem(props.item);
});
</script>
<style>
.item-description-container {
  justify-content: space-between;
  align-items: stretch;
}

.item-left {
  border: 1px dashed white;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
}

.item-right {
  border: 1px dashed white;
  flex-direction: column;
  flex-grow: 2;
  align-items: baseline;
  padding: 10px;
}
</style>
