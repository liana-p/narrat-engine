import {
  deserialiseData,
  serialiseData,
  SerialisedReference,
  toSerialisedReference,
} from '@/utils/serialisation';
import { error, randomId } from 'narrat';
import { GameObject } from './GameObject';
import { Scene } from './Scene';

export type ComponentTypes = string;

export type ComponentClass = new (options: ComponentOptions) => Component;

export interface ComponentClassInfo {
  componentType: ComponentTypes;
  constructor: ComponentClass;
  load?: (serialised: SerialisedComponent) => void;
}

export const componentClasses: { [key: string]: ComponentClassInfo } = {};

export function registerComponentClass(componentInfo: ComponentClassInfo) {
  componentClasses[componentInfo.componentType] = componentInfo;
}

export function getComponentTypeInfo(type: ComponentTypes) {
  return componentClasses[type];
}
export function createComponent<T extends Component>(
  options: ComponentOptions,
  skipStart?: boolean,
): T {
  const info = getComponentTypeInfo(options.type);
  if (!info) {
    error(`No component class registered for type ${options.type}`);
  }
  const component = new info.constructor(options);
  if (!skipStart) {
    component.start();
  }
  return component as T;
}

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
  public static type: ComponentTypes = 'Component';
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

  start() {}

  beforeUpdate() {}

  update() {}

  postUpdate() {}

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
    const component = createComponent({
      type: serialised.type,
      gameObject,
      scene,
    });
    const info = getComponentTypeInfo(serialised.type);
    component.id = serialised.id;
    component.data = serialised.data;
    if (info.load) {
      info.load(serialised);
    }
    component.start();
    return component;
  }

  destroy() {
    this.gameObject.removeComponent(this);
  }
}
