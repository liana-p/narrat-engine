import { startApp } from '@/main';

import defaultGame from '../../examples/games/default/scripts';
import demoGame from '../../examples/games/demo/scripts';
import rpgGame from '../../examples/games/rpg/scripts';
import emptyGame from '../../examples/games/empty/scripts';
import { NarratScript } from '@/types/app-types';

const gameScripts: Record<string, NarratScript[]> = {
  default: defaultGame,
  demo: demoGame,
  rpg: rpgGame,
  empty: emptyGame,
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
