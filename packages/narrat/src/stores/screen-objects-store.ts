import { audioEvent } from '@/utils/audio-loader';
import { deepCopy } from '@/utils/data-helpers';
import { error, warning } from '@/utils/error-handling';
import { getImage } from '@/utils/images-loader';
import { mapObject } from '@/utils/object-iterators';
import { randomId } from '@/utils/randomId';
import { isViewportElementClickable } from '@/utils/viewport-utils';
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
  children: ScreenObjectState[];
  parent?: ScreenObjectState;
  scriptClickable?: boolean;
}
export type ScreenObjectSaveState = Omit<
  ScreenObjectState,
  'children' | 'parent'
> & {
  children: string[];
  parent?: string;
};
export interface SpriteState extends ScreenObjectState {
  _entityType: 'sprite';
  image: string;
}

export interface ScreenObjectsStoreState {
  tree: ScreenObjectState[];
  objectsList: {
    [id: string]: ScreenObjectState;
  };
}

export type ScreenObjectsStoreSave = {
  tree: string[];
  objectsList: {
    [id: string]: ScreenObjectSaveState;
  };
};

const entityTypes: ScreenObjectType[] = ['screenObject', 'sprite'];

export function isScreenObject(entity: any): entity is ScreenObjectState {
  return (
    typeof entity === 'object' &&
    entity !== null &&
    entityTypes.includes(entity._entityType)
  );
}

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
        const parent = object.parent;
        parent.children.push(object);
      } else {
        this.tree.push(object);
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
        const parent = object.parent;
        const index = parent.children.indexOf(object);
        if (index !== -1) {
          parent.children.splice(index, 1);
        } else {
          warning(`Could not find object ${object.id} in parent's children`);
        }
      } else {
        const index = this.tree.indexOf(object);
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
      sprite._entityType = 'sprite';
      getImage(options.image).then((image) => {
        const existingSprite = this.getObject(sprite.id);
        if (existingSprite.width === 1 && existingSprite.height === 1) {
          existingSprite.width = image.width;
          existingSprite.height = image.height;
        }
      });
      return sprite;
    },
    getObject(id: string) {
      return this.objectsList[id];
    },
    clickObject(thing: ScreenObjectState) {
      if (!isViewportElementClickable(thing)) {
        return;
      }
      if (thing.onClick) {
        console.log('click', Date.now());
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
    // Turns objects into objects with string references
    generateSaveData(): ScreenObjectsStoreSave {
      return {
        tree: deepCopy(this.tree.map((el) => el.id)),
        objectsList: deepCopy(
          mapObject(this.objectsList, (obj) => this.screenObjectToSave(obj)),
        ),
      };
    },
    // Loads save data where objects have string references, populating them
    loadSaveData(data: ScreenObjectsStoreSave) {
      this.objectsList = this.loadAllObjects(data.objectsList);
      this.tree = data.tree.map((obj) => this.objectsList[obj]);
    },
    reset() {
      this.tree = [];
      this.objectsList = {};
    },
    // Removes references from objects and turn them to string id refs
    screenObjectToSave(object: ScreenObjectState): ScreenObjectSaveState {
      return {
        ...object,
        children: object.children.map((child) => child.id),
        parent: object.parent ? object.parent.id : undefined,
      };
    },
    // Takes saved data objects (which only have string references) and populate references
    loadAllObjects(objects: { [key: string]: ScreenObjectSaveState }) {
      for (const saveObject of Object.values(objects)) {
        const obj = saveObject as any;
        obj.parent = obj.parent ? objects[obj.parent] : undefined;
        obj.children = obj.children.map((child: any) => objects[child]);
      }
      return objects as any as { [key: string]: ScreenObjectState };
    },
  },
});
