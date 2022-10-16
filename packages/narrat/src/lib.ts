import { App } from 'vue';

import 'es6-promise/auto';

export * from '@/main';

export type Narrat = {
  app: App;
};

declare global {
  export interface Window {
    narrat: Narrat;
  }
}

export * from '@/exports/plugins';
export * from '@/exports/display';
export * from '@/exports/config';
export * from '@/exports/events';
export * from '@/exports/stores';
export * from '@/exports/others';
export * from '@/exports/components';
export * from '@/exports/utils';
