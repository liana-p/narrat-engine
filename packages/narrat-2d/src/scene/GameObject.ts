import { randomId } from 'narrat';
import * as PIXI from 'pixi.js';
export interface CreateGameObjectOptions {
  node?: PIXI.Container;
  parent?: GameObject;
  scene: Scene;
}

export interface FieldsToSerialise {
  [key: string]: FieldToSerialise;
}
export type FieldToSerialise = true | FieldsToSerialise;
const pixiPropsToSerialise: FieldsToSerialise = {
  x: true,
  y: true,
  scale: {
    x: true,
    y: true,
  },
  rotation: true,
  pivot: {
    x: true,
    y: true,
  },
};

export interface SerialisedScene {
  allObjects: {
    [key: string]: SerialisedGameObject;
  };
  tree: string[];
}

export class Scene {
  public root: GameObject;
  public allObjects: { [key: string]: GameObject } = {};
  public constructor(pixiRoot: PIXI.Container) {
    this.root = new GameObject({ node: pixiRoot, scene: this }, true);
  }

  addObject(obj: GameObject) {
    this.allObjects[obj.id] = obj;
  }

  removeObject(obj: GameObject) {
    delete this.allObjects[obj.id];
  }

  serialise(): SerialisedScene {
    return {
      allObjects: Object.keys(this.allObjects).reduce((acc, key) => {
        acc[key] = this.allObjects[key].serialise();
        console.log(acc[key]);
        return acc;
      }, {} as { [key: string]: SerialisedGameObject }),
      tree: this.root.serialise().children,
    };
  }

  load(serialisedScene: SerialisedScene) {
    this.root = new GameObject(
      { node: new PIXI.Container(), scene: this },
      true,
    );
    this.allObjects = Object.keys(serialisedScene.allObjects).reduce(
      (acc, key) => {
        const serialisedObject = serialisedScene.allObjects[key];
        const obj = GameObject.FromSerialized(serialisedObject, this);
        acc[obj.id] = obj;
        return acc;
      },
      {} as { [key: string]: GameObject },
    );
    this.populateChildren(serialisedScene);
  }

  populateChildren(serialisedScene: SerialisedScene) {
    this.root.populateChildren(serialisedScene.tree);
    for (const key in this.allObjects) {
      this.allObjects[key].populateChildren(
        serialisedScene.allObjects[key].children,
      );
    }
  }

  getObject(id: string) {
    return this.allObjects[id];
  }

  destroy() {
    this.root.destroy();
  }
}
export interface SerialisedGameObject {
  node: Partial<PIXI.Container>;
  children: string[];
  parent?: string;
  components: Component[];
}

export class GameObject {
  public id: string;
  public node: PIXI.Container;
  public components: Component[] = [];
  public children: GameObject[] = [];
  public parent?: GameObject;
  public scene: Scene;

  constructor(options: CreateGameObjectOptions, root?: boolean) {
    this.id = randomId();
    this.node = options.node ?? new PIXI.Container();
    this.parent = options.parent;
    this.scene = options.scene;
    if (this.parent) {
      this.parent.addChild(this);
    } else if (!root) {
      this.scene.root.addChild(this);
    }
    if (!root) {
      this.scene.addObject(this);
    }
  }

  destroy() {
    for (const child of this.children) {
      child.destroy();
    }
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.scene.removeObject(this);
    this.node.destroy();
  }

  addChild(child: GameObject) {
    this.children.push(child);
    this.node.addChild(child.node);
    child.parent = this;
  }

  setParent(parent: GameObject) {
    this.parent?.removeChild(this);
    this.parent = parent;
    parent.addChild(this);
  }

  removeChild(child: GameObject) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      this.node.removeChild(child.node);
    }
  }

  serialise(): SerialisedGameObject {
    return {
      node: this.serialisePixiNode(),
      children: this.children.map((child) => child.id),
      parent: this.parent?.id,
      components: this.components,
    };
  }

  serialisePixiNode() {
    const node = this.node;
    return serialiseObject(node, pixiPropsToSerialise);
  }

  populateChildren(serialisedChildren: string[]) {
    this.children = serialisedChildren.map((childId) =>
      this.scene.getObject(childId),
    );
    this.children.forEach((child) => {
      child.parent = this;
      this.node.addChild(child.node);
    });
  }

  static FromSerialized(
    serialised: SerialisedGameObject,
    scene: Scene,
  ): GameObject {
    const obj = new GameObject({ scene });
    obj.components = serialised.components;
    deserialiseObject(obj.node, serialised.node);
    return obj;
  }
}

export class Component {}

function serialiseObject(obj: any, fields: FieldsToSerialise) {
  const res: any = {};
  for (const key in fields) {
    if (fields[key] === true) {
      res[key] = obj[key];
    } else {
      res[key] = serialiseObject(obj[key], fields[key] as FieldsToSerialise);
    }
  }
  return res;
}
function deserialiseObject(obj: any, serialised: any) {
  for (const key in serialised) {
    if (typeof serialised[key] === 'object') {
      if (!obj[key] || typeof obj[key] !== 'object') {
        obj[key] = {};
      }
      deserialiseObject(obj[key], serialised[key]);
    } else {
      obj[key] = serialised[key];
    }
  }
}
