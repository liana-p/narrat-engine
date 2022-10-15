import { Component } from '@/scene/Component';
import { GameObject } from '@/scene/GameObject';
import { Scene } from '@/scene/Scene';
import { Assets } from '@pixi/assets';
import { error, getImageUrl } from 'narrat';
import * as PIXI from 'pixi.js';

export interface SerialisedReference {
  _type: string;
  _id: string;
}

export interface FieldsToSerialise {
  [key: string]: FieldToSerialise;
}
export type FieldToSerialise = true | FieldsToSerialise;
export const pixiPropsToSerialise: FieldsToSerialise = {
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

export interface RendererNodeOptions<
  T extends PIXI.DisplayObject,
  I extends RendererNodeInfo,
> {
  node: T;
  info: I;
}

export interface RendererNodeInfo {
  _type: RendererNodeType;
}

export interface SpriteNodeInfo extends RendererNodeInfo {
  textureId: string;
}

export function createContainerNode(): RendererNodeOptions<
  PIXI.Container,
  RendererNodeInfo
> {
  return {
    node: new PIXI.Container(),
    info: {
      _type: 'Container',
    },
  };
}
export function createSpriteNode(
  textureId: string,
): RendererNodeOptions<PIXI.Sprite, SpriteNodeInfo> {
  const node = {
    node: new PIXI.Sprite(),
    info: {
      _type: 'Sprite',
      textureId,
    },
  };
  getNodeTypeData(node.info).load!(node.node, node.info);
  return node;
}

export interface PixiNodeTypeInfo<
  N extends PIXI.Container = PIXI.Container,
  I extends RendererNodeInfo = RendererNodeInfo,
> {
  constructor: new (...args: any[]) => N;
  props: FieldsToSerialise;
  load?: (node: N, info: I) => Promise<void>;
}

export type PossibleNodeInfo =
  | PixiNodeTypeInfo<PIXI.Container, RendererNodeInfo>
  | PixiNodeTypeInfo<PIXI.Sprite, SpriteNodeInfo>;
export const pixiNodeTypes: { [key: string]: PossibleNodeInfo } = {
  Container: {
    constructor: PIXI.Container,
    props: pixiPropsToSerialise,
  },
  Sprite: {
    constructor: PIXI.Sprite,
    load: async (sprite: PIXI.Sprite, info: SpriteNodeInfo) => {
      const texture = await Assets.load(getImageUrl(info.textureId));
      sprite.texture = texture;
    },
    props: pixiPropsToSerialise,
  },
};

export function getNodeTypeData<I extends RendererNodeInfo>(
  info: I,
): PossibleNodeInfo {
  const type = pixiNodeTypes[info._type];
  if (!type) {
    error(`Unknown node type ${info._type}`);
  }
  return type;
}
export type RendererNodeType = keyof typeof pixiNodeTypes;

export interface SerialisedPixiNode {
  props: any;
}
export function serialisePixiNode(gameObject: GameObject): SerialisedPixiNode {
  const nodeType = gameObject.nodeInfo._type;
  const info = pixiNodeTypes[nodeType];
  if (!info) {
    error(`No serialisation info for node type ${nodeType}`);
  }
  const props = serialiseObjectWithFields(gameObject.node, info.props);
  return props;
}

export function deserialisePixiNode<
  Node extends PIXI.Container = PIXI.Container,
  Info extends RendererNodeInfo = RendererNodeInfo,
>(info: Info, serialised: SerialisedPixiNode): Node {
  const nodeType = info._type;
  const data = pixiNodeTypes[nodeType] as any as PixiNodeTypeInfo<Node, Info>;
  if (!data) {
    error(`No serialisation info for node type ${nodeType}`);
  }
  const node = new data.constructor();
  if (data.load) {
    data.load(node, info);
  }
  deserialiseObjectWithFields(node, serialised.props);
  return node;
}

export function serialiseObjectWithFields(obj: any, fields: FieldsToSerialise) {
  const res: any = {};
  for (const key in fields) {
    if (fields[key] === true) {
      res[key] = obj[key];
    } else {
      res[key] = serialiseObjectWithFields(
        obj[key],
        fields[key] as FieldsToSerialise,
      );
    }
  }
  return res;
}
export function deserialiseObjectWithFields(obj: any, serialised: any) {
  for (const key in serialised) {
    if (typeof serialised[key] === 'object') {
      if (!obj[key] || typeof obj[key] !== 'object') {
        obj[key] = {};
      }
      deserialiseObjectWithFields(obj[key], serialised[key]);
    } else {
      obj[key] = serialised[key];
    }
  }
}
