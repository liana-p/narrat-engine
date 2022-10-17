import 'narrat/dist/style.css';
import { registerPlugin, startApp, useInputs } from 'narrat';
import { PixiPlugin } from './plugin';

window.addEventListener('load', () => {
  const pixi = new PixiPlugin();
  registerPlugin(pixi);
  pixi.preloadAssets([
    'img/characters/agumon/agumon.json',
    'img/backgrounds/level.jpg',
    'https://pixijs.io/examples/examples/assets/bunny.png',
  ]);
  pixi.addInputActions([
    {
      id: 'movement',
      type: 'analog',
      keybinds: [
        {
          left: 'ArrowLeft',
          right: 'ArrowRight',
          up: 'ArrowUp',
          down: 'ArrowDown',
        },
      ],
    },
  ]);
  startApp({
    configPath: 'data/config.yaml',
    logging: false,
    debug: true,
  });
});
