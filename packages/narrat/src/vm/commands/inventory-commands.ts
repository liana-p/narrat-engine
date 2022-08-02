import { useInventory } from '@/stores/inventory-store';
import { CommandPlugin } from './command-plugin';

export interface InventoryChangeArgs {
  id: string;
  amount: number;
}
// Write a CommandPlugin for adding items to the inventory store
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

// Write a CommandPlugin for removeing items to the inventory store
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

// Write a CommandPlugin for command named 'has_item?' taking options itemId and optional parameter 'amount', which returns true if the inventory has the item, using the inventory store hasItem function and passing itemId and amount
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

// Write a CommandPlugin named 'item_amount?' taking option itemId and returning how many of itemId the player has using the inventory store getItemAmount function and passing itemId
export const itemAmountPlugin = new CommandPlugin<InventoryChangeArgs>(
  'item_amount?',
  [{ name: 'id', type: 'string' }],
  async (cmd) => {
    const { id } = cmd.options;
    const inventory = useInventory();
    return inventory.getItemAmount(id);
  },
);

// Write a CommandPlugin for enabling an interactiongTag in the inventory store
export const enableInteractionPlugin = new CommandPlugin<{ tag: string }>(
  'enable_interaction',
  [{ name: 'tag', type: 'string' }],
  async (cmd) => {
    const tag = cmd.options.tag;
    const inventory = useInventory();
    inventory.enableInteraction(tag);
  },
);

// Write a CommandPlugin for disabling an interactiongTag in the inventory store
export const disableInteractionPlugin = new CommandPlugin<{ tag: string }>(
  'disable_interaction',
  [{ name: 'tag', type: 'string' }],
  async (cmd) => {
    const tag = cmd.options.tag;
    const inventory = useInventory();
    inventory.disableInteraction(tag);
  },
);
