import { AudioSave } from '@/stores/audio-store';
import { DialogSave } from '@/stores/dialog-store';
import { HudSave } from '@/stores/hud-stats-store';
import { InventorySave } from '@/stores/inventory-store';
import { MainSaveData } from '@/stores/main-store';
import { QuestLogSave } from '@/stores/quest-log';
import { ScreenSave } from '@/stores/screens-store';
import { SkillsSave } from '@/stores/skills';
import { VMSave } from '@/stores/vm-store';

export type GameSave = {
  version: string;
  skills: SkillsSave;
  screen: ScreenSave;
  main: MainSaveData;
  dialog: DialogSave;
  vm: VMSave;
  audio: AudioSave;
  hud: HudSave;
  inventory: InventorySave;
  quests: QuestLogSave;
  metadata: SaveSlotMetadata;
};

export interface SaveSlotMetadata {
  saveDate: string;
  name: string;
  slotType: 'manual' | 'auto';
  id: string;
  createdCounter: number;
}

export type StoredSaveFile = SaveFile | GameSave;
export type SaveFile = {
  slots: Array<GameSave>;
  lastSaveSlot?: string;
  slotsCounter: number;
};

export function isOldSave(save: StoredSaveFile): save is GameSave {
  if (typeof save === 'object') {
    const saveTest = save as any;
    if (saveTest.version || !saveTest.slots) {
      return true;
    } else if (saveTest.slots) {
      return false;
    }
  }
  throw new Error('Invalid save file');
}
