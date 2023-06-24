import 'narrat/dist/style.css';
import { registerPlugin, startApp } from 'narrat';
import { CounterPlugin } from './plugin';

import game from './scripts/game.narrat';

window.addEventListener('load', () => {
  registerPlugin(new CounterPlugin());
  startApp({
    configPath: 'data/config.yaml',
    logging: false,
    debug: true,
    scripts: [game],
  });
});
