import { getCommonConfig } from '@/config';
import {
  ExtractedGameSave,
  GameSave,
  GlobalGameSave,
  SaveFile,
  SaveSlotMetadata,
  StoredSaveFile,
} from '@/types/game-save';
import { error, warning } from './error-handling';
import { randomId } from './randomId';
import { useConfig } from '@/stores/config-store';
export const CURRENT_SAVE_VERSION = '4.0.0';

export function saveFileName(): string {
  let base = `NARRAT_SAVE_`;
  const prefix = useConfig().savePathPrefix;
  if (prefix) {
    base += `${prefix}_`;
  }
  return `${base}${getCommonConfig().saveFileName}`;
}

const oldSaveFileName = 'gameSave';

let saveFile: SaveFile;
export function getSaveFile(): SaveFile {
  if (saveFile) {
    return saveFile;
  } else if (!saveFile) {
    let storedSaveFile: StoredSaveFile | null = null;
    try {
      // Handle weird save files
      let storedSavedFileText = localStorage.getItem(saveFileName());
      if (!storedSavedFileText) {
        storedSavedFileText = localStorage.getItem(oldSaveFileName);
      }
      if (storedSavedFileText) {
        localStorage.setItem(`${saveFileName()}_BACKUP`, storedSavedFileText);
        storedSaveFile = JSON.parse(storedSavedFileText);
      }
      if (
        storedSaveFile &&
        typeof storedSaveFile === 'object' &&
        storedSaveFile.slots &&
        storedSaveFile!.slots[0] &&
        storedSaveFile!.slots[0].id
      ) {
        // It worked
      } else {
        storedSaveFile = null;
        localStorage.clear();
      }
    } catch (e) {
      warning(
        `Save file deleted because it was either broken or an outdated format: ${e}`,
      );
    }
    if (storedSaveFile) {
      saveFile = storedSaveFile;
    } else {
      saveFile = createDefaultSaveFile();
    }
  }
  migrateSaveFile(saveFile);
  // In case the config changed and there are more slots now
  setupSaveSlots(saveFile);
  save();
  return saveFile;
}

export function overrideSaveFile(newSaveFile: SaveFile) {
  saveFile = newSaveFile;
}

export function resetSave() {
  saveFile = createDefaultSaveFile();
  save();
}
function defaultGlobalSave(): GlobalGameSave {
  return {
    achievements: {
      achievements: {},
    },
    localization: {},
    data: {},
    settings: {
      baseSettings: {
        textSpeed: 30,
        animateText: true,
        fontSize: 16,
        language: 'en',
      },
      customSettings: {},
    },
  };
}
function migrateSaveFile(saveFile: SaveFile) {
  if (saveFile.version !== '4.0.0') {
    saveFile.globalSave.localization = {};
    if (!saveFile.globalSave.settings) {
      saveFile.globalSave.settings = defaultGlobalSave().settings;
    }
  }
}

function createDefaultSaveFile() {
  const saveFile: SaveFile = {
    version: CURRENT_SAVE_VERSION,
    slots: [],
    globalSave: defaultGlobalSave(),
  };
  setupSaveSlots(saveFile);
  return saveFile;
}
function setupSaveSlots(saveFile: SaveFile) {
  const saveSlotsCount = getCommonConfig().saves.slots ?? 10;
  if (saveFile.slots.length < 1) {
    saveFile.slots[0] = {
      slotType: 'auto',
      id: randomId(),
      saveData: null,
      slotNumber: 0,
    };
  }
  // In case there's an old slot
  saveFile.slots[0].slotType = 'auto';
  for (let i = 1; i < saveSlotsCount + 1; i++) {
    if (saveFile.slots.length <= i) {
      saveFile.slots[i] = {
        slotNumber: i,
        slotType: getCommonConfig().saves.mode === 'manual' ? 'manual' : 'auto',
        id: randomId(),
        saveData: null,
      };
    }
  }
}

export function saveSlot(
  saveData: GameSave,
  globalSaveData: GlobalGameSave,
  slot: string,
) {
  const slotIndex = getSlotIndex(slot);
  if (saveFile.slots[slotIndex]) {
    saveFile.slots[slotIndex].saveData = saveData;
  } else {
    error(`Tried to save to slot ${slot} but it doesn't exist`);
    return;
  }
  saveFile.globalSave = globalSaveData;
  save();
}

export function setSaveSlot(slot: string) {
  saveFile.lastSaveSlot = slot;
}

export function save() {
  localStorage.setItem(saveFileName(), JSON.stringify(saveFile));
}

export function getFreeSlot(): string | false {
  const slot = saveFile.slots.find((slot) => !slot.saveData);
  if (slot) {
    return slot.id;
  }
  return false;
}

export function getSlotIndex(slotId: string) {
  return saveFile.slots.findIndex((slot) => slot.id === slotId);
}
export function getSaveSlot(slotId: string) {
  return saveFile.slots.find((slot) => slot.id === slotId);
}

export function findAutoSave() {
  return saveFile.slots.find((slot) => slot.slotType === 'auto');
}

export function deleteSave(id: string) {
  const index = saveFile.slots.findIndex((slot) => slot.id === id);
  saveFile.slots[index].saveData = null;
  save();
}

export function renameSave(id: string, newName: string) {
  const saveSlot = getSaveSlot(id);
  if (saveSlot && saveSlot.saveData) {
    saveSlot.saveData.metadata.name = newName;
  }
  save();
}

export function generateMetadata(): SaveSlotMetadata {
  return {
    saveDate: new Date().toISOString(),
    name: 'New Save',
  };
}

export type ChosenSlot = {
  slotId: string;
};

export type ExtractedSave = {
  gameSave: ExtractedGameSave;
  globalSave: GlobalGameSave;
};

export type CurrentSaveData = {
  saveSlot: GameSave;
  global: GlobalGameSave;
};

export function processAutoSave({
  slot,
  name,
  extractedSave,
}: {
  slot: string;
  name?: string;
  extractedSave: ExtractedSave;
}) {
  const existingSave = getSaveSlot(slot);
  const metadata = generateMetadata();
  if (existingSave && existingSave.saveData) {
    metadata.name = existingSave.saveData.metadata.name;
  } else {
    metadata.name = name ?? `Auto Save`;
  }
  if (getCommonConfig().saves.mode === 'manual') {
    metadata.name = 'Auto Save';
  }
  const save: GameSave = {
    ...extractedSave.gameSave,
    version: CURRENT_SAVE_VERSION,
    metadata,
  };
  const globalSaveFile = getSaveFile().globalSave;
  Object.assign(globalSaveFile, extractedSave.globalSave);
  const finalSaveData = {
    saveSlot: save,
    global: globalSaveFile,
  };
  saveSlot(save, globalSaveFile, slot);
  return finalSaveData;
}

export function writeGlobalSave(globalSave: GlobalGameSave) {
  if (saveFile) {
    saveFile.globalSave = globalSave;
    save();
  }
}

export function manualSave(
  saveData: CurrentSaveData,
  playTime: number,
  slotId: string,
  name?: string,
) {
  const slot = saveData.saveSlot;
  const global = saveData.global;
  saveSlot(
    {
      ...slot,
      main: {
        ...slot.main,
        playTime,
      },
      metadata: {
        ...slot.metadata,
        name: name ?? `Manual Save`,
        saveDate: new Date().toISOString(),
      },
    },
    global,
    slotId,
  );
}
