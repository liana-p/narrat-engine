import { timeout } from 'narrat';
import { Component, registerComponentClass } from './Component';
import { GameObject } from './GameObject';

export class CameraComponent extends Component {
  public static type = 'CameraComponent';
  public data: {
    x: number;
    y: number;
    target?: string;
  } = {
    x: 0,
    y: 0,
  };

  async start() {
    await timeout(3000);
    this.data.x = 300;
  }

  setTarget(target: string | GameObject) {
    if (typeof target === 'object') {
      this.data.target = target.id;
    } else {
      this.data.target = target;
    }
  }

  update() {
    const scene = this.gameObject.scene;
    if (this.data.target) {
      const target = scene.getObject(this.data.target);
      if (!target) {
        this.data.target = undefined;
        return;
      }
      const position = target.node.position;
      this.data.x = position.x;
      this.data.y = position.y;
    }
    scene.container.pivot.x = this.data.x;
    scene.container.pivot.y = this.data.y;
    scene.container.x = scene.pixiApp.renderer.width / 2;
    scene.container.y = scene.pixiApp.renderer.height / 2;
    // scene.container.x = this.data.x;
    // scene.container.y = this.data.y;
  }
}

registerComponentClass({
  componentType: CameraComponent.type,
  constructor: CameraComponent,
});
