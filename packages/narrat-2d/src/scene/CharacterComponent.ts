import { useInputs, Vec2, Vector2 } from 'narrat';
import { Component, registerComponentClass } from './Component';
import { AnimatedSprite } from 'pixi.js';
import { getAnimation } from '@/utils/loadAsset';

export interface AnimationDirections {
  top: string;
  bottom: string;
  left: string;
  right?: string;
}
export interface CharacterAnimations {
  [key: string]: AnimationDirections;
}
export class CharacterComponent extends Component {
  public static type = 'CharacterComponent';
  public data: {
    speed: number;
    direction: Vector2;
    spritesheet: string;
    animationState: string;
    lastAnimationState: string;
    animations: CharacterAnimations;
    animationDirection: 'bottom' | 'top' | 'left' | 'right' | 'none';
  } = {
    speed: 500,
    direction: Vec2.create(1, 0),
    spritesheet: '',
    animationState: 'idle',
    lastAnimationState: 'none',
    animations: {},
    animationDirection: 'none',
  };

  start() {
    this.data.spritesheet = 'img/characters/agumon/agumon.json';
    this.data.animations = {
      idle: {
        top: 'idle-top',
        bottom: 'idle-bottom',
        left: 'idle-left',
      },
      walk: {
        top: 'walk-top',
        bottom: 'walk-bottom',
        left: 'walk-left',
      },
    };
  }

  setAnimation() {
    const animData = this.data.animations[this.data.animationState];
    let direction = this.data.animationDirection;
    if (this.data.direction.y > 0) {
      direction = 'bottom';
    }
    if (this.data.direction.y < 0) {
      direction = 'top';
    }
    if (this.data.direction.x < 0) {
      direction = 'left';
    }
    if (this.data.direction.x > 0) {
      direction = 'right';
    }
    if (direction === 'none') {
      return;
    }
    let anim = animData[direction]!;
    if (direction === 'right' && !animData.right) {
      anim = animData.left;
      this.gameObject.node.scale.x = -1;
    } else {
      this.gameObject.node.scale.x = 1;
    }
    if (
      direction !== this.data.animationDirection ||
      this.data.lastAnimationState !== this.data.animationState
    ) {
      this.getAnimatedNode().textures = getAnimation(
        this.data.spritesheet,
        anim,
      );
      this.getAnimatedNode().animationSpeed = 0.1;
      this.getAnimatedNode().play();
      this.data.animationDirection = direction;
    }
  }

  getAnimatedNode() {
    return this.gameObject.children[0].node as AnimatedSprite;
  }

  update() {
    const inputs = useInputs();
    this.data.direction = inputs.inputs.getAnalog('movement').value;
    this.data.lastAnimationState = this.data.animationState;
    if (Vec2.magnitude(this.data.direction) > 0) {
      this.data.animationState = 'walk';
    } else {
      this.data.animationState = 'idle';
    }
    const { speed, direction } = this.data;
    const newPos = Vec2.add(
      this.gameObject.node.position,
      Vec2.scale(direction, speed * this.scene.time.deltaTime),
    );
    this.gameObject.node.position.set(newPos.x, newPos.y);
    this.setAnimation();
  }
}

registerComponentClass({
  componentType: CharacterComponent.type,
  constructor: CharacterComponent,
});
