import 'narrat/dist/style.css';
import { registerPlugin, startApp, useInputs } from 'narrat';
import { PixiPlugin } from './plugin';
import { createCollisionMatrix, setCollisionMatrix } from './physics/physics';

window.addEventListener('load', () => {
  const pixi = new PixiPlugin();
  registerPlugin(pixi);
  pixi.preloadAssets([
    'img/characters/agumon/agumon.json',
    'img/backgrounds/level.jpg',
    'img/characters/npc/npc.png',
    'img/ui/talk.png',
    'https://pixijs.io/examples/examples/assets/bunny.png',
  ]);
  // pixi.addInputActions([
  //   {
  //     id: 'movement',
  //     type: 'analog',
  //     keybinds: [
  //       {
  //         left: 'ArrowLeft',
  //         right: 'ArrowRight',
  //         up: 'ArrowUp',
  //         down: 'ArrowDown',
  //       },
  //     ],
  //   },
  //   {
  //     id: 'interact',
  //     type: 'button',
  //     action: 'press',
  //     keybinds: [
  //       {
  //         keyboardKey: 'e',
  //       },
  //     ],
  //   },
  // ]);
  const collisionMatrix = createCollisionMatrix(
    ['default', 'environment', 'entity'],
    {
      default: [],
      environment: ['entity'],
      entity: ['environment', 'entity'],
    },
  );
  setCollisionMatrix(collisionMatrix);
  startApp({
    configPath: 'data/config.yaml',
    logging: false,
    debug: true,
  });
});
