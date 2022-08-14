import CounterUi from './components/counter-ui.vue';
import { useCounter } from './custom-stores/counter-store';
import {
  CommandPlugin,
  CustomMenuButton,
  CustomStores,
  NarratPlugin,
} from 'narrat';

/**
 * The CounterPlugin is a simple example plugin to showcase the various features plugins can use.
 * This plugin will use the `counter-store` custom store to store custom data (which gets saved and loaded)
 * It uses the `counter-ui.vue` component to display the counter
 * It uses some `CommandPlugin` to add new commands to modify or get the counter's value
 * It uses the `CustomMenuButton` to add a new menu button to the menu bar
 */
export class CounterPlugin extends NarratPlugin {
  customStores: CustomStores;
  customCommands: CommandPlugin<any>[];
  customMenuButtons: CustomMenuButton[];

  constructor() {
    super();
    const version = import.meta.env.VITE_BUILD_VERSION;
    const date = new Date(import.meta.env.VITE_BUILD_DATE).toLocaleString();
    const name = import.meta.env.VITE_PLUGIN_NAME;
    console.log(
      `%c [Narrat plugin] [${name}]  v${version} - Built at ${date}`,
      'background: #222; color: #bada55',
    );
    this.customStores = {
      counter: useCounter,
    };

    this.customCommands = [
      new CommandPlugin(
        'increase_counter',
        [],
        async (ctx) => useCounter().count++,
      ),
      new CommandPlugin('get_counter', [], async (ctx) => useCounter().count),
    ];

    this.customMenuButtons = [
      {
        config: {
          id: 'counter',
          label: 'Counter',
          cssClass: 'counter-menu-button',
          activeTab: 0,
          tabs: [
            {
              id: 'counter',
              text: 'Counter',
              component: 'CounterUi',
            },
          ],
        },
        component: CounterUi,
      },
    ];
  }
}
