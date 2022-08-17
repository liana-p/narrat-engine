import { Config, defaultConfig } from '@/config/config-output';
import { defineStore } from 'pinia';

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
  },
});
