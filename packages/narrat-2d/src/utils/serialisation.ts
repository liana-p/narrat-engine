import { Component } from '@/scene/Component';
import { GameObject } from '@/scene/GameObject';
import {
  PixiNodeTypeInfo,
  pixiNodeTypes,
  RendererNodeInfo,
  SerialisedPixiNode,
} from '@/scene/PixiNodes';
import { Scene } from '@/scene/Scene';
import { error } from 'narrat';
import * as PIXI from 'pixi.js';

export interface SerialisedReference {
  _type: string;
  _id: string;
}

export interface FieldsToSerialise {
  [key: string]: FieldToSerialise;
}
export type FieldToSerialise = true | FieldsToSerialise;

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
  const data = pixiNodeTypes[nodeType];
  if (!data) {
    error(`No serialisation info for node type ${nodeType}`);
  }
  let node: Node;
  if (data.create) {
    node = data.create(info);
  } else {
    node = new data.constructor();
  }
  if (data.load) {
    data.load(node, info);
  }
  console.log('deserialisePixiNode', node, info, serialised);
  deserialiseObjectWithFields(node, serialised);
  return node;
}

export function serialiseObjectWithFields(obj: any, fields: FieldsToSerialise) {
  const res: any = {};
  for (const key in fields) {
    if (fields[key] === true) {
      res[key] = obj[key];
    } else if (typeof obj[key] === 'object') {
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
      console.log(`assign ${key} to node ${serialised[key]}`);
      obj[key] = serialised[key];
    }
  }
}
