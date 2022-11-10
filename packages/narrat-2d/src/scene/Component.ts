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

export type ComponentClass = new (
  gameObject: GameObject,
  options?: { [key: string]: any },
) => Component;

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
export function createComponent<
  T extends Component,
  TOptions extends { [key: string]: any } = any,
>(
  ComponentClass: ComponentClass,
  gameObject: GameObject,
  options?: TOptions,
  skipStart?: boolean,
): T {
  const type = (ComponentClass as any).type;
  const info = getComponentTypeInfo(type);
  if (!info) {
    error(`No component class registered for type ${type}`);
  }
  const component = new info.constructor(gameObject, options);
  component.type = type;
  component.setOptions(options);
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
}

export class Component {
  public id: string;
  public static type: ComponentTypes = 'Component';
  public static serialisableFields: string[] = [];
  public type: ComponentTypes = 'Component';
  public gameObject!: GameObject;
  public scene: Scene;
  constructor(gameObject: GameObject) {
    this.id = randomId();
    this.scene = gameObject.scene;
    this.gameObject = gameObject;
    this.gameObject.addComponent(this);
  }

  setOptions(options?: { [key: string]: any }) {
    if (options) {
      for (const key in options) {
        (this as any)[key] = options[key];
      }
    }
  }

  start() {}

  beforeUpdate() {}

  update() {}

  postUpdate() {}

  onTriggerEnter(other: GameObject) {}
  onCollisionEnter(other: GameObject) {}

  getSerialisableFields(): string[] {
    return (this as any).serialisableFields ?? [];
  }

  getSerialisableData(): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    const fields = this.getSerialisableFields();
    for (const field of fields) {
      result[field] = (this as any)[field];
    }
    return result;
  }

  serialise(): SerialisedComponent {
    return {
      id: this.id,
      type: this.type,
      gameObject: toSerialisedReference('GameObject', this.gameObject.id),
      data: serialiseData(this.getSerialisableData()),
    };
  }

  static FromSerialised(serialised: SerialisedComponent, scene: Scene) {
    const gameObject = deserialiseData(
      serialised.gameObject,
      scene,
    ) as GameObject;
    const info = getComponentTypeInfo(serialised.type);
    const options = deserialiseData(serialised.data, scene);
    const component = createComponent(
      info.constructor,
      gameObject,
      options,
      true,
    );
    component.id = serialised.id;
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
