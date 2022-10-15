import { randomId } from 'narrat';
import * as PIXI from 'pixi.js';
import { Component, ComponentTypes } from './Component';
import { Scene } from './Scene';
import {
  deserialisePixiNode,
  pixiNodeTypes,
  RendererNodeInfo,
  RendererNodeOptions,
  RendererNodeType,
  SerialisedPixiNode,
  serialisePixiNode,
} from '@/utils/serialisation';
export interface CreateGameObjectOptions<
  NodeType extends PIXI.Container = PIXI.Container,
  NodeInfo extends RendererNodeInfo = RendererNodeInfo,
> {
  scene: Scene;
  node: RendererNodeOptions<NodeType, NodeInfo>;
  parent?: GameObject<any>;
  name?: string;
  tags?: string[];
}

export interface SerialisedGameObject {
  id: string;
  node: SerialisedPixiNode;
  nodeInfo: RendererNodeInfo;
  children: string[];
  parent?: string;
  components: string[];
  name: string;
  tags: string[];
}

export class GameObject<
  NodeType extends PIXI.Container = PIXI.Container,
  NodeInfo extends RendererNodeInfo = RendererNodeInfo,
> {
  public id: string;
  public node: NodeType;
  public nodeInfo: NodeInfo;
  public name: string;
  public tags: string[] = [];
  public components: Component[] = [];
  public children: GameObject<any>[] = [];
  public parent?: GameObject<any>;
  public scene: Scene;
  private _componentIds: string[] = [];

  constructor(
    options: CreateGameObjectOptions<NodeType, NodeInfo>,
    root?: boolean,
  ) {
    this.id = randomId();
    this.node = options.node.node;
    this.nodeInfo = options.node.info;
    this.parent = options.parent;
    this.scene = options.scene;
    this.name = options.name ?? `GameObject ${this.id.substring(0, 10)}`;
    this.tags = options.tags ?? [];
    if (this.parent) {
      this.parent.addChild(this);
    } else if (!root) {
      this.scene.root.addChild(this);
    }
    this.scene.addObject(this);
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

  addChild(child: GameObject<any>) {
    if (this.children.indexOf(child) !== -1) {
      return;
    }
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
    child.parent = undefined;
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
      node: this.serialiseNode(),
      nodeInfo: this.nodeInfo,
      children: this.children.map((child) => child.id),
      parent: this.parent?.id,
      components: this.components.map((component) => component.id),
      name: this.name,
      tags: this.tags,
    };
  }

  serialiseNode(): SerialisedPixiNode {
    return serialisePixiNode(this);
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
    const node = deserialisePixiNode(serialised.nodeInfo, serialised.node);
    const obj = new GameObject(
      { scene, node: { node, info: serialised.nodeInfo } },
      true,
    );
    obj.id = serialised.id;
    obj.name = serialised.name;
    obj.tags = serialised.tags;
    obj._componentIds = serialised.components;
    return obj;
  }
}
