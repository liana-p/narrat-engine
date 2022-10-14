/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_DATE: string;
  readonly VITE_BUILD_VERSION: string;
  readonly VITE_PLUGIN_NAME: string;
  // more env variables...
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
