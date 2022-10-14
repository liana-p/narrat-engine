import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';
import packageJson from './package.json';

// https://vitejs.dev/config/
process.env.VITE_BUILD_DATE = new Date().toISOString();
process.env.VITE_BUILD_VERSION = packageJson?.version ?? 'Unknown';
process.env.VITE_PLUGIN_NAME = packageJson?.name ?? 'Unknown plugin';

export default defineConfig({
  plugins: [vue()],
  base: '',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/plugin.ts'),
      name: 'narrat-plugin-counter',
      fileName: (format) => `narrat-plugin-counter.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'narrat', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
          narrat: 'narrat',
          pinia: 'pinia',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
