import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import NarratPlugin from 'vite-plugin-narrat';

import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS(), NarratPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
