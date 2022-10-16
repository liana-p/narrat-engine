import {
  CommandPlugin,
  CustomMenuTab,
  CustomStores,
  NarratPlugin,
  error,
} from 'narrat';
import * as PIXI from 'pixi.js';
import { GameObject } from './scene/GameObject';
import { Scene } from './scene/Scene';
import { createComponent } from './scene/Component';
import { CameraComponent } from './scene/CameraComponent';
import { CharacterComponent } from './scene/CharacterComponent';
import {
  createAnimatedSpriteNode,
  createContainerNode,
  createSpriteNode,
} from './scene/PixiNodes';
import { preloadAssets } from './utils/loadAsset';
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

  app!: PIXI.Application;
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
    this.app = new PIXI.Application();
  }

  onGameMounted() {
    this.attachToViewport();
  }

  onGameUnmounted() {
    this.app.destroy();
  }

  async attachToViewport() {
    // (window as any).PIXI = PIXI;
    this.app = new PIXI.Application({
      backgroundColor: 0x1099bb,
    });
    const viewport = document.querySelector('#narrat-viewport');
    if (!viewport) {
      error('Could not find viewport element');
      return;
    }
    await preloadAssets([
      'img/characters/agumon/agumon.json',
      'img/backgrounds/level.jpg',
      'https://pixijs.io/examples/examples/assets/bunny.png',
    ]);
    this.viewport = viewport;
    viewport.appendChild(this.app.view);
    this.app.renderer.resize(viewport.clientWidth, viewport.clientHeight);

    let scene = new Scene();
    scene.attachToStage(this.app.stage, this.app);

    // this.app.stage.addChild(bunny);
    console.log('========== Scene');
    console.log(scene);
    console.log('==========');
    const obj = new GameObject({
      scene,
      node: createContainerNode(),
    });
    const level = new GameObject({
      scene,
      node: createSpriteNode('img/backgrounds/level.jpg'),
    });
    level.node.scale.set(5);
    const camera = createComponent<CameraComponent>({
      gameObject: obj,
      type: CameraComponent.type,
      scene,
    });
    // const curtain = new GameObject({
    //   node: createSpriteNode('img/backgrounds/curtain.webp'),
    //   parent: obj,
    //   scene,
    // });
    const bunny = new GameObject({
      node: createSpriteNode(
        'https://pixijs.io/examples/examples/assets/bunny.png',
      ),
      scene,
    });
    const data = await this.app.loader.resources[
      'img/characters/agumon/agumon.json'
    ];
    console.log(data);
    const agumon = new GameObject({
      node: createAnimatedSpriteNode(
        'img/characters/agumon/agumon.json',
        'idle-bottom',
      ),
      scene,
    });
    camera.setTarget(bunny);
    bunny.node.y = 2000;
    bunny.node.x = 500;
    bunny.node.anchor.set(0.5);
    bunny.node.scale.set(5);
    const player = createComponent<CharacterComponent>({
      gameObject: bunny,
      type: CharacterComponent.type,
      scene,
    });
    // curtain.node.anchor.x = 0.5;
    // curtain.node.anchor.y = 0.5;
    const tickRotation = () => {
      // bunny.node.rotation += 0.05;
    };
    const tick = this.app.ticker.add(tickRotation);
    this.app.ticker.add(() => {
      if (scene.isStarted) {
        scene.beforeUpdate();
        scene.update();
        scene.postUpdate();
      }
    });
    // const bunnyTick = this.app.ticker.add(() => {
    //   bunny.rotation += 0.01;
    //   bunny.x -= 0.005;
    // });
    console.log('========== Serialised');

    // await timeout(2000);
    // const serialised = scene.serialise();
    // console.log(serialised);
    // console.log('==========');
    // const serialisedString = JSON.stringify(serialised);
    // console.log(serialisedString);
    // console.log(curtain.node);
    // console.log('destroy scene');
    // this.app.ticker.remove(tickRotation);
    // scene.destroy();
    // await timeout(2000);
    // console.log('recreate scene');
    // scene = new Scene();
    // scene.load(JSON.parse(serialisedString));
    // scene.attachToStage(this.app.stage);
    // const serialised2 = scene.serialise();
    // console.log(serialised2);
    // const serialised2String = JSON.stringify(serialised2);
    // console.log('1', serialisedString);
    // console.log('2', serialised2String);
  }
}
