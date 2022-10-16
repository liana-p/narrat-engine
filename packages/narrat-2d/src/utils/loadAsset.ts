import * as PIXI from 'pixi.js';

export async function preloadAssets(assets: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    for (const asset of assets) {
      PIXI.Loader.shared.add(asset);
    }
    PIXI.Loader.shared.load((loader, resources) => {
      resolve(resources);
    });
  });
}
