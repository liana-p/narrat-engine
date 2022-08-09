import { getConfig } from '@/config';
import { SAVE_FILE } from '@/constants';
import { audioModes, AudioModeState, AudioSave } from '@/stores/audio-store';
import {
  GameSave,
  SaveFile,
  SaveSlotMetadata,
  StoredSaveFile,
} from '@/types/game-save';
import { error, warning } from './error-handling';
import { mapObject } from './object-iterators';
import { randomId } from './randomId';
export const CURRENT_SAVE_VERSION = '1.4.0';

let saveFile: SaveFile;
export function getSaveFile(): SaveFile {
  if (saveFile) {
    return saveFile;
  } else if (!saveFile) {
    let storedSaveFile: StoredSaveFile | null = null;
    try {
      // Handle weird save files
      const storedSavedFileText = localStorage.getItem(SAVE_FILE);
      if (storedSavedFileText) {
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

function migrateSaveFile(saveFile: SaveFile) {
  if (saveFile.version === '1.4.0') {
    // Nothing to do
  }
}

function createDefaultSaveFile() {
  const saveFile: SaveFile = {
    version: CURRENT_SAVE_VERSION,
    slots: [],
  };
  setupSaveSlots(saveFile);
  return saveFile;
}
function setupSaveSlots(saveFile: SaveFile) {
  const saveSlotsCount = getConfig().saves.slots ?? 10;
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
        slotType: getConfig().saves.mode === 'manual' ? 'manual' : 'auto',
        id: randomId(),
        saveData: null,
      };
    }
  }
}

export function saveSlot(saveData: GameSave, slot: string) {
  const slotIndex = getSlotIndex(slot);
  if (saveFile.slots[slotIndex]) {
    saveFile.slots[slotIndex].saveData = saveData;
  } else {
    error(`Tried to save to slot ${slot} but it doesn't exist`);
    return;
  }
  save();
}

export function setSaveSlot(slot: string) {
  saveFile.lastSaveSlot = slot;
}

export function save() {
  localStorage.setItem(SAVE_FILE, JSON.stringify(saveFile));
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

function defaultAudioSave(): AudioSave {
  const modes = mapObject(audioModes, (mode) => {
    return {
      channels: [],
      options: {
        volume: 1,
      },
    } as AudioModeState;
  });
  return {
    modes,
    masterVolume: getConfig().audioOptions.volume ?? 1,
  };
}

export type ChosenSlot = {
  slotId: string;
};
