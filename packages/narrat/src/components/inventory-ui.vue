<template>
  <div
    class="inventory-container"
    v-if="!chosenItem && Object.keys(itemsToDisplay).length > 0"
  >
    <button
      @click="() => clickItem(item.id)"
      class="item-display"
      :style="getItemStyle(item.id)"
      v-for="item in itemsToDisplay"
      :key="item.id"
    >
      <h3 class="item-title">{{ getItemName(item.id) }}</h3>
      <h3 class="item-amount">{{ item.amount }}</h3>
    </button>
  </div>
  <div v-else-if="typeof chosenId === 'string'">
    <div class="flex flex-row item-description-container">
      <div class="flex item-left">
        <div class="item-display" :style="getItemStyle(chosenId)"></div>
      </div>
      <div class="flex item-right">
        <h2>{{ getItemName(chosenId) }}</h2>
        <hr class="hr-solid" />
        <h3>Amount: {{ chosenItem!.amount }}</h3>
        <p>{{ chosenItemConf!.description }}</p>
        <button
          @click="useItem"
          class="button"
          :class="canUseChosenItem ? '' : 'disabled'"
        >
          Use
        </button>
      </div>
    </div>
    <button class="button" @click="closeItem">{{ '<--' }}</button>
  </div>
  <div v-else>
    <h2>The inventory is empty!</h2>
  </div>
</template>

<script lang="ts">
import { getAssetUrl, getConfig, ItemData } from '@/config';
import { useDialogStore } from '@/stores/dialog-store';
import { useInventory, ItemState } from '@/stores/inventory-store';
import { useVM } from '@/stores/vm-store';
import { audioEvent } from '@/utils/audio-loader';
import { error } from '@/utils/error-handling';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const store = useInventory();
    const dialogStore = useDialogStore();
    const items = computed(() => store.items);
    const currentlyChoosing = computed(() => dialogStore.currentDialog.choices);
    return { items, currentlyChoosing };
  },
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
    getItemStyle(item: string): any {
      return {
        backgroundImage: `url(${getAssetUrl(this.itemConf[item].icon)})`,
      };
    },
    getItemName(item: string): string {
      return this.itemConf[item].name;
    },
    getItemConf(item: string) {
      return this.itemConf[item];
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
    canUseItem(item: ItemState) {
      const conf = this.itemConf[item.id];
      if (
        conf &&
        conf.onUse &&
        !useInventory().isInteractionTagBlocked(conf.tag) &&
        !this.currentlyChoosing
      ) {
        return true;
      }
      return false;
    },
  },
  computed: {
    itemsToDisplay(): { [key: string]: ItemState } {
      const items: { [key: string]: ItemState } = {};
      for (const key in this.items) {
        if (this.items[key].amount > 0) {
          items[key] = this.items[key];
        }
      }
      return items;
    },
    chosenItem(): null | ItemState {
      if (this.chosenId) {
        return this.items[this.chosenId];
      }
      return null;
    },
    canUseChosenItem() {
      return this.canUseItem(this.chosenItem!);
    },
    chosenItemConf(): null | ItemData {
      if (this.chosenId) {
        return this.itemConf[this.chosenId];
      }
      return null;
    },
    itemConf(): { [key: string]: ItemData } {
      return getConfig().items;
    },
  },
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

.item-display {
  width: 200px;
  height: 300px;
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
