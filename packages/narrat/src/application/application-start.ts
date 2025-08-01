import { audioConfig, getConfig } from '@/config';
import { useVM } from '@/stores/vm-store';
import { useAudio } from '@/stores/audio-store';
import { useMain } from '@/stores/main-store';
import { loadAudioAssets } from '@/utils/audio-loader';
import { loadImages } from '@/utils/images-loader';
import { vm } from '@/vm/vm';
import { useMenu } from '@/stores/menu-store';
import { isPromise } from '@/utils/type-utils';
import { loadGlobalSaveData, resetAllStores } from '@/stores/stores-management';
import { loadVideos } from '@/utils/video-loader';
import { getSaveFile } from '@/utils/save-helpers';

export async function setupEngine() {
  const config = getConfig();
  const scriptPaths = config.scripts;
  useAudio().setMasterVolume(audioConfig().options.volume ?? 1);
  await useVM().loadScripts(scriptPaths);
  useMenu().setup();
  for (const [, store] of vm.customStores()) {
    if (store.setup) {
      // For some reason typescript isn't getting this type right, so we're checking if it's a promise at runtime
      const setup = store.setup();
      if (isPromise(setup)) {
        await setup;
      }
    }
  }
  vm.addCustomSettings();
  resetAllStores();
  loadGlobalSaveData(getSaveFile().globalSave);
}

export async function preloadAndSetupGame() {
  const main = useMain();
  const imagesLoadWait = loadImages(getConfig());
  const videoLoadWait = loadVideos(getConfig());
  const audioWait = loadAudioAssets(audioConfig());
  if (vm.plugins) {
    const pluginPromises: Promise<any>[] = [];
    for (const plugin of vm.plugins) {
      if (plugin.loadingPromises) {
        pluginPromises.push(Promise.all(plugin.loadingPromises));
      }
    }
    if (pluginPromises.length > 0) {
      main.setLoadingStep('narrat.loading.plugins', 0.0);
      await Promise.all(pluginPromises);
    }
  }
  main.setLoadingStep('narrat.loading.assets', 0.3);
  await Promise.all([imagesLoadWait, videoLoadWait, audioWait]);
  vm.callHook('onAssetsLoaded');
  main.setLoadingStep('narrat.loading.starting', 0.9);
  await setupEngine();
  vm.callHook('onGameSetup');
  main.gameLoaded();
}
