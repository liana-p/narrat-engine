import 'narrat/dist/style.css';
import { registerPlugin, startApp } from 'narrat';
import { PixiPlugin } from './plugin';

window.addEventListener('load', () => {
  registerPlugin(new PixiPlugin());
  startApp({
    configPath: 'data/config.yaml',
    logging: false,
    debug: true,
  });
});
