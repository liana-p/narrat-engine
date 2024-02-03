import { ExtractedGameSave, GameSave, GlobalGameSave } from '@/types/game-save';
import { Config } from '@/config/config-output';

export type StoreInfo = {
  store: any;
  config?: keyof Config;
  save?: keyof ExtractedGameSave;
  globalSave?: keyof GlobalGameSave;
  avoidReset?: boolean;
};

export type SaveableStore = StoreInfo & {
  save: keyof GameSave;
  generateSaveData?: () => GameSave[keyof GameSave];
};

export type GlobalSaveableStore = StoreInfo & {
  globalSave: keyof GlobalGameSave;
  generateGlobalSaveData?: () => GlobalGameSave[keyof GlobalGameSave];
};

export type StoreWithConfig = StoreInfo & {
  config: keyof Config;
  updateConfig?: (config: Config[keyof Config]) => void;
};

export function isSaveableStore(store: StoreInfo): store is SaveableStore {
  return 'save' in store;
}

export function isGlobalSaveableStore(
  store: StoreInfo,
): store is GlobalSaveableStore {
  return 'globalSave' in store;
}

export function isStoreWithConfig(store: StoreInfo): store is StoreWithConfig {
  return 'config' in store;
}
