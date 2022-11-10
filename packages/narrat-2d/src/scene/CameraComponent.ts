import { timeout } from 'narrat';
import { Component, registerComponentClass } from './Component';
import { GameObject } from './GameObject';

export interface CameraComponentOptions {
  target?: string;
}
export class CameraComponent extends Component {
  public static type = 'CameraComponent';
  public static serialisableFields: string[] = ['target', 'x', 'y'];
  public target?: string;
  public x: number = 0;
  public y: number = 0;

  setTarget(target: string | GameObject) {
    if (typeof target === 'object') {
      this.target = target.id;
    } else {
      this.target = target;
    }
  }

  update() {
    const scene = this.gameObject.scene;
    if (this.target) {
      const target = scene.getObject(this.target);
      if (!target) {
        this.target = undefined;
        return;
      }
      const position = target.getPosition();
      this.x = position.x;
      this.y = position.y;
    }
    scene.container.pivot.x = this.x;
    scene.container.pivot.y = this.y;
    scene.container.x = scene.pixiApp.renderer.width / 2;
    scene.container.y = scene.pixiApp.renderer.height / 2;
    // scene.container.x = this.x;
    // scene.container.y = this.y;
  }
}

registerComponentClass({
  componentType: CameraComponent.type,
  constructor: CameraComponent,
});
