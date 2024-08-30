import { useVM } from '@/stores/vm-store';
import { useMain } from '@/stores/main-store';
import { extractSaveData, loadAllSaveData } from '@/stores/stores-management';
import {
  ChosenSlot,
  ExtractedSave,
  getSaveFile,
  manualSave,
  processAutoSave,
} from '@/utils/save-helpers';
import { getPlayTime } from '@/utils/time-helpers';
import { error } from '@/utils/error-handling';
import { useNotifications } from '@/stores/notification-store';
import { getCommonConfig } from '@/config';

export function autoSaveGame({
  slotId,
  name,
}: {
  slotId?: string;
  name?: string;
}) {
  const main = useMain();
  const slot = slotId ?? main.saveSlot;
  main.saveData = processAutoSave({
    slot,
    name,
    extractedSave: extractSaveData(),
  });
  useMain().triggerAutosaveFeedback();
}

export function setupLoadedData(save: ExtractedSave) {
  loadAllSaveData(save);
}

export function resetGlobalSave() {
  useVM().globalData = {};
  getSaveFile().globalSave.data = {};
  autoSaveGame({});
}

export function startManualSave({
  saveName,
  withPrompt,
}: {
  saveName?: string;
  withPrompt?: boolean;
}) {
  return new Promise<void>((resolve) => {
    if (useVM().hasJumped) {
      useMain().startManualSave(resolve, saveName, withPrompt);
    } else {
      // We only save if we've jumped at least once
      resolve();
    }
  });
}

export function finishManualSave(slotData: ChosenSlot | null, yes: boolean) {
  const main = useMain();
  if (!main.saving) {
    error('No saving in progress!');
    return;
  }
  if (!yes || !slotData) {
    main.cancelManualSave();
    return;
  }
  if (main.saveData) {
    manualSave(
      main.saveData,
      getPlayTime(main.playTime.start, main.playTime.previousPlaytime),
      slotData!.slotId,
      main.saving?.name,
    );
    main.alert('Success', 'Game saved!');
  } else {
    error('There was no data to save!');
  }
  main.cancelManualSave();
}
