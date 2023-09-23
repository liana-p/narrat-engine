import { startApp } from '@/main';

import defaultGame from '@/examples/default/scripts';
import demoGame from '@/examples/demo/scripts';
import rpgGame from '@/examples/rpg/scripts';
import emptyGame from '@/examples/empty/scripts';
import godotGame from '@/examples/godot/scripts';
import { NarratScript } from '@/types/app-types';
import { registerPlugin } from '@/lib';
import { GodotPlugin } from '@/plugins/godot-plugin';

const gameScripts: Record<string, NarratScript[]> = {
  default: defaultGame,
  demo: demoGame,
  rpg: rpgGame,
  empty: emptyGame,
  godot: godotGame,
};

// This config is there to enable playing different demo games based on environment variables.
// It is also used to build the different demos.
// There is one path for assets and one for other data files. This allows us to reuse assets in the demo (for git LFS storage limits...)
const argsAssetPath = import.meta.env.VITE_BASE_ASSET_PATH;
const argsDataPath = import.meta.env.VITE_BASE_DATA_PATH;
const demoChoice =
  import.meta.env.VITE_DEMO_BUILD ??
  import.meta.env.VITE_DEMO_GAME ??
  'default';
const assetsPath = typeof argsAssetPath === 'string' ? argsAssetPath : '';
const dataPath = typeof argsDataPath === 'string' ? argsDataPath : '';
let debug = true;
if (import.meta.env.VITE_DEMO_BUILD && !import.meta.env.VITE_DEBUG) {
  debug = false;
}

const scripts = gameScripts[demoChoice];
const onPageLoad = () => {
  if (demoChoice === 'godot') {
    registerPlugin(new GodotPlugin());
  }
  startApp({
    baseAssetsPath: assetsPath,
    baseDataPath: dataPath,
    configPath: `${dataPath}data/config.yaml`,
    logging: false,
    debug,
    scripts,
  });
};
window.addEventListener('load', onPageLoad);
