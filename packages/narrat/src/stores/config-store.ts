import { Config, defaultConfig } from '@/config/config-output';
import { defineStore } from 'pinia';
import deepmerge from 'deepmerge';

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
  },
});
