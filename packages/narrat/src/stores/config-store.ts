import { Config, defaultConfig } from '@/config/config-output';
import { acceptHMRUpdate, defineStore } from 'pinia';
import deepmerge from 'deepmerge';
import { DeepPartial } from '@/utils/type-utils';

export type ConfigStoreSave = {
  playerCharacter: string;
  gameCharacter: string;
};

export interface ConfigModule {
  id: string;
  code: string;
}
export interface ConfigStore {
  config: Config;
  // Record of modules being used for live reload, keyed by file id
  configModules: Record<string, ConfigModule>;
}

export const useConfig = defineStore('config', {
  state: () => {
    const config: Config = defaultConfig;
    return {
      config,
      configModules: {},
    } as ConfigStore;
  },
  actions: {
    async setConfig(config: Config) {
      this.config = config;
    },
    extendConfig(config: DeepPartial<Config>) {
      this.config = deepmerge(this.config, config) as Config;
    },
    generateSaveData(): ConfigStoreSave {
      return {
        playerCharacter: this.playerCharacter,
        gameCharacter: this.gameCharacter,
      };
    },
    addConfigModule(key: string, module: ConfigModule) {
      this.configModules[key] = module;
    },
    reloadConfigModule(module: ConfigModule) {
      const key = Object.keys(this.configModules).find((key) => {
        return this.configModules[key].id === module.id;
      });
      if (!key) {
        return;
      }
      this.configModules[key] = module;
      const configValue = (this.config as any)[key];
      if (configValue) {
        (this.config as any)[key] = deepmerge(configValue, module.code) as any;
      }
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
