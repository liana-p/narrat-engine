import { getConfig } from '@/config';
import {
  StoreInfo,
  isGlobalSaveableStore,
  isSaveableStore,
  isStoreWithConfig,
} from '@/data/StoreInfo';
import { error } from '@/utils/error-handling';
import { ExtractedGameSave, GlobalGameSave } from '@/types/game-save';
import { ExtractedSave } from '@/utils/save-helpers';
import { vm } from '@/vm/vm';
import { defaultScenes } from '@/scenes/default-scenes';
import { useScenes } from './scenes-store';

let allStores: { [key: string]: StoreInfo } = {};

export function setupAllStores(stores: any) {
  allStores = stores;
}

export function setupScenes() {
  defaultScenes['engine-splash'].onFinished = () => {
    useScenes().onEngineSplashFinished();
  };
  useScenes().scenes = defaultScenes;
}

export function getAllStores() {
  return allStores;
}

export function resetAllStores() {
  for (const key in allStores) {
    const data = allStores[key];
    const store = data.store();
    let config;
    if (isStoreWithConfig(data)) {
      config = getConfig()[data.config];
    }
    if (store.reset && !data.avoidReset) {
      store.reset(config);
    }
  }
  vm.plugins.forEach((plugin) => {
    if (plugin.reset) {
      plugin.reset();
    }
  });
}

export function extractSaveData(): ExtractedSave {
  const saveData: ExtractedGameSave = {} as any;
  const globalSave: GlobalGameSave = {} as any;
  for (const key in allStores) {
    const data = allStores[key];
    if (isSaveableStore(data)) {
      const store = data.store();
      if (store.generateSaveData) {
        saveData[data.save] = store.generateSaveData();
      } else {
        error(
          `Store ${key} has no generateSaveData method. Trying to generate save data for ${data.save}`,
        );
      }
    }
    if (isGlobalSaveableStore(data)) {
      const store = data.store();
      if (store.generateGlobalSaveData) {
        globalSave[data.globalSave] = store.generateGlobalSaveData();
      } else {
        error(
          `Store ${key} has no generateGlobalSaveData method. Trying to generate save data for ${data.globalSave}`,
        );
      }
    }
  }
  vm.plugins.forEach((plugin) => {
    if (plugin.save) {
      saveData.plugins[plugin.pluginId] = plugin.save();
    }
  });
  // Add save data from potential custom stores
  vm.customStores().forEach(([storeName, store]) => {
    if (store.save) {
      const customStoreSaveData = store.save();
      if (customStoreSaveData) {
        if(saveData.customStores == undefined) {
          saveData.customStores = {};
        }
        saveData.customStores[storeName] = customStoreSaveData;
      }
    }
  });
  return {
    gameSave: saveData,
    globalSave,
  };
}

export function loadSaveData(save: ExtractedGameSave) {
  for (const key in allStores) {
    const data = allStores[key];
    if (isSaveableStore(data)) {
      const store = data.store();
      if (store.loadSaveData) {
        store.loadSaveData(save[data.save]);
      } else {
        error(
          `Store ${key} has no loadSaveData method. Trying to load save data for ${data.save}`,
        );
      }
    }
  }
  vm.plugins.forEach((plugin) => {
    if (plugin.load && save.plugins[plugin.pluginId]) {
      plugin.load(save.plugins[plugin.pluginId]);
    }
  });
  vm.customStores().forEach(([storeName, store]) => {
    if (store.load) {
      store.load(save.customStores[storeName]);
    }
  });
}

export function loadGlobalSaveData(globalSave: GlobalGameSave) {
  for (const key in allStores) {
    const data = allStores[key];
    if (isGlobalSaveableStore(data)) {
      const store = data.store();
      if (store.loadGlobalSaveData) {
        store.loadGlobalSaveData(globalSave[data.globalSave]);
      } else {
        error(
          `Store ${key} has no loadGlobalSaveData method. Trying to load global save data for ${data.globalSave}`,
        );
      }
    }
  }
}
export function loadAllSaveData(save: ExtractedSave) {
  loadSaveData(save.gameSave);
  loadGlobalSaveData(save.globalSave);
}
