import { audioEvent } from '@/utils/audio-loader';
import { deepCopy } from '@/utils/data-helpers';
import { error, warning } from '@/utils/error-handling';
import { getImage } from '@/utils/images-loader';
import { randomId } from '@/utils/randomId';
import { defineStore } from 'pinia';
import { useVM } from './vm-store';

export type ScreenObjectType = 'screenObject' | 'sprite';

export interface ScreenObjectState {
  _entityType: ScreenObjectType;
  id: string;
  name: string;
  tags: string[];
  x: number;
  y: number;
  anchor: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  opacity: number;
  scale: number;
  layer: number;
  cssClass?: string;
  onClick?: string;
  text?: string;
  clickMethod?: 'jump' | 'run';
  children: string[];
  parent?: string;
}
export interface SpriteState extends ScreenObjectState {
  _entityType: 'sprite';
  image: string;
}

export interface ScreenObjectsStoreState {
  tree: string[];
  objectsList: {
    [id: string]: ScreenObjectState;
  };
}

export type ScreenObjectsStoreSave = {
  tree: string[];
  objectsList: {
    [id: string]: ScreenObjectState;
  };
};

export function isSprite(entity: any): entity is SpriteState {
  return (
    typeof entity === 'object' &&
    entity !== null &&
    entity._entityType === 'sprite'
  );
}

export interface CreateSpriteOptions extends CreateObjectOptions {
  image: string;
}

export type CreateObjectOptions = Partial<ScreenObjectState>;

export const useScreenObjects = defineStore('screenObjects', {
  state: () =>
    ({
      tree: [],
      objectsList: {},
    } as ScreenObjectsStoreState),
  actions: {
    addObject(object: ScreenObjectState) {
      if (object.parent) {
        const parent = this.getObject(object.parent);
        parent.children.push(object.id);
      } else {
        this.tree.push(object.id);
      }
      this.objectsList[object.id] = object;
    },
    createObject<
      EntityType extends ScreenObjectState = ScreenObjectState,
      CreationOptions extends CreateObjectOptions = CreateObjectOptions,
    >(options: CreationOptions): EntityType {
      const object: ScreenObjectState = {
        _entityType: 'screenObject',
        id: randomId(),
        name: 'Screen Object',
        tags: [],
        x: 0,
        y: 0,
        anchor: {
          x: 0,
          y: 0,
        },
        width: 1,
        height: 1,
        opacity: 1,
        scale: 1,
        layer: 0,
        children: [],
        ...options,
      };
      this.addObject(object);
      return object as EntityType;
    },
    destroyObject(objectToDestroy: ScreenObjectState | string) {
      let object = objectToDestroy;
      if (typeof object === 'string') {
        object = this.getObject(object);
      }
      for (const child of object.children) {
        this.destroyObject(child);
      }
      if (object.parent) {
        const parent = this.getObject(object.parent);
        const index = parent.children.indexOf(object.id);
        if (index !== -1) {
          parent.children.splice(index, 1);
        } else {
          warning(`Could not find object ${object.id} in parent's children`);
        }
      } else {
        const index = this.tree.indexOf(object.id);
        if (index !== -1) {
          this.tree.splice(index, 1);
        } else {
          warning(`Object to destroy not found in store (${object.id})`);
        }
      }
      delete this.objectsList[object.id];
    },
    createSprite(options: CreateSpriteOptions) {
      const sprite: SpriteState = this.createObject(options);
      getImage(options.image).then((image) => {
        if (sprite.width !== 1 && sprite.height !== 1) {
          sprite.width = image.width;
          sprite.height = image.height;
        }
      });
      return sprite;
    },
    getObject(id: string) {
      return this.objectsList[id];
    },
    clickObject(thing: ScreenObjectState) {
      if (thing.onClick) {
        audioEvent('onSpriteClicked');
        if (thing.clickMethod === 'run') {
          useVM().runThenGoBackToPreviousDialog(thing.onClick, true);
        } else if (thing.clickMethod === 'jump' || !thing.clickMethod) {
          useVM().jumpToLabel(thing.onClick);
        } else {
          error(`Unknown sprite click method ${thing.clickMethod}`);
        }
      }
    },
    generateSaveData(): ScreenObjectsStoreSave {
      return {
        tree: deepCopy(this.tree),
        objectsList: deepCopy(this.objectsList),
      };
    },
    loadSaveData(data: ScreenObjectsStoreSave) {
      this.tree = data.tree;
      this.objectsList = data.objectsList;
    },
    reset() {
      this.tree = [];
      this.objectsList = {};
    },
  },
});
