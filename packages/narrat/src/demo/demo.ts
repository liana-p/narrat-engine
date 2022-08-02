import { startApp } from '@/main';

// This config is there to enable playing different demo games based on environment variables.
// It is also used to build the different demos.
// There is one path for assets and one for other data files. This allows us to reuse assets in the demo (for git LFS storage limits...)
const argsAssetPath = import.meta.env.VITE_BASE_ASSET_PATH;
const argsDataPath = import.meta.env.VITE_BASE_DATA_PATH;
const assetsPath = typeof argsAssetPath === 'string' ? argsAssetPath : '';
const dataPath = typeof argsDataPath === 'string' ? argsDataPath : '';

let debug = true;
if (import.meta.env.VITE_DEMO_BUILD && !import.meta.env.VITE_DEBUG) {
  debug = false;
}

const onPageLoad = () => {
  startApp({
    baseAssetsPath: assetsPath,
    baseDataPath: dataPath,
    charactersPath: `${dataPath}data/characters.yaml`,
    configPath: `${dataPath}data/config.yaml`,
    logging: false,
    debug,
  });
};
window.addEventListener('load', onPageLoad);
