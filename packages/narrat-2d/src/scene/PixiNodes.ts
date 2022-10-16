import { FieldsToSerialise } from '@/utils/serialisation';
import { error, getImageUrl } from 'narrat';
import * as PIXI from 'pixi.js';

export const pixiPropsToSerialise: FieldsToSerialise = {
  x: true,
  y: true,
  scale: {
    x: true,
    y: true,
  },
  anchor: {
    x: true,
    y: true,
  },
  rotation: true,
  pivot: {
    x: true,
    y: true,
  },
};

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

export interface AnimatedSpriteNodeInfo extends RendererNodeInfo {
  dataFile: string;
  defaultAnimation: string;
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
  getNodeTypeData(node.info).load!(node.node as any, node.info as any);
  return node;
}

export function createAnimatedSpriteNode(
  dataFile: string,
  defaultAnimation: string,
): RendererNodeOptions<PIXI.AnimatedSprite, AnimatedSpriteNodeInfo> {
  const sheet = PIXI.Loader.shared.resources[dataFile].spritesheet!;
  const node = {
    node: new PIXI.AnimatedSprite(sheet.animations[defaultAnimation]),
    info: {
      _type: 'AnimatedSprite',
      dataFile,
      defaultAnimation,
    },
  };
  return node;
}

export interface PixiNodeTypeInfo {
  constructor: new (...args: any[]) => any;
  props: FieldsToSerialise;
  create?: (info: any) => any;
  load?: (node: any, info: any) => Promise<any>;
}

export const pixiNodeTypes: { [key: string]: PixiNodeTypeInfo } = {
  Container: {
    constructor: PIXI.Container,
    props: pixiPropsToSerialise,
  },
  Sprite: {
    constructor: PIXI.Sprite,
    load: async (sprite: PIXI.Sprite, info: SpriteNodeInfo) => {
      const texture =
        PIXI.Loader.shared.resources[getImageUrl(info.textureId)].texture!;
      sprite.texture = texture;
    },
    props: pixiPropsToSerialise,
  },
  AnimatedSprite: {
    constructor: PIXI.AnimatedSprite,
    create: (info: AnimatedSpriteNodeInfo) => {
      const sheet = PIXI.Loader.shared.resources[info.dataFile].spritesheet!;
      const node = new PIXI.AnimatedSprite(
        sheet.animations[info.defaultAnimation],
      );
      return node;
    },
    props: pixiPropsToSerialise,
  },
};

export function getNodeTypeData<I extends RendererNodeInfo>(
  info: I,
): PixiNodeTypeInfo {
  const type = pixiNodeTypes[info._type];
  if (!type) {
    error(`Unknown node type ${info._type}`);
  }
  return type;
}
export type RendererNodeType = keyof typeof pixiNodeTypes;

export interface SerialisedPixiNode {
  [key: string]: any;
}
