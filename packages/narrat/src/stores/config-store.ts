import { ConfigInput, ConfigInputSchema } from '@/config/config-input';
import { Config, defaultConfig } from '@/config/config-output';
import { AppOptions } from '@/types/app-types';
import { loadDataFile } from '@/utils/ajax';
import { defineStore } from 'pinia';
import Ajv from 'ajv';
import { error } from '@/utils/error-handling';

export const useConfig = defineStore('config', {
  state: () => {
    const config: Config = defaultConfig;
    return config;
  },
  actions: {
    async loadConfig(options: AppOptions) {
      const userConfig = await loadDataFile<ConfigInput>(options.configPath);
      if (options.baseAssetsPath) {
        userConfig.baseAssetsPath = options.baseAssetsPath;
      }
      if (options.baseDataPath) {
        userConfig.baseDataPath = options.baseDataPath;
      }
      const ajv = new Ajv();
      const result = ajv.validate(ConfigInputSchema, userConfig);
      if (!result) {
        error(`Config file validation failed.`);
        console.log(ajv.errors);
        error(ajv.errorsText());
        return;
      }
      await this.setupConfig(userConfig);
    },
    async setupConfig(configFile: ConfigInput) {},
  },
});
