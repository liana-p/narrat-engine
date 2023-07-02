import {
  CommandPlugin,
  NarratPlugin,
  error,
  useInputs,
  warning,
  gameloop,
  Action,
  Vec2,
} from 'narrat';
import * as PIXI from 'pixi.js';
import { GameObject } from './scene/GameObject';
import { Scene, SerialisedScene } from './scene/Scene';
import { createComponent } from './scene/Component';
import {
  CameraComponent,
  CameraComponentOptions,
} from './scene/CameraComponent';
import {
  CharacterComponent,
  CharacterComponentOptions,
} from './scene/CharacterComponent';
import {
  createAnimatedSpriteNode,
  createContainerNode,
  createSpriteNode,
} from './scene/PixiNodes';
import { preloadAssets } from './utils/loadAsset';
import {
  ColliderComponent,
  ColliderComponentOptions,
} from './components/ColliderComponent';
import { processEntities } from './physics/physics';
import { NpcComponent, NpcComponentOptions } from './components/NpcComponent';
import { PlayerComponent } from './components/PlayerComponent';
/**
 * The CounterPlugin is a simple example plugin to showcase the various features plugins can use.
 * This plugin will use the `counter-store` custom store to store custom data (which gets saved and loaded)
 * It uses the `counter-ui.vue` component to display the counter
 * It uses some `CommandPlugin` to add new commands to modify or get the counter's value
 * It uses the `CustomMenuButton` to add a new menu button to the menu bar
 */
export class PixiPlugin extends NarratPlugin {
  pluginId: string = 'narrat-2d';
  app!: PIXI.Application;
  viewport!: Element;
  assetsToLoad: string[] = [];
  assetsLoaded: boolean = false;
  loadingPromises: Promise<void>[] = [];
  scene: Scene = new Scene();
  loadedSceneData: null | SerialisedScene = null;
  gameloopListener?: () => void;
  actions: Action[] = [];
  actionsAdded: boolean = false;
  customCommands = [
    new CommandPlugin('show_scene', [], async (args: any) => {
      this.showScene();
    }),
    new CommandPlugin('delete_scene', [], async (args: any) => {
      this.deleteScene();
    }),
  ];

  constructor() {
    super();
    const version = import.meta.env.VITE_BUILD_VERSION;
    const date = new Date(import.meta.env.VITE_BUILD_DATE).toLocaleString();
    const name = import.meta.env.VITE_PLUGIN_NAME;

    console.log(
      `%c [Narrat 2D plugin] [${name}]  v${version} - Built at ${date}`,
      'background: #222; color: #bada55',
    );
  }

  async addAssets(assets: string[]) {
    this.assetsToLoad.push(...assets);
    const assetLoadPromise = this.preloadAssets(assets);
    this.loadingPromises.push(assetLoadPromise);
    const res = await assetLoadPromise;
    this.assetsLoaded = true;
    return res;
  }

  async addInputActions(actions: Action[]) {
    this.actions = actions;
  }

  async preloadAssets(assets: string[]) {
    return preloadAssets(assets);
  }

  onGameUnmounted() {
    this.deleteScene();
  }

  save() {
    if (this.scene && !this.scene.destroyed) {
      return JSON.stringify(this.scene.serialise());
    }
  }

  load(data: any) {
    this.loadedSceneData = JSON.parse(data);
  }

  showScene() {
    this.attachToViewport();
  }

  deleteScene() {
    this.scene.destroy();
    if (this.gameloopListener) {
      gameloop.off('update', this.gameloopListener);
    }
    this.app.destroy();
  }

  createPixiApp() {
    (window as any).PIXI = PIXI;
    this.app = new PIXI.Application({
      backgroundColor: 0x1099bb,
    });
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    const viewport = document.querySelector('#narrat-viewport');
    if (!viewport) {
      error('Could not find viewport element');
      return;
    }
    this.viewport = viewport;
    viewport.appendChild(this.app.view);
  }

  createScene() {
    const scene = new Scene();
    this.scene = scene;
    scene.attachToStage(this.app.stage, this.app);
  }

