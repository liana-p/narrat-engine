import type { ConfigInput } from '../config/config-input';

export type NarratModule = {
  code: string;
  fileName: string;
  id: string;
  type: 'script' | 'yaml';
};

export type NarratScript = NarratModule & {
  type: 'script';
};
export type NarratYaml = NarratModule & {
  type: 'yaml';
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
