// create a pinia store named inventory with a state containing items and actions to add and delete items

import { ItemConfig, ItemsConfig } from '@/config/items-config';
import { deepCopy } from '@/utils/data-helpers';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { getCommonConfig, getItemConfig } from '../config';
import { useDialogStore } from './dialog-store';
import { useNotifications } from './notification-store';
import { audioEvent } from '@/utils/audio-loader';
import { useVM } from './vm-store';
import { error } from '@/utils/error-handling';

export interface ItemState {
  amount: number;
  id: string;
}

export interface InventoryState {
  /** Note: Items are an object so that it's easy to access specific items in game scripts.
   * One side effect of this is that the order items appear in isn't technicaclly guaranteed.
   * It also means there can only be one "stack" of an item at a time */
  items: { [key: string]: ItemState };
  interactionTags: {
    [key: string]: {
      blockedInteraction: boolean;
    };
  };
}

export type InventorySave = InventoryState;

export const useInventory = defineStore('inventory', {
  state: (): InventoryState => ({
    items: {},
    interactionTags: {},
  }),
  actions: {
    generateSaveData(): InventorySave {
      return {
        items: deepCopy(this.items),
        interactionTags: deepCopy(this.interactionTags),
      };
    },
    loadSaveData(save: InventorySave) {
      this.items = { ...this.items, ...deepCopy(save.items) };
      this.interactionTags = { ...deepCopy(save.interactionTags) };
    },
    updateConfig(config: ItemsConfig) {
      Object.keys(config.items).forEach((key) => {
        if (!this.items[key]) {
          this.items[key] = {
            amount: 0,
            id: key,
          };
        }
      });
    },
    reset(items: ItemsConfig) {
      this.$reset();
      this.updateConfig(items);
    },
    hasItem(itemId: string, amount?: number): boolean {
      if (!amount) {
        amount = 1;
      }
      return this.items[itemId]?.amount >= amount;
    },
    getExistingItem(id: string): ItemState | undefined {
      return this.items[id];
    },
    getItemAmount(id: string): number {
      return this.getExistingItem(id)?.amount || 0;
    },
    add(item: ItemState) {
      const existingItem = this.getExistingItem(item.id);
      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        this.items[item.id] = { ...item };
      }
      const itemName = getItemConfig(item.id).name;
      const itemMessage =
        item.amount > 1 ? `${itemName} x ${item.amount}` : itemName;
      useNotifications().addNotification(`Received item: ${itemMessage}`);
    },
    enableInteraction(tag?: string) {
      if (!tag) {
        tag = 'default';
      }
      this.interactionTags[tag] = {
        blockedInteraction: false,
      };
    },
    disableInteraction(tag?: string) {
      if (!tag) {
        tag = 'default';
      }
      this.interactionTags[tag] = {
        blockedInteraction: true,
      };
    },
    onScriptStart() {
      const tags = getCommonConfig().interactionTags;
      Object.keys(tags).forEach((tag) => {
        const conf = tags[tag];
        if (conf.onlyInteractOutsideOfScripts) {
          this.disableInteraction(tag);
        }
      });
    },
    onScriptEnd() {
      const tags = getCommonConfig().interactionTags;
      Object.keys(tags).forEach((tag) => {
        const conf = tags[tag];
        if (conf.onlyInteractOutsideOfScripts) {
          this.enableInteraction(tag);
        }
      });
    },
    isInteractionTagBlocked(tag?: string) {
      if (!tag) {
        tag = 'default';
      }
      if (this.interactionTags[tag]) {
        return this.interactionTags[tag].blockedInteraction;
      }
      return false;
    },
    remove(item: ItemState) {
      const existingItem = this.getExistingItem(item.id);
      if (existingItem) {
        existingItem.amount -= item.amount;
        useNotifications().addNotification(
          `Lost item: ${getItemConfig(item.id).name} x ${item.amount}`,
        );
        if (existingItem.amount <= 0) {
          this.deleteItem(item.id);
        }
      }
    },
    deleteItem(id: string) {
      const existingItem = this.getExistingItem(id);
      if (existingItem) {
        this.items[id].amount = 0;
      }
    },
    canUseItem(item: ItemState) {
      const conf = getItemConfig(item.id);
      if (
        conf &&
        conf.onUse &&
        !this.isInteractionTagBlocked(conf.tag) &&
        !useDialogStore().currentDialog?.choices
      ) {
        return true;
      }
      return false;
    },
    useItem(item: ItemState): boolean {
      let result = false;
      const conf = getItemConfig(item.id);
      if (item && this.canUseItem(item) && conf) {
        const onUse = conf.onUse!;
        result = true;
        audioEvent('onItemUsed');
        if (onUse.action === 'jump') {
          useVM().jumpToLabel(onUse.label);
        } else if (onUse.action === 'run') {
          useVM().runThenGoBackToPreviousDialog(onUse.label, true);
        } else {
          result = false;
          error(`Unknown action ${onUse.action}`);
        }
      }
      return result;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInventory, import.meta.hot));
}
