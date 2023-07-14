import { Config, defaultConfig } from '@/config/config-output';
import { acceptHMRUpdate, defineStore } from 'pinia';
import deepmerge from 'deepmerge';

export type ConfigStoreSave = {
  playerCharacter: string;
  gameCharacter: string;
};

export const useConfig = defineStore('config', {
  state: () => {
    const config: Config = defaultConfig;
    return {
      config,
    };
  },
  actions: {
    async setConfig(config: Config) {
      this.config = config;
    },
    extendConfig(config: Partial<Config>) {
      this.config = deepmerge(this.config, config);
    },
    generateSaveData(): ConfigStoreSave {
      return {
        playerCharacter: this.playerCharacter,
        gameCharacter: this.gameCharacter,
      };
    },
    loadSaveData(saveData: ConfigStoreSave) {
      this.config.characters.config.playerCharacter = saveData.playerCharacter;
      this.config.characters.config.gameCharacter = saveData.gameCharacter;
    },
  },
  getters: {
    playerCharacter(): string {
      return this.config.characters.config.playerCharacter ?? 'player';
    },
    gameCharacter(): string {
      return this.config.characters.config.gameCharacter ?? 'game';
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfig, import.meta.hot));
}
