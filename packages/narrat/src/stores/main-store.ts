import { AppOptions } from '@/types/app-types';
import { GameSave, GlobalGameSave, SaveSlot } from '@/types/game-save';
import { audioEvent, loadAudioAssets } from '@/utils/audio-loader';
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
import { acceptHMRUpdate, defineStore } from 'pinia';
import {
  audioConfig,
  getAchievementsConfig,
  getConfig,
  itemsConfig,
  questsConfig,
  skillsConfig,
} from '../config';
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
import { useScreenObjects } from './screen-objects-store';
import { useAchievements } from './achievements-store';
import { useSettings } from './settings-store';
import { useConfig } from './config-store';

export function defaultAppOptions(): AppOptions {
  return {
    baseAssetsPath: '',
    baseDataPath: '',
    configPath: 'data/config.json',
    logging: false,
    debug: false,
    scripts: [],
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
  paused: boolean;
  loading: {
    step: string;
    percentage: number;
    loaded: boolean;
  };
  debugMode: boolean;
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
  saveData?: {
    saveSlot: GameSave;
    global: GlobalGameSave;
  };
  listener: MainStoreListener;
  inScript: boolean;
}

export interface MainSaveData {
  playTime: number;
}

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
      paused: false,
      debugMode: true,
      options: {
        baseAssetsPath: '',
        baseDataPath: '',
        configPath: 'data/config.json',
        logging: false,
        debug: false,
        scripts: [],
      },
      loading: {
        step: 'Loading',
        percentage: 0.1,
        loaded: false,
      },
      alerts: [],
      saving: null,
      listener: new MainStoreListener(),
      inScript: false,
    }) as MainState,
  actions: {
    async setup() {
      const config = getConfig();
      const scriptPaths = config.scripts;
      useAudio().setMasterVolume(audioConfig().options.volume ?? 1);
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
      vm.addCustomSettings();
      this.resetAllStores();
    },
    async engineLoading() {
      const imagesLoadWait = loadImages(getConfig());
      const audioWait = loadAudioAssets(audioConfig());
      if (vm.plugins) {
        const pluginPromises: Promise<any>[] = [];
        for (const plugin of vm.plugins) {
          if (plugin.loadingPromises) {
            pluginPromises.push(Promise.all(plugin.loadingPromises));
          }
        }
        if (pluginPromises.length > 0) {
          this.loading.step = 'Plugins';
          this.loading.percentage = 0.3;
          await Promise.all(pluginPromises);
        }
      }
      this.loading.step = 'Images';
      await imagesLoadWait;
      this.loading.percentage = 0.7;
      this.loading.step = 'Audio';
      await audioWait;
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
    startingScript() {
      useInventory().onScriptStart();
      this.inScript = true;
    },
    endingScript() {
      useInventory().onScriptEnd();
      this.inScript = false;
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
          saveSlot = autosave.id;
        }
      }
      this.setSaveSlot(saveSlot);
      this.loadGlobalData();
      this.startMachine();
      useVM().runGame();
    },
    async loadGame(save: SaveSlot, saveSlot: string) {
      if (getConfig().saves.mode === 'manual') {
        const autosave = findAutoSave();
        if (autosave) {
          saveSlot = autosave.id;
        }
      }
      this.setSaveSlot(saveSlot);
      this.startMachine();
      if (save.saveData) {
        this.setLoadedData(save.saveData);
        useAudio().reloadAudio(save.saveData.audio);
        const vm = useVM();
        const runOnReload = getConfig().saves.runOnReload;
        if (typeof runOnReload === 'string') {
          await useVM().runLabelFunction(runOnReload);
        }
        vm.jumpToLabel(save.saveData.vm.lastLabel);
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
    resetGlobalSave() {
      useVM().globalData = {};
      getSaveFile().globalSave.data = {};
      this.autoSaveGame({});
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
        const slot = this.saveData.saveSlot;
        saveSlot(
          {
            ...slot,
            main: {
              ...slot.main,
              playTime: getPlayTime(
                this.playTime.start,
                this.playTime.previousPlaytime,
              ),
            },
            metadata: {
              ...slot.metadata,
              name: this.saving?.name ?? `Manual Save`,
              saveDate: new Date().toISOString(),
            },
          },
          this.saveData.global,
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
      if (audioConfig().options.defaultMusic) {
        useAudio().playChannel('music', audioConfig().options.defaultMusic!, 0);
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
      this.paused = false;
      useVM().reset();
      useAudio().reset();
      this.resetAllStores();
      this.playing = false;
      this.ready = true;
      vm.plugins.forEach((plugin) => {
        if (plugin.reset) {
          plugin.reset();
        }
      });
    },
    resetAllStores() {
      const screens = useScreens();
      const config = getConfig();
      useScreenObjects().reset();
      screens.reset(config);
      const skillsStore = useSkills();
      skillsStore.reset(skillsConfig());
      const hudStore = useHud();
      hudStore.setupHudStats(config.hudStats);
      const inventoryStore = useInventory();
      inventoryStore.reset(itemsConfig().items);
      const achievementsStore = useAchievements();
      achievementsStore.reset(getAchievementsConfig().achievements);
      const questsStore = useQuests();
      questsStore.reset(questsConfig());
      const settingsStore = useSettings();
      settingsStore.reset(getConfig());
      useDialogStore().reset();
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
      if (existingSave && existingSave.saveData) {
        metadata.name = existingSave.saveData.metadata.name;
      } else {
        metadata.name = name ?? `Auto Save`;
      }
      if (getConfig().saves.mode === 'manual') {
        metadata.name = 'Auto Save';
      }
      const screensStore = useScreens();
      const skillsStore = useSkills();
      const dialogStore = useDialogStore();
      const vmStore = useVM();
      const mainStore = useMain();
      const hudStore = useHud();
      const audioStore = useAudio();
      const inventoryStore = useInventory();
      const vmSave = vmStore.generateSaveData();
      const achievementsStore = useAchievements();
      const save: GameSave = {
        version: CURRENT_SAVE_VERSION,
        screen: screensStore.generateSaveData(),
        skills: skillsStore.generateSaveData(),
        dialog: dialogStore.generateSaveData(),
        vm: vmSave.vmSave,
        main: mainStore.generateSaveData(),
        hud: hudStore.generateSaveData(),
        audio: audioStore.generateSaveData(),
        inventory: inventoryStore.generateSaveData(),
        quests: useQuests().generateSaveData(),
        metadata,
        settings: useSettings().generateSaveData(),
        screenObjects: useScreenObjects().generateSaveData(),
        config: useConfig().generateSaveData(),
      };
      vm.plugins.forEach((plugin) => {
        if (plugin.save) {
          save[plugin.pluginId] = plugin.save();
        }
      });
      // Add save data from potential custom stores
      vm.customStores().forEach(([storeName, store]) => {
        if (store.save) {
          const saveData = store.save();
          if (saveData) {
            (save as any)[storeName] = saveData;
          }
        }
      });
      const globalSaveFile = getSaveFile().globalSave;
      globalSaveFile.data = vmSave.globalData;
      globalSaveFile.achievements = achievementsStore.generateSaveData();
      this.saveData = {
        saveSlot: save,
        global: globalSaveFile,
      };
      saveSlot(save, globalSaveFile, this.saveSlot);
    },
    loadGlobalData() {
      const globalSaveFile = getSaveFile().globalSave;
      const achievementsStore = useAchievements();
      achievementsStore.loadSaveData(globalSaveFile.achievements);
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
      this.loadGlobalData();
      useScreenObjects().loadSaveData(save.screenObjects);
      useConfig().loadSaveData(save.config);
      screensStore.loadSaveData(save.screen);
      skillsStore.loadSaveData(save.skills);
      dialogStore.loadSaveData(save.dialog);
      vmStore.loadSaveData(save.vm, getSaveFile().globalSave);
      mainStore.loadSaveData(save.main);
      hudStore.loadSaveData(save.hud);
      audioStore.loadSaveData(save.audio);
      inventoryStore.loadSaveData(save.inventory);
      useSettings().loadSaveData(save.settings);
      // Load save data from potential custom stores
      useQuests().loadSaveData(save.quests);
      vm.plugins.forEach((plugin) => {
        if (plugin.load && save[plugin.pluginId]) {
          plugin.load(save[plugin.pluginId]);
        }
      });
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
        sprites: useScreenObjects(),
        settings: useSettings(),
      };
    },
    overrideStates(override: any) {
      const states: any = this.getAllStates();
      for (const key in override) {
        const stateOverride = override[key];
        Object.assign(states[key], stateOverride);
      }
    },
    exitGame() {
      window.close();
    },
  },
  getters: {
    isInGame(state) {
      return state.flowState === 'playing';
    },
    totalPlayTime(state) {
      return getPlayTime(state.playTime.start, state.playTime.previousPlaytime);
    },
    sessionPlayTime(state) {
      return getPlayTime(state.playTime.start, 0);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMain, import.meta.hot));
}
