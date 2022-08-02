import 'narrat/dist/style.css';
import { registerPlugin, startApp } from 'narrat';
import { CounterPlugin } from './plugin';

window.addEventListener('load', () => {
  registerPlugin(new CounterPlugin());
  startApp({
    charactersPath: 'data/characters.json',
    configPath: 'data/config.json',
    logging: false,
    debug: true,
  });
});
