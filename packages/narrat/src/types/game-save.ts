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
import { GameGlobalSettingsSave } from '@/stores/settings-store';
import { ConfigStoreSave } from '@/stores/config-store';
import { ChoiceTrackingSave } from '@/stores/choices-tracking-store';
import { RenderingSaveData } from '@/stores/rendering-store';
import { FontsStoreSave } from '@/stores/fonts-store';
import {
  LocalizationGlobalSaveData,
  LocalizationLocalSaveData,
} from '@/stores/localization-store';

export interface SaveSlot {
  slotType: 'manual' | 'auto';
  id: string;
  saveData: GameSave | null;
  slotNumber: number;
}

export type EmptyGameSave = {
  metadata: SaveSlotMetadata;
  version: string;
};

export type ExtractedGameSave = {
  plugins: {
    [key: string]: any;
  };
  customStores: {
    [key: string]: any;
  };
  skills: SkillsSave;
  screens: ScreenSave;
  main: MainSaveData;
  dialog: DialogSave;
  vm: VMSave;
  audio: AudioSave;
  hud: HudSave;
  inventory: InventorySave;
  quests: QuestLogSave;
  screenObjects: ScreenObjectsStoreSave;
  config: ConfigStoreSave;
  choices: ChoiceTrackingSave;
  rendering: RenderingSaveData;
  fonts: FontsStoreSave;
  localization: LocalizationLocalSaveData;
};

export type GameSave = EmptyGameSave & ExtractedGameSave;

export type GlobalGameSave = {
  achievements: AchievementsSave;
  localization: LocalizationGlobalSaveData;
  settings: GameGlobalSettingsSave;
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
