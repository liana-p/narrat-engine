import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import package from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Uses env variables to decide if we're building a demo, and if so which one
  process.env.VITE_BUILD_DATE = new Date().toISOString();
  process.env.VITE_BUILD_VERSION = package?.version ?? 'Unknown';
  const isDemoBuild = process.env.VITE_DEMO_BUILD !== undefined;
  let exampleChoice = '';
  console.log(
    process.env.VITE_BASE_DATA_PATH,
    process.env.VITE_BASE_ASSET_PATH,
  );
  if (isDemoBuild) {
    exampleChoice = process.env.VITE_DEMO_BUILD;
    console.log(`Building narrat in demo mode: ${exampleChoice}`);
  } else {
    if (!process.env.VITE_BASE_DATA_PATH) {
      process.env.VITE_BASE_DATA_PATH = 'examples/games/default/';
      process.env.VITE_BASE_ASSET_PATH = 'examples/assets/';
    }
    console.log('Building narrat in library mode');
  }
  const conf: UserConfigExport = {
    base: '',
    build: {
      sourcemap: true,
      // cssCodeSplit: true,
      lib: {
        entry: resolve(__dirname, 'src/lib.ts'),
        name: 'narrat',
        fileName: (format) => `narrat.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        plugins: [],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [vue(), WindiCSS()],
  };
  if (command !== 'build') {
    delete conf.build.lib;
  }
  if (isDemoBuild) {
    delete conf.build.lib;
    delete conf.build.rollupOptions;
    delete conf.build.sourcemap;
    delete conf.build.cssCodeSplit;
    conf.build.outDir = `built-example/${exampleChoice}`;
  }
  console.log(conf);
  return conf;
});
