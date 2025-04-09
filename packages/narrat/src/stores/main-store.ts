import { AppOptions } from '@/types/app-types';
import { GameSave, GlobalGameSave } from '@/types/game-save';
import { randomId } from '@/utils/randomId';
import { setSaveSlot } from '@/utils/save-helpers';
import { getPlayTime } from '@/utils/time-helpers';
import { playerAnswered } from '@/vm/vm';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useInventory } from './inventory-store';
import { TypedEmitter } from '@/utils/typed-emitter';
import { useScenes } from './scenes-store';
import { timeout } from '@/utils/promises';
import { getCommonConfig } from '@/config';

export function defaultAppOptions(): AppOptions {
  return {
    baseAssetsPath: '',
    baseDataPath: '',
    configPath: 'data/config.json',
    logging: false,
    debug: false,
    scripts: [],
    container: '#game-holder',
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

export interface MainState {
  ready: boolean;
  playing: boolean;
  errors: ErrorState[];
  playTime: {
    start: number;
    previousPlaytime: number;
  };
  saveSlot: string;
  options: AppOptions;
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
  autosaveFeedback: boolean;
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
      autosaveFeedback: false,
    }) as MainState,
  actions: {
    setLoadingStep(step: string, percentage: number) {
      this.loading.step = step;
      this.loading.percentage = percentage;
    },
    gameLoaded() {
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
    prepareToPlay() {
      this.ready = true;
      this.startPlaying();
      useScenes().goToGameScene();
    },
    setSaveSlot(slot: string) {
      this.saveSlot = slot;
      setSaveSlot(slot);
    },
    startManualSave(
      resolve: () => void,
      saveName?: string,
      withPrompt?: boolean,
    ) {
      this.saving = {
        name: saveName,
        withPrompt,
        resolver: resolve,
      };
    },
    cancelManualSave() {
      if (this.saving) {
        this.saving.resolver();
        this.saving = null;
      }
    },
    playerAnswered(choice: number | string) {
      playerAnswered(choice);
    },
    menuReturn() {
      // this.reset();
      useScenes().goToStartMenuScene();
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
      // this.errors = [];
      this.paused = false;
      this.playing = false;
      this.ready = true;
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
    async triggerAutosaveFeedback() {
      const autosaveFeedback = getCommonConfig().saves.autosaveFeedback;
      if (autosaveFeedback && autosaveFeedback.enabled) {
        this.autosaveFeedback = true;
        await timeout(autosaveFeedback.duration * 1000);
        this.autosaveFeedback = false;
      }
    },
    exitGame() {
      window.close();
    },
  },
  getters: {
    isInGame(state) {
      return useScenes().isPlaying;
    },
    totalPlayTime(state) {
      return getPlayTime(state.playTime.start, state.playTime.previousPlaytime);
    },
    sessionPlayTime(state) {
      return getPlayTime(state.playTime.start, 0);
    },
    hasCustomContainer(state) {
      return (state.options.container ?? '') !== '#game-holder';
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMain, import.meta.hot));
}
