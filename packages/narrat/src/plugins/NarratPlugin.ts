import { NarratPluginObject } from '../exports/plugins';

export class NarratPlugin<T = any> implements NarratPluginObject<T> {
  pluginId: string = 'narrat-plugin';
  onPageLoaded() {}
  onNarratSetup() {}
  onAppMounted() {}
  onAssetsLoaded() {}
  onGameSetup() {}
  onStartScreenMounted() {}
  onGameStart() {}
  onGameMounted() {}
  onGameUnmounted() {}
}
