export interface AppOptions {
  baseAssetsPath?: string;
  baseDataPath?: string;
  configPath: string;
  logging?: boolean;
  debug?: boolean;
}

export type AppOptionsInput = Partial<AppOptions>;
