import { NarratPlugin } from '../plugins/NarratPlugin';
import { CommandPlugin, generateParser } from '../vm/commands/command-plugin';
import type { CommandRunner } from '../vm/commands/command-plugin';
import { vm } from '../vm/vm';
import { StoreDefinition } from 'pinia';
import { MenuButtonState } from '@/stores/menu-store';

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
  config: MenuButtonState;
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
};

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
