import { NarratPluginObject } from '../exports/plugins';

export class NarratPlugin<T = any> implements NarratPluginObject<T> {
  onPageLoaded() {}
  onNarratSetup() {}
  onAppMounted() {}
  onAssetsLoaded() {}
  onGameSetup() {}
  onGameStart() {}
  onGameMounted() {}
  onGameDismounted() {}
}
