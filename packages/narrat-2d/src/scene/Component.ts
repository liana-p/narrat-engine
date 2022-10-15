import {
  deserialiseData,
  serialiseData,
  SerialisedReference,
  toSerialisedReference,
} from '@/utils/serialisation';
import { randomId } from 'narrat';
import { GameObject } from './GameObject';
import { Scene } from './Scene';

export type ComponentTypes = 'Character';

export type SerialisedComponent = {
  id: string;
  type: ComponentTypes;
  gameObject: SerialisedReference;
  data: {
    [key: string]: any;
  };
};

export interface ComponentOptions {
  gameObject: GameObject;
  type: ComponentTypes;
  scene: Scene;
}

export class Component {
  public id: string;
  public type: ComponentTypes;
  public gameObject!: GameObject;
  public data: { [key: string]: any } = {};
  public scene: Scene;
  constructor(options: ComponentOptions) {
    this.id = randomId();
    this.type = options.type;
    this.scene = options.scene;
    this.gameObject = options.gameObject;
    this.gameObject.addComponent(this);
  }

  serialise(): SerialisedComponent {
    return {
      id: this.id,
      type: this.type,
      gameObject: toSerialisedReference('GameObject', this.gameObject.id),
      data: serialiseData(this.data),
    };
  }

  static FromSerialised(serialised: SerialisedComponent, scene: Scene) {
    const gameObject = deserialiseData(
      serialised.gameObject,
      scene,
    ) as GameObject;
    const component = new Component({
      type: serialised.type,
      gameObject,
      scene,
    });
    component.id = serialised.id;
    component.data = serialised.data;
    return component;
  }

  destroy() {
    this.gameObject.removeComponent(this);
    this.scene.removeComponent(this);
  }
}
