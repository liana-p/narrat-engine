import {
  CommandPlugin,
  CustomMenuTab,
  CustomStores,
  NarratPlugin,
  error,
  getImageUrl,
  timeout,
} from 'narrat';
import { Application, Sprite } from 'pixi.js';
import { Assets } from '@pixi/assets';
import { GameObject, Scene } from './scene/GameObject';
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
    this.app = new Application();
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

    // const curtain = new Sprite(texture);
    // curtain.x = this.app.renderer.width / 2;
    // curtain.y = this.app.renderer.height / 2;
    // curtain.anchor.x = 0.5;
    // curtain.anchor.y = 0.5;
    // this.app.stage.addChild(curtain);

    let scene = new Scene(this.app.stage);
    console.log('========== Scene');
    console.log(scene);
    console.log('==========');
    const obj = new GameObject({
      scene,
    });
    const obj2 = new GameObject({
      node: new Sprite(texture),
      parent: obj,
      scene,
    });
    const tick = this.app.ticker.add(() => {
      obj.node.rotation += 0.01;
    });
    console.log('========== Serialised');

    const serialised = scene.serialise();
    console.log(serialised);
    console.log('==========');
    const serialisedString = JSON.stringify(serialised);
    console.log(serialisedString);
    await timeout(10000);
    scene.destroy();
    this.app.ticker.destroy();
    await timeout(5000);
    scene = new Scene(this.app.stage);
    scene.load(JSON.parse(serialisedString));
  }
}
