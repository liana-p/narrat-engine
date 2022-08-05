import { AppOptions } from '@/types/app-types';
import { GameSave } from '@/types/game-save';
import { getFile, loadDataFile } from '@/utils/ajax';
import { audioEvent, loadAudioAssets } from '@/utils/audio-loader';
import { setCharactersConfig } from '@/utils/characters';
import { loadImages } from '@/utils/images-loader';
import { error } from '@/utils/error-handling';
import { randomId } from '@/utils/randomId';
import {
  ChosenSlot,
  CURRENT_SAVE_VERSION,
  findAutoSave,
  generateMetadata,
  getSaveFile,
  getSaveSlot,
  saveSlot,
  setSaveSlot,
} from '@/utils/save-helpers';
import { getPlayTime } from '@/utils/time-helpers';
import { playerAnswered, vm } from '@/vm/vm';
import { defineStore } from 'pinia';
import { getConfig } from '../config';
import { useAudio } from './audio-store';
import { useDialogStore } from './dialog-store';
import { useHud } from './hud-stats-store';
import { useInventory } from './inventory-store';
import { useNotifications } from './notification-store';
import { useQuests } from './quest-log';
import { useRenderingStore } from './rendering-store';
import { useScreens } from './screens-store';
import { useSkills } from './skills';
import { useVM } from './vm-store';
import { TypedEmitter } from '@/utils/typed-emitter';
import { isPromise } from '@/utils/type-utils';
import { useMenu } from './menu-store';
import { CharactersConfigFile } from '@/types/character-types';

export function defaultAppOptions(): AppOptions {
  return {
    baseAssetsPath: '',
    baseDataPath: '',
    charactersPath: 'data/characters.json',
    configPath: 'data/config.json',
    logging: false,
    debug: false,
  };
}

export interface MainEvents {
  gameLoaded: () => void;
}
export class MainStoreListener extends TypedEmitter<MainEvents> {}
export interface ErrorState {
  text: string;
  type: 'error' | 'warning' | 'info';
}

interface MainState {
  ready: boolean;
  playing: boolean;
  errors: ErrorState[];
  playTime: {
    start: number;
    previousPlaytime: number;
  };
  saveSlot: string;
  options: AppOptions;
  flowState: 'engine-splash' | 'game-splash' | 'menu' | 'playing';
  modal: string | false;
  paused: boolean;
  loading: {
    step: string;
    percentage: number;
    loaded: boolean;
  };
  alerts: {
    title: string;
    text: string;
    resolver: () => void;
    id: string;
  }[];
  saving: {
    withPrompt?: boolean;
    name?: string;
    resolver: () => void;
  } | null;
  saveData?: GameSave;
  listener: MainStoreListener;
}

export interface MainSaveData {
  playTime: number;
}

