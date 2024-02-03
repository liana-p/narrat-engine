import { useAchievements } from '@/stores/achievements-store';
import { useChoicesTrackingStoreStore } from '@/stores/choices-tracking-store';
import { useScreenObjects } from '@/stores/screen-objects-store';
import { useScreens } from '@/stores/screens-store';
import { useSettings } from '@/stores/settings-store';
import { useStartMenu } from '@/stores/start-menu-store';
import { useAudio } from '@/stores/audio-store';
import { useDialogStore } from '@/stores/dialog-store';
import { useHud } from '@/stores/hud-stats-store';
import { useInputs } from '@/stores/inputs-store';
import { useInventory } from '@/stores/inventory-store';
import { useMenu } from '@/stores/menu-store';
import { useNotifications } from '@/stores/notification-store';
import { useQuests } from '@/stores/quest-log';
import { useRenderingStore } from '@/stores/rendering-store';
import { useSkills } from '@/stores/skills';
import { useTooltips } from '@/stores/tooltip-store';
import { useVM } from '@/stores/vm-store';
import { useMain } from '@/stores/main-store';
import { setupAllStores } from '@/stores/stores-management';
import { useConfig } from '@/stores/config-store';
import { useScenes } from '@/stores/scenes-store';

export const sourceAllStores = {
  main: {
    store: useMain,
    save: 'main',
  },
  achievements: {
    store: useAchievements,
    config: 'achievements',
    globalSave: 'achievements',
  },
  audio: {
    store: useAudio,
    config: 'audio',
    save: 'audio',
  },
  choicesTracking: {
    store: useChoicesTrackingStoreStore,
    config: 'choices',
    save: 'choices',
  },
  config: {
    store: useConfig,
    save: 'config',
  },
  dialog: {
    store: useDialogStore,
    save: 'dialog',
  },
  hud: {
    store: useHud,
    config: 'common',
    save: 'hud',
  },
  inputs: {
    store: useInputs,
  },
  inventory: {
    store: useInventory,
    config: 'items',
    save: 'inventory',
  },
  menu: {
    store: useMenu,
  },
  notifications: {
    store: useNotifications,
    config: 'common',
  },
  quests: {
    store: useQuests,
    config: 'quests',
    save: 'quests',
  },
  rendering: {
    store: useRenderingStore,
    save: 'rendering',
  },
  screens: {
    store: useScreens,
    config: 'screens',
    save: 'screens',
  },
  sprites: {
    store: useScreenObjects,
    save: 'screenObjects',
  },
  settings: {
    store: useSettings,
    save: 'settings',
    config: 'common',
  },
  skills: {
    store: useSkills,
    config: 'skills',
    save: 'skills',
  },
  startMenu: {
    store: useStartMenu,
  },
  tooltips: {
    store: useTooltips,
    config: 'tooltips',
  },
  vm: {
    store: useVM,
    save: 'vm',
    globalSave: 'data',
  },
  scenes: {
    store: useScenes,
    save: 'scenes',
    avoidReset: true,
  },
} as const;
export type AllStores = typeof sourceAllStores;
export type StoreKey = keyof AllStores;
export type StoreData = AllStores[StoreKey];

export type AllStates = {
  [key in StoreKey]: ReturnType<AllStores[key]['store']>;
};

export function getAllStates(): AllStates {
  const result: AllStates = {} as any;
  for (const key in sourceAllStores) {
    const data = sourceAllStores[key as keyof AllStores];
    const store = data.store();
    result[key as StoreKey] = store as any;
  }
  return result;
}

export function overrideStates(override: any) {
  const states: any = getAllStates();
  for (const key in override) {
    const stateOverride = override[key];
    Object.assign(states[key], stateOverride);
  }
}

setupAllStores(sourceAllStores);