  async attachToViewport() {
    if (!this.actionsAdded) {
      for (const action of this.actions) {
        useInputs().getInputs().addAction(action);
      }
      this.actionsAdded = true;
    }
    this.createPixiApp();
    this.app.renderer.resize(
      this.viewport.clientWidth,
      this.viewport.clientHeight,
    );
    this.createScene();
    this.createStuff();
    this.gameloopListener = gameloop.on('update', () => {
      if (this.scene.isStarted) {
        processEntities(this.scene);
        this.scene.beforeUpdate();
        this.scene.update();
        this.scene.postUpdate();
      }
    });
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

  startLoadedScene() {
    if (!this.loadedSceneData) {
      warning('No scene data to load');
      return;
    }
    if (this.scene && !this.scene.destroyed) {
      this.scene.destroy();
    }
    this.createScene();
    this.scene.load(this.loadedSceneData);
  }

  createStuff() {
    const level = new GameObject({
      scene: this.scene,
      node: createSpriteNode('img/backgrounds/level.jpg'),
    });
    level.node.scale.set(3);
    const agumon = new GameObject({
      scene: this.scene,
      node: createContainerNode(),
    });

    createComponent<CameraComponent, CameraComponentOptions>(
      CameraComponent,
      this.scene.root,
      {
        target: agumon.id,
      },
    );
    const agumonSprite = new GameObject({
      node: createAnimatedSpriteNode(
        'img/characters/agumon/agumon.json',
        'idle-bottom',
      ),
      scene: this.scene,
      parent: agumon,
    });
    agumonSprite.node.scale.set(3);
    agumonSprite.node.anchor.set(0.5, 1);
    agumon.setPosition(Vec2.create(1100, 1200));
    createComponent<ColliderComponent, ColliderComponentOptions>(
      ColliderComponent,
      agumon,
      {
        shape: 'circle',
        dimensions: {
          radius: 30,
          x: 0,
          y: -50,
        },
      },
    );
    createComponent<PlayerComponent>(PlayerComponent, agumon);
    agumon.layer = 2;
    const npc = new GameObject({
      node: createSpriteNode('img/characters/npc/npc.png'),
      scene: this.scene,
    });
    npc.layer = 2;
    npc.node.anchor.set(0.5, 1);
    npc.setPosition(Vec2.create(1300, 1400));
    createComponent<ColliderComponent, ColliderComponentOptions>(
      ColliderComponent,
      npc,
      {
        shape: 'rectangle',
        dimensions: {
          width: 80,
          height: 100,
          x: 0,
          y: -50,
        },
      },
    );
    const npcTalkZone = new GameObject({
      node: createContainerNode(),
      scene: this.scene,
      parent: npc,
    });
    npcTalkZone.layer = 2;
    npcTalkZone.setPosition(Vec2.create(0, -50));
    createComponent<NpcComponent, NpcComponentOptions>(
      NpcComponent,
      npcTalkZone,
      {
        dialogLabel: 'npc_talk',
      },
    );
    const npcTalkCollider = createComponent<
      ColliderComponent,
      ColliderComponentOptions
    >(ColliderComponent, npcTalkZone, {
      shape: 'circle',
      dimensions: {
        radius: 100,
        x: 0,
        y: 0,
      },
    });
    npcTalkCollider.isTrigger = true;
    createComponent<CharacterComponent, CharacterComponentOptions>(
      CharacterComponent,
      agumon,
      {
        speed: 320,
        spritesheet: 'img/characters/agumon/agumon.json',
        animations: CharacterComponent.GenerateAnimations(['idle', 'walk'], {
          flipRight: true,
        }),
        // animations: {
        //   idle: {
        //     top: 'idle-top',
        //     bottom: 'idle-bottom',
        //     left: 'idle-left',
        //     right: {
        //       anim: 'idle-left',
        //       flipX: true,
        //     },
        //     bottomLeft: 'idle-bottom-left',
        //     topLeft: 'idle-top-left',
        //     bottomRight: {
        //       anim: 'idle-bottom-left',
        //       flipX: true,
        //     },
        //     topRight: {
        //       anim: 'idle-top-left',
        //       flipX: true,
        //     },
        //   },
        //   walk: {
        //     top: 'walk-top',
        //     bottom: 'walk-bottom',
        //     left: 'walk-left',
        //   },
        // },
      },
    );
  }
}
