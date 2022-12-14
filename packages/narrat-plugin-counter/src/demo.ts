import 'narrat/dist/style.css';
import { registerPlugin, startApp } from 'narrat';
import { CounterPlugin } from './plugin';

window.addEventListener('load', () => {
  registerPlugin(new CounterPlugin());
  startApp({
    configPath: 'data/config.yaml',
    logging: false,
    debug: true,
  });
});
