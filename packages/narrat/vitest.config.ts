/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';
import { fileURLToPath, URL } from 'url';

// eslint-disable-next-line import/no-default-export -- by design
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
