import { useInputs, Vec2, Vector2 } from 'narrat';
import { Component, registerComponentClass } from './Component';
import { AnimatedSprite } from 'pixi.js';
import { getAnimation } from '@/utils/loadAsset';

export type AnimationDirection =
  | 'bottom'
  | 'top'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'bottomLeft'
  | 'topRight'
  | 'bottomRight';

export type AnimDirectionOptions =
  | string
  | {
      anim: string;
      flipX?: boolean;
      flipY?: boolean;
    };
export interface AnimationDirections {
  top: AnimDirectionOptions;
  bottom: AnimDirectionOptions;
  left: AnimDirectionOptions;
  right: AnimDirectionOptions;
  topLeft: AnimDirectionOptions;
  topRight: AnimDirectionOptions;
  bottomLeft: AnimDirectionOptions;
  bottomRight: AnimDirectionOptions;
}

export interface CharacterAnimations {
  [key: string]: AnimationDirections;
}

export interface CharacterComponentOptions {
  spritesheet: string;
  animations: CharacterAnimations;
  speed?: number;
  movementAction?: string;
}
export class CharacterComponent extends Component {
  public static type = 'CharacterComponent';
  public static serialisableFields: string[] = [
    'speed',
    'direction',
    'spritesheet',
    'animationState',
    'lastAnimationState',
    'animations',
    'animationDirection',
    'movementAction',
  ];

  public static GenerateAnimations(
    poses: string[],
    options: { flipRight?: boolean; prefix?: string } = {},
  ): CharacterAnimations {
    const animations: CharacterAnimations = {};
    const prefix = options.prefix ?? '';
    poses.forEach((pose) => {
      animations[pose] = {
        top: `${prefix}${pose}-top`,
        bottom: `${prefix}${pose}-bottom`,
        left: `${prefix}${pose}-left`,
        right: `${prefix}${pose}-right`,
        topLeft: `${prefix}${pose}-top-left`,
        topRight: `${prefix}${pose}-top-right`,
        bottomLeft: `${prefix}${pose}-bottom-left`,
        bottomRight: `${prefix}${pose}-bottom-right`,
      };
      if (options.flipRight) {
        animations[pose].right = {
          anim: animations[pose].left as string,
          flipX: true,
        };
        animations[pose].topRight = {
          anim: animations[pose].topLeft as string,
          flipX: true,
        };
        animations[pose].bottomRight = {
          anim: animations[pose].bottomLeft as string,
          flipX: true,
        };
      }
    });
    return animations;
  }

  public speed: number = 500;
  public direction: Vector2 = Vec2.create(0, 0);
  public spritesheet: string = '';
  public animationState: string = 'none';
  public lastAnimationState: string = 'none';
  public animations: CharacterAnimations = {};
  public animationDirection: AnimationDirection = 'bottom';

  public movementAction: string = 'movement';

  setAnimation() {
    const animData = this.animations[this.animationState];
    let animDirection = this.getAnimationDirectionFromDirection(this.direction);
    if (animDirection === null) {
      animDirection = this.animationDirection;
    }
    const anim = animData[animDirection]!;
    if (
      animDirection !== this.animationDirection ||
      this.lastAnimationState !== this.animationState
    ) {
      this.gameObject.node.scale.set(1);
      let animationName: string;
      if (typeof anim === 'object') {
        animationName = anim.anim;
        if (anim.flipX) {
          this.gameObject.node.scale.x = -1;
        }
        if (anim.flipY) {
          this.gameObject.node.scale.y = -1;
        }
      } else {
        animationName = anim;
      }
      this.getAnimatedNode().textures = getAnimation(
        this.spritesheet,
        animationName,
      );
      this.getAnimatedNode().animationSpeed = 0.1;
      this.getAnimatedNode().play();
      this.animationDirection = animDirection;
    }
  }

  getAnimationDirectionFromDirection(
    direction: Vector2,
  ): AnimationDirection | null {
    if (direction.y > 0) {
      if (direction.x > 0) {
        return 'bottomRight';
      } else if (direction.x < 0) {
        return 'bottomLeft';
      } else {
        return 'bottom';
      }
    }
    if (direction.y < 0) {
      if (direction.x > 0) {
        return 'topRight';
      } else if (direction.x < 0) {
        return 'topLeft';
      } else {
        return 'top';
      }
    }
    if (direction.y === 0) {
      if (direction.x > 0) {
        return 'right';
      } else if (direction.x < 0) {
        return 'left';
      }
    }
    return null;
  }

  getAnimatedNode() {
    return this.gameObject.children[0].node as AnimatedSprite;
  }

  update() {
    const inputs = useInputs();
    this.direction = inputs.inputs.getAnalog(this.movementAction).value;
    this.lastAnimationState = this.animationState;
    if (Vec2.magnitude(this.direction) > 0) {
      this.animationState = 'walk';
    } else {
      this.animationState = 'idle';
    }
    const newPos = Vec2.add(
      this.gameObject.node.position,
      Vec2.scale(this.direction, this.speed * this.scene.time.deltaTime),
    );
    this.gameObject.node.position.set(newPos.x, newPos.y);
    this.setAnimation();
  }
}

registerComponentClass({
  componentType: CharacterComponent.type,
  constructor: CharacterComponent,
});
