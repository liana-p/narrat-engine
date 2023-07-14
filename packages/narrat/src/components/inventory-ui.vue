<template>
  <div v-if="!chosenItem && section.items.length > 0">
    <InventorySection
      :items="section.items"
      :title="section.title"
      :inputListener="inputListener"
      :id="section.id"
      @chosen="clickItem"
    />
  </div>
  <ItemDetails
    v-else-if="typeof chosenId === 'string'"
    :item="items[chosenId]"
    @use="useItem"
    @close="closeItem"
  />
  <div v-else>
    <h2>The inventory is empty!</h2>
  </div>
</template>

<script lang="ts" setup>
import { getConfig } from '@/config';
import { useInventory } from '@/stores/inventory-store';
import { useVM } from '@/stores/vm-store';
import { audioEvent } from '@/utils/audio-loader';
import { error } from '@/utils/error-handling';
import { computed, ref } from 'vue';
import InventorySection, {
  InventorySectionProps,
} from './inventory/inventory-section.vue';
import ItemDetails from './inventory/item-details.vue';
import { InputListener } from '@/stores/inputs-store';

const props = defineProps<{
  section: InventorySectionProps;
  inputListener: InputListener;
}>();
const store = useInventory();
const items = computed(() => store.items);

const emit = defineEmits(['close']);

const chosenId = ref<false | string>(false);

const chosenItem = computed(() => {
  if (chosenId.value) {
    return items.value[chosenId.value];
  }
  return null;
});
const canUseChosenItem = computed(() => {
  return useInventory().canUseItem(chosenItem.value!);
});
const itemConf = computed(() => {
  return getConfig().items.items;
});
const chosenItemConf = computed(() => {
  if (chosenId.value) {
    return itemConf.value[chosenId.value];
  }
  return null;
});

function close() {
  emit('close');
}
function clickItem(item: string) {
  chosenId.value = item;
}
function closeItem() {
  chosenId.value = false;
}
function useItem() {
  if (chosenItem.value && canUseChosenItem.value && chosenItemConf.value) {
    const onUse = chosenItemConf.value.onUse!;
    close();
    audioEvent('onItemUsed');
    if (onUse.action === 'jump') {
      useVM().jumpToLabel(onUse.label);
    } else if (onUse.action === 'run') {
      useVM().runThenGoBackToPreviousDialog(onUse.label, true);
    } else {
      error(`Unknown action ${onUse.action}`);
    }
  }
}
</script>

<style>
.inventory-modal {
  width: 800px;
  min-height: 50%;
}
.inventory-container {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 20px;
}

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
