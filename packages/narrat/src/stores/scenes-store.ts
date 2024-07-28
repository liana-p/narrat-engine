import { defineStore, acceptHMRUpdate } from 'pinia';
import { SceneConfig, SceneKey } from '@/scenes/scene-types';
import { getCommonConfig } from '@/config';
import { BuiltInScene } from '@/scenes/default-scenes';

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
      activeScene: BuiltInScene.EngineSplash,
      currentOptions: {},
    }) as ScenesStoreState,
  getters: {
    isPlaying(state) {
      return (
        state.activeScene !== BuiltInScene.EngineSplash &&
        state.activeScene !== BuiltInScene.GameSplash &&
        state.activeScene !== BuiltInScene.StartMenu
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
    changeScene(
      newScene: string | BuiltInScene,
      options?: Record<string, any>,
    ) {
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
      this.goToGameSplashScene();
    },
    finishedScene(sceneId: string) {
      if (this.scenes[sceneId].onFinished) {
        this.scenes[sceneId].onFinished!();
      }
    },
    goToGameSplashScene() {
      let destination = BuiltInScene.GameSplash as string;
      if (getCommonConfig().scenes.gameSplashScene) {
        destination = getCommonConfig().scenes.gameSplashScene!;
      }
      this.changeScene(destination);
    },
    goToStartMenuScene() {
      let destination = BuiltInScene.StartMenu as string;
      if (getCommonConfig().scenes.startMenuScene) {
        destination = getCommonConfig().scenes.startMenuScene!;
      }
      this.changeScene(destination);
    },
    goToGameScene() {
      let destination = BuiltInScene.Playing as string;
      if (getCommonConfig().scenes.gameScene) {
        destination = getCommonConfig().scenes.gameScene!;
      }
      this.changeScene(destination);
    },
    addNewScene(sceneConfig: SceneConfig) {
      this.scenes[sceneConfig.id] = sceneConfig;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScenes, import.meta.hot));
}
