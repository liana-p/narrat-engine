export interface AppOptions {
  baseAssetsPath: string;
  baseDataPath: string;
  charactersPath: string;
  configPath: string;
  logging: boolean;
  debug: boolean;
}

export type AppOptionsInput = Partial<AppOptions>;
