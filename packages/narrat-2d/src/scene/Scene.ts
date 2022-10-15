import { createContainerNode, deserialiseData } from '@/utils/serialisation';
import * as PIXI from 'pixi.js';
import { Component, SerialisedComponent } from './Component';
import { GameObject, SerialisedGameObject } from './GameObject';
export interface SerialisedScene {
  allObjects: {
    [key: string]: SerialisedGameObject;
  };
  allComponents: {
    [key: string]: SerialisedComponent;
  };
  root: string;
}

export class Scene {
  public container!: PIXI.Container;
  public root!: GameObject;
  public allObjects: { [key: string]: GameObject } = {};
  public allComponents: { [key: string]: Component } = {};

  attachToStage(pixiRoot: PIXI.Container) {
    this.container = pixiRoot;
    if (!this.root) {
      this.root = new GameObject(
        {
          scene: this,
          node: createContainerNode(),
        },
        true,
      );
    }
    this.container.addChild(this.root.node);
  }

  addObject(obj: GameObject) {
    this.allObjects[obj.id] = obj;
  }

  removeObject(obj: GameObject) {
    delete this.allObjects[obj.id];
  }

  addComponent(component: Component) {
    this.allComponents[component.id] = component;
  }

  removeComponent(component: Component) {
    delete this.allComponents[component.id];
  }

  serialise(): SerialisedScene {
    return {
      allObjects: Object.keys(this.allObjects).reduce((acc, key) => {
        acc[key] = this.allObjects[key].serialise();
        console.log(acc[key]);
        return acc;
      }, {} as { [key: string]: SerialisedGameObject }),
      allComponents: Object.keys(this.allComponents).reduce((acc, key) => {
        acc[key] = this.allComponents[key].serialise();
        console.log(acc[key]);
        return acc;
      }, {} as { [key: string]: SerialisedComponent }),
      root: this.root.id,
    };
  }

  load(serialisedScene: SerialisedScene) {
    console.log('loading scene', serialisedScene);
    this.allObjects = Object.keys(serialisedScene.allObjects).reduce(
      (acc, key) => {
        const serialisedObject = serialisedScene.allObjects[key];
        const obj = GameObject.FromSerialised(serialisedObject, this);
        acc[obj.id] = obj;
        return acc;
      },
      {} as { [key: string]: GameObject },
    );
    console.log('all objects', this.allObjects);
    this.allComponents = Object.keys(serialisedScene.allComponents).reduce(
      (acc, key) => {
        const serialisedComponent = serialisedScene.allComponents[key];
        const component = Component.FromSerialised(serialisedComponent, this);
        acc[component.id] = component;
        return acc;
      },
      {} as { [key: string]: Component },
    );
    this.populateComponents();
    this.populateGameObjects(serialisedScene);
    console.log('tree', this.root);
  }

  populateGameObjects(serialisedScene: SerialisedScene) {
    this.root = this.allObjects[serialisedScene.root];
    for (const key in this.allObjects) {
      this.allObjects[key].populateObjectFromLoadedData(
        serialisedScene.allObjects[key].children,
      );
    }
  }

  populateComponents() {
    for (const key in this.allComponents) {
      const component = this.allComponents[key];
      component.data = deserialiseData(component.data, this);
    }
  }

  getObject(id: string) {
    return this.allObjects[id];
  }

  getComponent(id: string) {
    return this.allComponents[id];
  }

  destroy() {
    this.container.removeChild(this.root.node);
    this.root.destroy();
  }
}
