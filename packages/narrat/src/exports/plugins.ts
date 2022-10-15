import { NarratPlugin } from '../plugins/NarratPlugin';
import { CommandPlugin, generateParser } from '../vm/commands/command-plugin';
import type { CommandRunner } from '../vm/commands/command-plugin';
import { vm } from '../vm/vm';
import { StoreDefinition } from 'pinia';
import { MenuState, MenuTabState } from '@/stores/menu-store';

export type NarratLifecycleHook = <T extends [...any[]]>(...args: T) => void;

export interface NarratCustomStoreActions {
  save?: () => any;
  load?: (data: any) => void;
  setup?: () => Promise<void>;
  start?: () => void;
  reset: () => void;
}

export type UseCustomStore = StoreDefinition<
  string,
  any,
  any,
  NarratCustomStoreActions
>;

export interface CustomStores {
  [key: string]: UseCustomStore;
}

export interface CustomMenuButton {
  menuId: string;
  config: MenuState;
  components: { [key: string]: any };
}
export interface CustomMenuTab {
  menuId: string;
  config: MenuTabState;
  component: any;
}
export type NarratPluginObject<T> = {
  onPageLoaded?: NarratLifecycleHook;
  onNarratSetup?: NarratLifecycleHook;
  onAppMounted?: NarratLifecycleHook;
  onAssetsLoaded?: NarratLifecycleHook;
  onGameSetup?: NarratLifecycleHook;
  onGameStart?: NarratLifecycleHook;
  onGameMounted?: NarratLifecycleHook;
  onGameUnmounted?: NarratLifecycleHook;
  customCommands?: CommandPlugin<T>[];
  customStores?: CustomStores;
  customMenuButtons?: CustomMenuButton[];
  customMenuTabs?: CustomMenuTab[];
  startMenuButtons?: CustomStartMenuButton[];
};

/**
 * Custom buttons that get added to the start menu (where the New Game etc buttons are)
 * Action option is to provide a function to run on click
 * popupComponent option is to provide a component to display in a modal window on click (for custom pieces of UI)
 */
export interface CustomStartMenuButton {
  id: string;
  text: string;
  action?: () => void;
  popupComponent?: {
    name: string;
    component: any;
  }
}

function registerPlugin<T>(plugin: NarratPluginObject<T>) {
  vm.addPlugin(plugin);
}

function addCommand<T>(command: CommandPlugin<T>) {
  vm.addCommand(command);
}

export { CommandRunner };

export {
  CommandPlugin,
  NarratPlugin,
  registerPlugin,
  addCommand,
  generateParser,
};
