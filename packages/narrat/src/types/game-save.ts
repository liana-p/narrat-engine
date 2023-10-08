import { AudioSave } from '@/stores/audio-store';
import { DialogSave } from '@/stores/dialog-store';
import { HudSave } from '@/stores/hud-stats-store';
import { InventorySave } from '@/stores/inventory-store';
import { MainSaveData } from '@/stores/main-store';
import { QuestLogSave } from '@/stores/quest-log';
import { ScreenSave } from '@/stores/screens-store';
import { SkillsSave } from '@/stores/skills';
import { ScreenObjectsStoreSave } from '@/stores/screen-objects-store';
import { VMSave } from '@/stores/vm-store';
import { AchievementsSave } from '@/stores/achievements-store';
import { GameUserSettingsSave } from '@/stores/settings-store';
import { ConfigStoreSave } from '@/stores/config-store';
import { ChoiceTrackingSave } from '@/stores/choices-tracking-store';

export interface SaveSlot {
  slotType: 'manual' | 'auto';
  id: string;
  saveData: GameSave | null;
  slotNumber: number;
}
export type GameSave = {
  [key: string]: any;
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
  screenObjects: ScreenObjectsStoreSave;
  settings: GameUserSettingsSave;
  config: ConfigStoreSave;
  choices: ChoiceTrackingSave;
};

export type GlobalGameSave = {
  achievements: AchievementsSave;
  data: {
    [key: string]: any;
  };
};

export interface SaveSlotMetadata {
  saveDate: string;
  name: string;
}

export type StoredSaveFile = SaveFile;
export type SaveFile = {
  version: string;
  slots: Array<SaveSlot>;
  lastSaveSlot?: string;
  globalSave: GlobalGameSave;
};
