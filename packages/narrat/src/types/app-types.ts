import type { ConfigInput } from '../config/config-input';

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
  container?: HTMLElement | string;
  configs?: {
    [Key in keyof ConfigInput]: ConfigInput[Key];
  };
}

export type AppOptionsInput = Partial<AppOptions>;
