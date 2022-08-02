import { getConfig } from '@/config';
import { SAVE_FILE } from '@/constants';
import { audioModes, AudioModeState, AudioSave } from '@/stores/audio-store';
import {
  GameSave,
  isOldSave,
  SaveFile,
  SaveSlotMetadata,
  StoredSaveFile,
} from '@/types/game-save';
import { error } from './error-handling';
import { mapObject } from './object-iterators';
import { randomId } from './randomId';

export const CURRENT_SAVE_VERSION = '1.3.0';

let saveFile: SaveFile;
export function getSaveFile(): SaveFile {
  if (saveFile) {
    return saveFile;
  } else if (!saveFile) {
    const storedSavedFileText = localStorage.getItem(SAVE_FILE);
    if (
      storedSavedFileText &&
      typeof JSON.parse(storedSavedFileText) === 'object'
    ) {
      const storedSaveFile = JSON.parse(storedSavedFileText) as StoredSaveFile;
      try {
        if (isOldSave(storedSaveFile)) {
          saveFile = {
            slots: [storedSaveFile],
            slotsCounter: 1,
          };
        } else if (storedSaveFile && !isOldSave(storedSaveFile)) {
          saveFile = storedSaveFile;
          saveFile.slotsCounter = saveFile.slotsCounter ?? 0;
        } else {
          throw new Error('Invalid save file');
        }
      } catch (e) {
        saveFile = {
          slots: [],
          slotsCounter: 0,
        };
      }
    } else {
      saveFile = {
        slots: [],
        slotsCounter: 0,
      };
    }
  } else {
    throw new Error('Invalid save file');
  }
  saveFile.slots = saveFile.slots.filter((slot) => slot !== null);
  saveFile.slots.forEach((slot, index) => migrateSaveSlot(slot, index));
  return saveFile;
}

export function saveSlot(saveData: GameSave, slot: string) {
  const slotIndex = getSlotIndex(slot);
  if (saveFile.slots[slotIndex]) {
    saveFile.slots[slotIndex] = saveData;
  } else {
    saveFile.slotsCounter++;
    saveFile.slots.push(saveData);
  }
  save();
}

export function setSaveSlot(slot: string) {
  saveFile.lastSaveSlot = slot;
}

export function save() {
  localStorage.setItem(SAVE_FILE, JSON.stringify(saveFile));
}

export function getFreeSlot(): string {
  return randomId();
}

export function getSlotIndex(slotId: string) {
  return saveFile.slots.findIndex((slot) => slot.metadata.id === slotId);
}
export function getSaveSlot(slotId: string) {
  return saveFile.slots.find((slot) => slot.metadata.id === slotId);
}

export function findAutoSave() {
  return saveFile.slots.find((slot) => slot.metadata.slotType === 'auto');
}

export function deleteSave(id: string) {
  const index = saveFile.slots.findIndex((slot) => slot.metadata.id === id);
  saveFile.slots.splice(index, 1);
  save();
}

export function renameSave(id: string, newName: string) {
  const saveSlot = getSaveSlot(id);
  if (saveSlot) {
    saveSlot.metadata.name = newName;
  }
  save();
}

export function migrateSaveSlot(save: GameSave | null, index: number) {
  if (!save) {
    return;
  }
  if (save.version === '1.0.0') {
    save.metadata = {
      saveDate: new Date().toISOString(),
    } as any;
    save.version = '1.1.0';
  }
  if (save.version === '1.1.0') {
    const oldSave = save as any;
    if (oldSave.audio.currentMusic) {
      const audioSave = defaultAudioSave();
      audioSave.modes.music.channels[0] = {
        audio: oldSave.audio.currentMusic,
        howlerId: 0,
      };
      save.audio = audioSave;
    } else {
      save.audio = defaultAudioSave();
    }
    save.version = '1.2.0';
  }
  if (save.version === '1.2.0') {
    save.metadata.name = `Game Save ${index + 1}`;
    save.metadata.slotType = 'auto';
    save.metadata.id = randomId();
    save.metadata.createdCounter = index;
    save.version = '1.3.0';
  }
}

export function generateMetadata(): SaveSlotMetadata {
  return {
    saveDate: new Date().toISOString(),
    name: 'New Save',
    slotType: 'auto',
    id: randomId(),
    createdCounter: saveFile.slotsCounter + 1,
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
  saveData: GameSave | null;
  slotId: string;
};
