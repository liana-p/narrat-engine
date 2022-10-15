import {
  CommandPlugin,
  CustomMenuTab,
  CustomStores,
  NarratPlugin,
  error,
  getImageUrl,
  timeout,
} from 'narrat';
import { Application, Sprite, Container } from 'pixi.js';
import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';
import { GameObject } from './scene/GameObject';
import { Scene } from './scene/Scene';
import { createContainerNode, createSpriteNode } from './utils/serialisation';
/**
 * The CounterPlugin is a simple example plugin to showcase the various features plugins can use.
 * This plugin will use the `counter-store` custom store to store custom data (which gets saved and loaded)
 * It uses the `counter-ui.vue` component to display the counter
 * It uses some `CommandPlugin` to add new commands to modify or get the counter's value
 * It uses the `CustomMenuButton` to add a new menu button to the menu bar
 */
export class PixiPlugin extends NarratPlugin {
  customStores: CustomStores;
  customCommands: CommandPlugin<any>[];
  customMenuTabs: CustomMenuTab[];

  app!: Application;
  viewport?: Element;
  constructor() {
    super();
    const version = import.meta.env.VITE_BUILD_VERSION;
    const date = new Date(import.meta.env.VITE_BUILD_DATE).toLocaleString();
    const name = import.meta.env.VITE_PLUGIN_NAME;

    console.log(
      `%c [Narrat 2D plugin] [${name}]  v${version} - Built at ${date}`,
      'background: #222; color: #bada55',
    );
    this.customStores = {};

    this.customCommands = [];

    this.customMenuTabs = [];
  }

  onNarratSetup(): void {
    this.app = new Application();
  }

  onGameMounted() {
    this.attachToViewport();
  }

  onGameUnmounted() {
    this.app.destroy();
  }

  async attachToViewport() {
    (window as any).PIXI = PIXI;
    this.app = new Application({
      backgroundColor: 0x1099bb,
    });
    const viewport = document.querySelector('#narrat-viewport');
    if (!viewport) {
      error('Could not find viewport element');
      return;
    }
    this.viewport = viewport;
    viewport.appendChild(this.app.view);
    this.app.renderer.resize(viewport.clientWidth, viewport.clientHeight);
    const texture = await Assets.load(
      getImageUrl('img/backgrounds/curtain.webp'),
    );
    const bunnyTexture = await Assets.load(
      getImageUrl('https://pixijs.io/examples/examples/assets/bunny.png'),
    );
    const bunny = new Sprite(bunnyTexture);
    bunny.x = 100;
    bunny.y = 100;

    let scene = new Scene();
    scene.attachToStage(this.app.stage);

    // this.app.stage.addChild(bunny);
    console.log('========== Scene');
    console.log(scene);
    console.log('==========');
    const obj = new GameObject({
      scene,
      node: createContainerNode(),
    });
    const obj2 = new GameObject({
      node: createSpriteNode('img/backgrounds/curtain.webp'),
      parent: obj,
      scene,
    });
    obj2.node.x = viewport.clientWidth / 2;
    obj2.node.y = viewport.clientHeight / 2;
    obj2.node.anchor.x = 0.5;
    obj2.node.anchor.y = 0.5;
    // const tick = this.app.ticker.add(() => {
    //   obj.node.rotation += 0.004;
    //   obj2.node.rotation += 0.05;
    // });
    // const bunnyTick = this.app.ticker.add(() => {
    //   bunny.rotation += 0.01;
    //   bunny.x -= 0.005;
    // });
    console.log('========== Serialised');

    const serialised = scene.serialise();
    console.log(serialised);
    console.log('==========');
    const serialisedString = JSON.stringify(serialised);
    console.log(serialisedString);
    console.log(obj2.node);
    await timeout(20000);
    console.log('destroy scene');
    scene.destroy();
    await timeout(20000);
    console.log('recreate scene');
    scene = new Scene();
    scene.load(JSON.parse(serialisedString));
    scene.attachToStage(this.app.stage);
  }
}