// Create a pinia store named main with a state using the type MainState, with actions:
// createError(text: string): Adds an error to the errors state
// clearErrors(): Clears the errors state
// setFlowState(flowState: 'menu' | 'playing'): Sets the flow state to the given value
// openModal(modal: string): Sets the open modal state to the given value
// closeModal(): Sets the open modal state to false
// toggleMenu(): Toggles the flow state to 'playing' or 'menu'
// pause(): Sets the paused state to true
// unpause(): Sets the paused state to false
// setOptions(options: AppOptions): Sets the options state to the given value
// startPlaying(): Sets the playing state to true, sets the play time start to the current time
// reset(): Resets the state to its default values
// generateSaveData(): Function that generates a MainState object from the data in the state
// loadSaveData(data: MainState): Function that loads the data into the state using a deepmerge of current state value and new value
export const useMain = defineStore('main', {
  state: () =>
    ({
      ready: false,
      playing: false,
      errors: [],
      playTime: {
        start: 0,
        previousPlaytime: 0,
      },
      saveSlot: '',
      flowState: 'engine-splash',
      modal: false,
      paused: false,
      options: {
        baseAssetsPath: '',
        baseDataPath: '',
        charactersPath: 'data/characters.json',
        configPath: 'data/config.json',
        logging: false,
        debug: false,
      },
      loading: {
        step: 'Loading',
        percentage: 0.1,
        loaded: false,
      },
      alerts: [],
      saving: null,
      listener: new MainStoreListener(),
    } as MainState),
  actions: {
    async setup() {
      const config = getConfig();
      const scriptPaths = config.scripts;
      useAudio().setMasterVolume(config.audioOptions.volume ?? 1);
      await useVM().loadScripts(scriptPaths);
      useMenu().setup();
      for (const [, store] of vm.customStores()) {
        if (store.setup) {
          // For some reason typescript isn't getting this type right, so we're checking if it's a promise at runtime
          const setup = store.setup();
          if (isPromise(setup)) {
            await setup;
          }
        }
      }
      this.resetAllStores();
    },
    async engineLoading() {
      this.loading.step = 'Characters';
      const charsFile = await loadDataFile<CharactersConfigFile>(
        this.options.charactersPath,
      );
      await setCharactersConfig(charsFile);
      this.loading.percentage = 0.2;
      this.loading.step = 'Data';
      this.loading.percentage = 0.3;
      this.loading.step = 'Images';
      await loadImages(getConfig());
      this.loading.percentage = 0.7;
      this.loading.step = 'Audio';
      await loadAudioAssets(getConfig());
      vm.callHook('onAssetsLoaded');
      this.loading.percentage = 0.95;
      this.loading.step = 'Starting...';
      await this.setup();
      vm.callHook('onGameSetup');
      this.loading.loaded = true;
      this.listener.emit('gameLoaded');
    },
    async alert(title: string, text: string) {
      return new Promise<void>((resolve) => {
        this.alerts.push({
          title,
          text,
          resolver: resolve,
          id: randomId(),
        });
      });
    },
    closeAlert(id: string) {
      const alertIndex = this.alerts.findIndex((alert) => alert.id === id);
      if (alertIndex !== -1) {
        const alert = this.alerts[alertIndex];
        alert.resolver();
        this.alerts.splice(alertIndex, 1);
      }
    },
    startMachine() {
      const audioStore = useAudio();
      audioStore.stopAll();
      audioEvent('onPressStart');

      const vmStore = useVM();
      vmStore.start();
      this.ready = true;
      this.startPlaying();
      vm.callHook('onGameStart');
      this.setFlowState('playing');
    },
    setSaveSlot(slot: string) {
      this.saveSlot = slot;
      setSaveSlot(slot);
    },
    async startGame(saveSlot: string) {
      if (getConfig().saves.mode === 'manual') {
        const autosave = findAutoSave();
        if (autosave) {
          saveSlot = autosave.metadata.id;
        }
      }
      this.setSaveSlot(saveSlot);
      this.startMachine();
      await this.autoSaveGame({ slotId: saveSlot });
      useVM().runGame();
    },
    async loadGame(save: GameSave, saveSlot: string) {
      if (getConfig().saves.mode === 'manual') {
        const autosave = findAutoSave();
        if (autosave) {
          saveSlot = autosave.metadata.id;
        }
      }
      this.setSaveSlot(saveSlot);
      this.startMachine();
      if (save) {
        this.setLoadedData(save);
        useAudio().reloadAudio(save.audio);
        const vm = useVM();
        vm.jumpToLabel(save.vm.lastLabel);
      }
      if (getConfig().saves.mode === 'manual') {
        const autosave = findAutoSave();
        if (autosave) {
          this.setSaveSlot(autosave.metadata.id);
        }
      }
    },
    manualSave({
      saveName,
      withPrompt,
    }: {
      saveName?: string;
      withPrompt?: boolean;
    }) {
      return new Promise<void>((resolve) => {
        if (useVM().hasJumped) {
          this.saving = {
            name: saveName,
            withPrompt,
            resolver: resolve,
          };
        } else {
          resolve();
        }
      });
    },
    finishManualSave(slotData: ChosenSlot | null, yes: boolean) {
      if (!this.saving) {
        error(`Trying to save but there is no saving request!`);
        return;
      }
      if (!yes || !slotData) {
        this.saving.resolver();
        this.saving = null;
        return;
      }
      if (this.saveData) {
        saveSlot(
          {
            ...this.saveData,
            main: {
              ...this.saveData.main,
              playTime: getPlayTime(
                this.playTime.start,
                this.playTime.previousPlaytime,
              ),
            },
            metadata: {
              ...this.saveData.metadata,
              id: slotData.slotId,
              name:
                this.saving?.name ??
                `Manual Save #${getSaveFile().slotsCounter + 1}`,
              slotType: 'manual',
              saveDate: new Date().toISOString(),
              createdCounter: getSaveFile().slotsCounter + 1,
            },
          },
          slotData.slotId,
        );
        this.alert('Success', 'Game saved!');
      } else {
        error('There was no data to save!');
      }
      this.saving.resolver();
      this.saving = null;
    },
    playerAnswered(choice: number | string) {
      playerAnswered(choice);
    },
    menuReturn() {
      this.reset();
      this.setFlowState('menu');
      if (getConfig().audioOptions.defaultMusic) {
        useAudio().playChannel(
          'music',
          getConfig().audioOptions.defaultMusic!,
          0,
        );
      }
    },
    createError(text: string) {
      this.errors.push({
        text,
        type: 'error',
      });
    },
    createWarning(text: string) {
      this.errors.push({
        text,
        type: 'warning',
      });
    },
    clearErrors() {
      this.errors = [];
    },
    setFlowState(flowState: 'menu' | 'playing') {
      this.flowState = flowState;
    },
    openModal(modal: string) {
      this.modal = modal;
    },
    closeModal() {
      this.modal = false;
    },
    toggleMenu() {
      if (this.modal) {
        this.modal = false;
      } else {
        this.modal = 'menu';
      }
    },
    pause() {
      this.paused = true;
    },
    unpause() {
      this.paused = false;
    },
    setOptions(options: AppOptions) {
      this.options = options;
    },
    startPlaying() {
      this.playing = true;
      this.playTime.start = Date.now();
    },
    reset() {
      this.ready = false;
      this.errors = [];
      this.modal = false;
      this.paused = false;
      useVM().reset();
      useAudio().reset();
      this.resetAllStores();
      this.playing = false;
      this.ready = true;
    },
    resetAllStores() {
      const screens = useScreens();
      const config = getConfig();
      screens.setButtons(config);
      const skillsStore = useSkills();
      skillsStore.setupSkills(config.skills);
      const hudStore = useHud();
      hudStore.setupHudStats(config.hudStats);
      const inventoryStore = useInventory();
      inventoryStore.setupItems(config.items);
      const questsStore = useQuests();
      questsStore.setupQuests(config.quests);
      vm.customStores().forEach(([storeName, store]) => {
        if (store.reset) {
          store.reset();
        }
      });
    },
    generateSaveData(): MainSaveData {
      return {
        playTime: getPlayTime(
          this.playTime.start,
          this.playTime.previousPlaytime,
        ),
      };
    },
    loadSaveData(data: MainSaveData) {
      this.playTime.previousPlaytime = data.playTime;
    },
    autoSaveGame({ slotId, name }: { slotId?: string; name?: string }) {
      const slot = slotId ?? this.saveSlot;
      const existingSave = getSaveSlot(slot);
      const metadata = generateMetadata();
      if (existingSave) {
        metadata.name = existingSave.metadata.name;
        metadata.slotType = existingSave.metadata.slotType;
      } else {
        metadata.name = name ?? `Autosave ${getSaveFile().slotsCounter + 1}`;
      }
      if (getConfig().saves.mode === 'manual') {
        metadata.name = 'Autosave';
        metadata.createdCounter = 0;
      }
      metadata.id = slot;
      const screensStore = useScreens();
      const skillsStore = useSkills();
      const dialogStore = useDialogStore();
      const vmStore = useVM();
      const mainStore = useMain();
      const hudStore = useHud();
      const audioStore = useAudio();
      const inventoryStore = useInventory();
      const save: GameSave = {
        version: CURRENT_SAVE_VERSION,
        screen: screensStore.generateSaveData(),
        skills: skillsStore.generateSaveData(),
        dialog: dialogStore.generateSaveData(),
        vm: vmStore.generateSaveData(),
        main: mainStore.generateSaveData(),
        hud: hudStore.generateSaveData(),
        audio: audioStore.generateSaveData(),
        inventory: inventoryStore.generateSaveData(),
        quests: useQuests().generateSaveData(),
        metadata,
      };
      // Add save data from potential custom stores
      vm.customStores().forEach(([storeName, store]) => {
        if (store.save) {
          const saveData = store.save();
          if (saveData) {
            (save as any)[storeName] = saveData;
          }
        }
      });
      this.saveData = save;
      saveSlot(save, this.saveSlot);
    },
    setLoadedData(save: GameSave) {
      const screensStore = useScreens();
      const skillsStore = useSkills();
      const dialogStore = useDialogStore();
      const vmStore = useVM();
      const mainStore = useMain();
      const hudStore = useHud();
      const audioStore = useAudio();
      const inventoryStore = useInventory();
      screensStore.loadSaveData(save.screen);
      skillsStore.loadSaveData(save.skills);
      dialogStore.loadSaveData(save.dialog);
      vmStore.loadSaveData(save.vm);
      mainStore.loadSaveData(save.main);
      hudStore.loadSaveData(save.hud);
      audioStore.loadSaveData(save.audio);
      inventoryStore.loadSaveData(save.inventory);
      // Load save data from potential custom stores
      useQuests().loadSaveData(save.quests);
      vm.customStores().forEach(([storeName, store]) => {
        if (store.load) {
          store.load((save as any)[storeName]);
        }
      });
    },
    getAllStates() {
      return {
        main: this,
        screens: useScreens(),
        skills: useSkills(),
        dialog: useDialogStore(),
        vm: useVM(),
        hud: useHud(),
        audio: useAudio(),
        rendering: useRenderingStore(),
        notifications: useNotifications(),
        inventory: useInventory(),
        quests: useQuests(),
      };
    },
    overrideStates(override: any) {
      const states: any = this.getAllStates();
      for (const key in override) {
        const stateOverride = override[key];
        Object.assign(states[key], stateOverride);
      }
    },
  },
  getters: {
    isInGame(state) {
      return state.flowState === 'playing';
    },
  },
});
