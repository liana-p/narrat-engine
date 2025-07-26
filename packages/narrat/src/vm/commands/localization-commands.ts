import { CommandPlugin } from './command-plugin';

// export const addItemPlugin = new CommandPlugin<InventoryChangeArgs>(
//   'add_item',
//   [
//     { name: 'id', type: 'string' },
//     { name: 'amount', type: 'number' },
//   ],
//   async (cmd) => {
//     const { id, amount } = cmd.options;
//     const inventory = useInventory();
//     inventory.add({
//       id,
//       amount,
//     });
//   },
// );
