import { audioEvent } from '@/utils/audio-loader';
import { deepCopy } from '@/utils/data-helpers';
import { error, warning } from '@/utils/error-handling';
import { getImage } from '@/utils/images-loader';
import { randomId } from '@/utils/randomId';
import { defineStore } from 'pinia';
import { useVM } from './vm-store';

export interface SpriteState {
  _entityType: 'sprite';
  id: string;
  x: number;
  y: number;
  anchor: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  image: string;
  opacity: number;
  scale: number;
  layer: number;
  cssClass?: string;
  onClick?: string;
  clickMethod?: 'jump' | 'run';
}

export interface SpriteStoreState {
  sprites: SpriteState[];
}

export type SpriteStoreSave = {
  sprites: SpriteState[];
};

export function isSprite(entity: any): entity is SpriteState {
  return (
    typeof entity === 'object' &&
    entity !== null &&
    entity._entityType === 'sprite'
  );
}

export const useSprites = defineStore('sprites', {
  state: () =>
    ({
      sprites: [],
    } as SpriteStoreState),
  actions: {
    createSprite(image: string, x: number, y: number) {
      const id = randomId();
      const sprite: SpriteState = {
        _entityType: 'sprite',
        id,
        x,
        y,
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        image,
        opacity: 1,
        scale: 1,
        layer: 0,
        width: 1,
        height: 1,
      };
      this.sprites.push(sprite);
      getImage(image).then((image) => {
        const newSprite = this.getSprite(sprite.id)!;
        if (newSprite) {
          newSprite.width = image.width;
          newSprite.height = image.height;
        }
      });
      return sprite;
    },
    addSprite(sprite: SpriteState) {
      this.sprites.push(sprite);
    },
    getSprite(id: string) {
      return this.sprites.find((sprite) => sprite.id === id);
    },
    deleteSprite(sprite: SpriteState) {
      const index = this.sprites.indexOf(sprite);
      if (index === -1) {
        warning(`Sprite ${sprite.id} not found in sprites store`);
        return;
      }
      this.sprites.splice(index, 1);
    },
    clickSprite(sprite: SpriteState) {
      if (sprite.onClick) {
        audioEvent('onSpriteClicked');
        if (sprite.clickMethod === 'run') {
          useVM().runThenGoBackToPreviousDialog(sprite.onClick, true);
        } else if (sprite.clickMethod === 'jump' || !sprite.clickMethod) {
          useVM().jumpToLabel(sprite.onClick);
        } else {
          error(`Unknown sprite click method ${sprite.clickMethod}`);
        }
      }
    },
    generateSaveData(): SpriteStoreSave {
      return {
        sprites: deepCopy(this.sprites),
      };
    },
    loadSaveData(data: SpriteStoreSave) {
      this.sprites = data.sprites;
    },
    reset() {
      this.sprites = [];
    },
  },
});
