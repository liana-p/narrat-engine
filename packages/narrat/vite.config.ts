import { defineConfig, UserConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import packageJson from './package.json';
import Inspect from 'vite-plugin-inspect';
import Narrat from 'vite-plugin-narrat';
import { createHtmlPlugin } from 'vite-plugin-html';

function viteGodotCorsPlugin() {
  return {
    name: 'configure-response-headers',
    configureServer: (server) => {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        next();
      });
    },
  };
}
function addGodotToConfig(conf: UserConfig) {
  console.log('building a godot game, using special config');
  conf.server = {
    open: '/godot.html',
  };
  conf.plugins.push(viteGodotCorsPlugin());
  conf.plugins.push(
    createHtmlPlugin({
      minify: false,
      template: 'godot.html',
    }),
  );
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Uses env variables to decide if we're building a demo, and if so which one
  process.env.VITE_BUILD_DATE = new Date().toISOString();
  process.env.VITE_BUILD_VERSION = packageJson?.version ?? 'Unknown';
  const isDemoBuild = process.env.VITE_DEMO_BUILD !== undefined;
  let exampleChoice = 'default';
  console.log(
    process.env.VITE_BASE_DATA_PATH,
    process.env.VITE_BASE_ASSET_PATH,
  );
  if (isDemoBuild) {
    exampleChoice = process.env.VITE_DEMO_BUILD;
    console.log(`Building narrat in demo mode: ${exampleChoice}`);
  } else {
    exampleChoice = process.env.VITE_DEMO_GAME ?? 'default';
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
    plugins: [WindiCSS(), vue(), Inspect(), Narrat()],
  };
  if (exampleChoice === 'godot') {
    addGodotToConfig(conf);
  }
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
  return conf;
});
