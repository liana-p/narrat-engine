import { randomId } from 'narrat';
import * as PIXI from 'pixi.js';
export interface CreateGameObjectOptions {
  scene: Scene;
  node?: PIXI.Container;
  parent?: GameObject;
  name?: string;
  tags?: string[];
}

export type ComponentTypes = 'Character';

export interface SerialisedReference {
  _type: string;
  _id: string;
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
  allComponents: {
    [key: string]: SerialisedComponent;
  };
  tree: string[];
}

export class Scene {
  public root: GameObject;
  public allObjects: { [key: string]: GameObject } = {};
  public allComponents: { [key: string]: Component } = {};
  public constructor(pixiRoot: PIXI.Container) {
    this.root = new GameObject({ node: pixiRoot, scene: this }, true);
  }

  addObject(obj: GameObject) {
    this.allObjects[obj.id] = obj;
  }

  removeObject(obj: GameObject) {
    delete this.allObjects[obj.id];
  }

  addComponent(component: Component) {
    this.allComponents[component.id] = component;
  }

  removeComponent(component: Component) {
    delete this.allComponents[component.id];
  }

  serialise(): SerialisedScene {
    return {
      allObjects: Object.keys(this.allObjects).reduce((acc, key) => {
        acc[key] = this.allObjects[key].serialise();
        console.log(acc[key]);
        return acc;
      }, {} as { [key: string]: SerialisedGameObject }),
      allComponents: Object.keys(this.allComponents).reduce((acc, key) => {
        acc[key] = this.allComponents[key].serialise();
        console.log(acc[key]);
        return acc;
      }, {} as { [key: string]: SerialisedComponent }),
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
        const obj = GameObject.FromSerialised(serialisedObject, this);
        acc[obj.id] = obj;
        return acc;
      },
      {} as { [key: string]: GameObject },
    );
    this.allComponents = Object.keys(serialisedScene.allComponents).reduce(
      (acc, key) => {
        const serialisedComponent = serialisedScene.allComponents[key];
        const component = Component.FromSerialised(serialisedComponent, this);
        acc[component.id] = component;
        return acc;
      },
      {} as { [key: string]: Component },
    );
    this.populateComponents();
    this.populateGameObjects(serialisedScene);
  }

  populateGameObjects(serialisedScene: SerialisedScene) {
    this.root.populateObjectFromLoadedData(serialisedScene.tree);
    for (const key in this.allObjects) {
      this.allObjects[key].populateObjectFromLoadedData(
        serialisedScene.allObjects[key].children,
      );
    }
  }

  populateComponents() {
    for (const key in this.allComponents) {
      const component = this.allComponents[key];
      component.data = deserialiseData(component.data, this);
    }
  }

  getObject(id: string) {
    return this.allObjects[id];
  }

  getComponent(id: string) {
    return this.allComponents[id];
  }

  destroy() {
    this.root.destroy();
  }
}
export interface SerialisedGameObject {
  id: string;
  node: Partial<PIXI.Container>;
  children: string[];
  parent?: string;
  components: string[];
  name: string;
  tags: string[];
}

export class GameObject {
  public id: string;
  public node: PIXI.Container;
  public name: string;
  public tags: string[] = [];
  public components: Component[] = [];
  public children: GameObject[] = [];
  public parent?: GameObject;
  public scene: Scene;
  private _componentIds: string[] = [];

  constructor(options: CreateGameObjectOptions, root?: boolean) {
    this.id = randomId();
    this.node = options.node ?? new PIXI.Container();
    this.parent = options.parent;
    this.scene = options.scene;
    this.name = options.name ?? `GameObject ${this.id.substring(0, 10)}`;
    this.tags = options.tags ?? [];
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

  addComponent(component: Component) {
    this.components.push(component);
  }

  removeComponent(component: Component) {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }

  getComponent<T extends Component>(type: ComponentTypes): T | undefined {
    if (typeof type === 'string') {
      return this.components.find((c) => c.type === type) as T;
    }
  }

  serialise(): SerialisedGameObject {
    return {
      id: this.id,
      node: this.serialisePixiNode(),
      children: this.children.map((child) => child.id),
      parent: this.parent?.id,
      components: this.components.map((component) => component.id),
      name: this.name,
      tags: this.tags,
    };
  }

  serialisePixiNode() {
    const node = this.node;
    return serialiseObject(node, pixiPropsToSerialise);
  }

  populateObjectFromLoadedData(serialisedChildren: string[]) {
    this.children = serialisedChildren.map((childId) =>
      this.scene.getObject(childId),
    );
    this.children.forEach((child) => {
      child.parent = this;
      this.node.addChild(child.node);
    });
    if (this.parent) {
      this.parent.addChild(this);
    }
    this.populateComponents();
  }

  populateComponents() {
    for (const id in this._componentIds) {
      this.addComponent(this.scene.getComponent(id));
    }
    this._componentIds = [];
  }

  static FromSerialised(
    serialised: SerialisedGameObject,
    scene: Scene,
  ): GameObject {
    const obj = new GameObject({ scene });
    obj.id = serialised.id;
    obj.name = serialised.name;
    obj.tags = serialised.tags;
    obj._componentIds = serialised.components;
    deserialiseObject(obj.node, serialised.node);
    return obj;
  }
}

export type SerialisedComponent = {
  id: string;
  type: ComponentTypes;
  gameObject: SerialisedReference;
  data: {
    [key: string]: any;
  };
};

export function toSerialisedReference(
  type: string,
  id: string,
): SerialisedReference {
  return { _type: type, _id: id };
}
export function serialiseData(data: any): any {
  if (data instanceof GameObject) {
    return toSerialisedReference('GameObject', data.id);
  }
  if (data instanceof Component) {
    return toSerialisedReference('Component', data.id);
  }
  if (Array.isArray(data)) {
    return data.map((item) => serialiseData(item));
  }
  if (typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = serialiseData(data[key]);
      return acc;
    }, {} as { [key: string]: any });
  }
  return data;
}

export function deserialiseData(data: any, scene: Scene): any {
  if (data._type === 'GameObject') {
    return scene.getObject(data._id);
  }
  if (data._type === 'Component') {
    return scene.getComponent(data._id);
  }
  if (Array.isArray(data)) {
    return data.map((item) => deserialiseData(item, scene));
  }
  if (typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = deserialiseData(data[key], scene);
      return acc;
    }, {} as { [key: string]: any });
  }
  return data;
}

export interface ComponentOptions {
  gameObject: GameObject;
  type: ComponentTypes;
  scene: Scene;
}

export class Component {
  public id: string;
  public type: ComponentTypes;
  public gameObject!: GameObject;
  public data: { [key: string]: any } = {};
  public scene: Scene;
  constructor(options: ComponentOptions) {
    this.id = randomId();
    this.type = options.type;
    this.scene = options.scene;
    this.gameObject = options.gameObject;
    this.gameObject.addComponent(this);
  }

  serialise(): SerialisedComponent {
    return {
      id: this.id,
      type: this.type,
      gameObject: toSerialisedReference('GameObject', this.gameObject.id),
      data: serialiseData(this.data),
    };
  }

  static FromSerialised(serialised: SerialisedComponent, scene: Scene) {
    const gameObject = deserialiseData(
      serialised.gameObject,
      scene,
    ) as GameObject;
    const component = new Component({
      type: serialised.type,
      gameObject,
      scene,
    });
    component.id = serialised.id;
    component.data = serialised.data;
    return component;
  }

  destroy() {
    this.gameObject.removeComponent(this);
    this.scene.removeComponent(this);
  }
}

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
