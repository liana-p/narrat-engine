import {
  Config,
  ConfigKey,
  ConfigModule,
  defaultConfig,
} from '@/config/config-output';
import { acceptHMRUpdate, defineStore } from 'pinia';
import deepmerge from 'deepmerge';
import { DeepPartial } from '@/utils/type-utils';
import { NarratYaml } from '@/types/app-types';

export type ConfigStoreSave = {
  playerCharacter: string;
  gameCharacter: string;
};

export interface ConfigStore {
  config: Config;
  // Record of modules being used for live reload, keyed by file id
  configModules: Record<ConfigKey, ConfigModule>;
  // This needs to be able to be set at runtime just before the game loads, so we store it as its own value
  savePathPrefix: string | null;
}

export const useConfig = defineStore('config', {
  state: () => {
    const config: Config = defaultConfig;
    return {
      config,
      configModules: {},
      savePathPrefix: null,
    } as ConfigStore;
  },
  actions: {
    async setConfig(config: Config) {
      this.config = config;
    },
    setSavePathPrefix(prefix: string) {
      this.savePathPrefix = prefix;
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
    addConfigModule(key: ConfigKey, module: ConfigModule) {
      this.configModules[key] = module;
    },
    findConfigModuleKey(module: NarratYaml) {
      const key = Object.keys(this.configModules).find((key) => {
        return this.configModules[key as ConfigKey].id === module.id;
      }) as ConfigKey | undefined;
      if (!key) {
        return;
      }
      return key;
    },
    reloadConfigModule(key: ConfigKey, value: any) {
      this.configModules[key].code = value;
      this.config[key] = value;
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
