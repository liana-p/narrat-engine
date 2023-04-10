/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';

// eslint-disable-next-line import/no-default-export -- by design
export default defineConfig({
  base: '',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      'src/tests/tests.setup.ts'
    ]
  },
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
