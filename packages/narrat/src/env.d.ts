/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_DATA_PATH: string;
  readonly VITE_BASE_ASSET_PATH: string;
  readonly VITE_DEMO_BUILD: string;
  readonly VITE_DEBUG: string;
  readonly VITE_BUILD_DATE: string;
  readonly VITE_BUILD_VERSION: string;
  // more env variables...
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
