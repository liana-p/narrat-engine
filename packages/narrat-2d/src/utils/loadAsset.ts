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

export function getSpritesheet(name: string): PIXI.Spritesheet {
  return PIXI.Loader.shared.resources[name].spritesheet!;
}

export function getAnimation(spritesheet: string, animation: string) {
  return getSpritesheet(spritesheet).animations[animation];
}
