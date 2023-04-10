import { useInventory } from '@/stores/inventory-store';
import { CommandPlugin } from './command-plugin';

export interface InventoryChangeArgs {
  id: string;
  amount: number;
}
export const addItemPlugin = new CommandPlugin<InventoryChangeArgs>(
  'add_item',
  [
    { name: 'id', type: 'string' },
    { name: 'amount', type: 'number' },
  ],
  async (cmd) => {
    const { id, amount } = cmd.options;
    const inventory = useInventory();
    inventory.add({
      id,
      amount,
    });
  },
);

export const removeItemPlugin = new CommandPlugin<InventoryChangeArgs>(
  'remove_item',
  [
    { name: 'id', type: 'string' },
    { name: 'amount', type: 'number' },
  ],
  async (cmd) => {
    const { id, amount } = cmd.options;
    const inventory = useInventory();
    inventory.remove({
      id,
      amount,
    });
  },
);

export const hasItemPlugin = new CommandPlugin<InventoryChangeArgs>(
  'has_item?',
  [
    { name: 'id', type: 'string' },
    { name: 'amount', type: 'number', optional: true },
  ],
  async (cmd) => {
    const { id, amount } = cmd.options;
    const inventory = useInventory();
    return inventory.hasItem(id, amount);
  },
);

export const itemAmountPlugin = new CommandPlugin<InventoryChangeArgs>(
  'item_amount?',
  [{ name: 'id', type: 'string' }],
  async (cmd) => {
    const { id } = cmd.options;
    const inventory = useInventory();
    return inventory.getItemAmount(id);
  },
);

export const enableInteractionPlugin = new CommandPlugin<{ tag: string }>(
  'enable_interaction',
  [{ name: 'tag', type: 'string' }],
  async (cmd) => {
    const tag = cmd.options.tag;
    const inventory = useInventory();
    inventory.enableInteraction(tag);
  },
);

export const disableInteractionPlugin = new CommandPlugin<{ tag: string }>(
  'disable_interaction',
  [{ name: 'tag', type: 'string' }],
  async (cmd) => {
    const tag = cmd.options.tag;
    const inventory = useInventory();
    inventory.disableInteraction(tag);
  },
);
