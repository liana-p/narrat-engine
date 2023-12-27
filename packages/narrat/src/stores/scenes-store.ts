import { defineStore, acceptHMRUpdate } from 'pinia';
import { SceneConfig } from '@/scenes/scene-types';

export interface ScenesStoreState {
  scenes: Record<string, SceneConfig>;
  currentOptions: Record<string, any>;
  activeScene: string;
}

export interface ScenesStoreSave {
  activeScene: string;
  currentOptions?: Record<string, any>;
}

export const useScenes = defineStore('scenes-store', {
  state: () =>
    ({
      scenes: {},
      activeScene: 'engine-splash',
      currentOptions: {},
    }) as ScenesStoreState,
  getters: {
    isPlaying(state) {
      return (
        state.activeScene !== 'engine-splash' &&
        state.activeScene !== 'game-splash' &&
        state.activeScene !== 'start-menu'
      );
    },
  },
  actions: {
    generateSaveData(): ScenesStoreSave {
      return {
        activeScene: this.activeScene,
      };
    },
    loadSaveData(saveData: ScenesStoreSave) {
      // this.activeScene = saveData.activeScene;
    },
    changeScene(newScene: string, options?: Record<string, any>) {
      const currentScene = this.activeScene;
      if (currentScene && currentScene !== newScene) {
        const currentSceneConfig = this.scenes[currentScene];
        if (currentSceneConfig.onLeaving) {
          currentSceneConfig.onLeaving();
        }
        this.currentOptions = {};
        this.activeScene = newScene;
        this.currentOptions = options || {};
        if (this.scenes[newScene].onStarting) {
          this.scenes[newScene].onStarting!();
        }
      }
    },
    getSceneConfig(sceneId: string) {
      return this.scenes[sceneId];
    },
    onEngineSplashFinished() {
      this.changeScene('game-splash');
    },
    finishedScene(sceneId: string) {
      if (this.scenes[sceneId].onFinished) {
        this.scenes[sceneId].onFinished!();
      }
    },
    addNewScene(sceneConfig: SceneConfig) {
      this.scenes[sceneConfig.id] = sceneConfig;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScenes, import.meta.hot));
}
