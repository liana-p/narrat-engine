<template>
  <div v-if="!chosenItem && Object.keys(itemsToDisplay).length > 0">
    <InventorySection
      v-for="section in sections"
      :key="section.id"
      :items="section.items"
      :title="section.title"
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

<script lang="ts">
import { getConfig, getItemConfig, ItemData } from '@/config';
import { useDialogStore } from '@/stores/dialog-store';
import { useInventory, ItemState } from '@/stores/inventory-store';
import { useVM } from '@/stores/vm-store';
import { audioEvent } from '@/utils/audio-loader';
import { error } from '@/utils/error-handling';
import { computed, defineComponent } from 'vue';
import InventorySection, {
  InventorySectionProps,
} from './inventory/inventory-section.vue';
import ItemDetails from './inventory/item-details.vue';

export default defineComponent({
  setup() {
    const store = useInventory();
    const dialogStore = useDialogStore();
    const items = computed(() => store.items);
    const currentlyChoosing = computed(() => dialogStore.currentDialog.choices);
    return { items, currentlyChoosing };
  },
  emits: ['close'],
  data() {
    return {
      chosenId: false as string | false,
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    clickItem(item: string) {
      this.chosenId = item;
    },
    closeItem() {
      this.chosenId = false;
    },
    useItem() {
      if (this.chosenItem && this.canUseChosenItem && this.chosenItemConf) {
        const onUse = this.chosenItemConf.onUse!;
        this.close();
        audioEvent('onItemUsed');
        if (onUse.action === 'jump') {
          useVM().jumpToLabel(onUse.label);
        } else if (onUse.action === 'run') {
          useVM().runThenGoBackToPreviousDialog(onUse.label, true);
        } else {
          error(`Unknown action ${onUse.action}`);
        }
      }
    },
  },
  computed: {
    itemsToDisplay(): ItemState[] {
      return Object.values(this.items);
    },
    chosenItem(): null | ItemState {
      if (this.chosenId) {
        return this.items[this.chosenId];
      }
      return null;
    },
    canUseChosenItem() {
      return useInventory().canUseItem(this.chosenItem!);
    },
    chosenItemConf(): null | ItemData {
      if (this.chosenId) {
        return this.itemConf[this.chosenId];
      }
      return null;
    },
    itemConf(): {
      [key: string]: ItemData;
    } {
      return getConfig().items.items;
    },
    sections(): InventorySectionProps[] {
      // Split the inventory into sections based on the item category, with a default category for items not in any.
      const categories = getConfig().items.categories;
      const sections: InventorySectionProps[] = [];
      const possibleSections = this.itemsToDisplay.reduce((acc, item) => {
        const category = getItemConfig(item.id).category ?? 'default';
        const categoryConfig = categories.find((c) => c.id === category);
        if (!categoryConfig) {
          error(`Unknown category ${category}`);
          return acc;
        }
        let matchingSection = acc.find((s) => s.id === category);
        if (!matchingSection) {
          matchingSection = {
            id: category,
            title: categoryConfig.title,
            items: [],
          };
          acc.push(matchingSection);
        }
        matchingSection.items.push(item);
        return acc;
      }, sections);
      return possibleSections;
    },
  },
  components: { InventorySection, ItemDetails },
});
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
