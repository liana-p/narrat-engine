import { getCommonConfig } from '@/config';
import { useVM } from '@/stores/vm-store';
import { useMain } from '@/stores/main-store';
import { loadGlobalSaveData, resetAllStores } from '@/stores/stores-management';
import { SaveSlot } from '@/types/game-save';
import { audioEvent } from '@/utils/audio-loader';
import { findAutoSave, getSaveFile } from '@/utils/save-helpers';
import { vm } from '@/vm/vm';
import { useAudio } from '@/stores/audio-store';
import { setupLoadedData } from './saving';

export function resetApplication() {
  resetAllStores();
}

export function menuReturn() {
  resetApplication();
  const main = useMain();
  main.menuReturn();
}

export async function startNewGame(saveSlot: string) {
  if (getCommonConfig().saves.mode === 'manual') {
    const autosave = findAutoSave();
    if (autosave) {
      saveSlot = autosave.id;
    }
  }
  useMain().setSaveSlot(saveSlot);
  loadGlobalSaveData(getSaveFile().globalSave);
  startMachine();
  useVM().runGame();
}

export function startMachine() {
  const audioStore = useAudio();
  audioStore.stopAll();
  audioEvent('onPressStart');

  const vmStore = useVM();
  vmStore.start();
  useMain().prepareToPlay();
  vm.callHook('onGameStart');
}

export async function loadAndStartGame(save: SaveSlot, saveSlot: string) {
  if (getCommonConfig().saves.mode === 'manual') {
    const autosave = findAutoSave();
    if (autosave) {
      saveSlot = autosave.id;
    }
  }
  useMain().setSaveSlot(saveSlot);
  startMachine();
  if (save.saveData) {
    setupLoadedData({
      gameSave: save.saveData,
      globalSave: getSaveFile().globalSave,
    });
    useAudio().reloadAudio(save.saveData.audio);
    const vm = useVM();
    const runOnReload = getCommonConfig().saves.runOnReload;
    if (typeof runOnReload === 'string') {
      await useVM().runLabelFunction(runOnReload);
    }
    vm.jumpToLabel(save.saveData.vm.lastLabel);
  }
}
