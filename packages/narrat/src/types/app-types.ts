export type NarratScript = {
  code: string;
  fileName: string;
  id: string;
};
export interface AppOptions {
  baseAssetsPath?: string;
  baseDataPath?: string;
  configPath: string;
  scripts: NarratScript[];
  logging?: boolean;
  debug?: boolean;
}

export type AppOptionsInput = Partial<AppOptions>;
