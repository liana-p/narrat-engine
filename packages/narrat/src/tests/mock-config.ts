import { Config, defaultConfig } from '@/config/config-output';
import { defaultLayoutConfig } from '@/config/layout-config';
import { useConfig } from '@/stores/config-store';

export const mockConfig: Config = defaultConfig;

export const setMockConfig = () => {
  useConfig().setConfig(mockConfig);
};
