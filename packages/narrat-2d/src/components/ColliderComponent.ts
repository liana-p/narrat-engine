import { Component, registerComponentClass } from '@/scene/Component';
import { Vec2, Vector2 } from 'narrat';
import { Graphics } from 'pixi.js';

const debug = true;

export interface RectangleShape {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface CircleShape {
  x: number;
  y: number;
  radius: number;
}
export type ColliderShape = RectangleShape | CircleShape;
export interface ColliderComponentOptions {
  isTrigger?: boolean;
  isStatic?: boolean;
  shape: 'rectangle' | 'circle';
  dimensions: ColliderShape;
}

export class ColliderComponent extends Component {
  public static type = 'ColliderComponent';
  public lastPosition: Vector2 = Vec2.create();
  public static serialisableFields: string[] = [
    'isTrigger',
    'isStatic',
    'shape',
    'dimensions',
    'velocity',
  ];

  public shape: 'rectangle' | 'circle' = 'rectangle';
  public velocity: Vector2 = Vec2.create();

  public dimensions: ColliderShape = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  };

  public debugShape: Graphics | undefined;
  public isTrigger: boolean = false;
  public isStatic: boolean = false;

  public start() {
    this.lastPosition = this.gameObject.getPosition();
    if (debug) {
      const debugShape = new Graphics();
      debugShape.beginFill(0x00ff00, 0.5);
      if (this.shape === 'rectangle') {
        const dimensions = this.dimensions as RectangleShape;
        debugShape.drawRect(
          dimensions.x - dimensions.width / 2,
          dimensions.y - dimensions.height / 2,
          dimensions.width,
          dimensions.height,
        );
      } else if (this.shape === 'circle') {
        const dimensions = this.dimensions as CircleShape;
        debugShape.arc(
          dimensions.x,
          dimensions.y,
          dimensions.radius,
          0,
          Math.PI * 2,
        );
      }
      this.gameObject.node.addChild(debugShape);
      this.debugShape = debugShape;
    }
  }

  public getMotion(): Vector2 {
    return Vec2.scale(this.velocity, this.scene.time.deltaTime);
  }

  public getColliderPosition(): Vector2 {
    const pos = Vec2.add(
      this.gameObject.node.getGlobalPosition(),
      this.getMotion(),
    );
    if (this.shape === 'rectangle') {
      pos.x -= (this.dimensions as RectangleShape).width / 2;
      pos.y -= (this.dimensions as RectangleShape).height / 2;
    }
    return pos;
  }
}

registerComponentClass({
  componentType: ColliderComponent.type,
  constructor: ColliderComponent,
});
