import { Vec2, Vector2 } from '@/utils/Vector2';
import { Component, registerComponentClass } from './Component';

export class CharacterComponent extends Component {
  public static type = 'CharacterComponent';
  public data: {
    speed: number;
    direction: Vector2;
  } = {
    speed: 500,
    direction: Vec2.create(1, 0),
  };

  start() {
    window.addEventListener('keydown', (event) => {
      const { direction } = this.data;
      direction.x = 0;
      direction.y = 0;
      switch (event.key) {
        case 'ArrowUp':
          direction.y = -1;
          break;
        case 'ArrowDown':
          direction.y = 1;
          break;
        case 'ArrowLeft':
          direction.x = -1;
          break;
        case 'ArrowRight':
          direction.x = 1;
          break;
      }
    });
  }

  update() {
    const { speed, direction } = this.data;
    const newPos = Vec2.add(
      this.gameObject.node.position,
      Vec2.scale(direction, speed * this.scene.time.deltaTime),
    );
    this.gameObject.node.position.set(newPos.x, newPos.y);
  }
}

registerComponentClass({
  componentType: CharacterComponent.type,
  constructor: CharacterComponent,
});
