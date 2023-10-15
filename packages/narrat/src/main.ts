import 'es6-promise/auto';
import 'virtual:windi.css';
import 'virtual:windi-devtools';

import './css/main.css';

import { createApp } from 'vue';
import GameApp from './app.vue';
import { AppOptions, AppOptionsInput } from './types/app-types';
import { loadConfig } from './config';
import { logManager } from './utils/logger';
import { vm } from './vm/vm';
import { registerBaseCommands } from './vm/commands';
import { createPinia } from 'pinia';
import { defaultAppOptions, useMain } from './stores/main-store';

import {
  addMenuButtonsFromPlugins,
  registerDefaultMenuButtons,
} from './menu-buttons/menu-buttons';
import { BUILD_DATE, VERSION } from './constants';
import { addDirectives } from './utils/vue-directives';
import { useConfig } from './stores/config-store';
import { useStartMenu } from './stores/start-menu-store';
import { useInputs } from './stores/inputs-store';
import { gameloop } from '@/utils/gameloop';
import { getSaveFile } from './utils/save-helpers';
import { ModuleNamespace } from 'vite/types/hot';
import { constructNarratObject } from './utils/construct-narrat';
import { useRenderingStore } from './lib';
import cloneDeep from 'clone-deep';
let app: any;

vm.callHook('onPageLoaded');

export type HMRCallback = (mod: ModuleNamespace | undefined) => void;

export async function startApp(optionsInput: AppOptionsInput) {
  gameloop.setup();
  console.log('Starting narrat...');
  const options: AppOptions = Object.assign(defaultAppOptions(), optionsInput);
  const pinia = createPinia();
  app = createApp(GameApp, {
    options,
  });
  app.use(pinia);
  useMain().setOptions(options);
  addDirectives(app);
  const config = await loadConfig(options);
  useConfig().setConfig(config);
  getSaveFile();
  useInputs().setupInputs();
  vm.pinia = pinia;
  useMain();
  constructNarratObject(app);
  // Register menu components
  registerDefaultMenuButtons(app);
  addMenuButtonsFromPlugins();
  useStartMenu().addButtonsFromPlugins();
  registerBaseCommands(vm);
  logManager.setupDebugger(options.debug!);
  console.log(
    `%c Narrat game engine v${VERSION} - Built at ${BUILD_DATE.toLocaleString()}`,
    'background: #222; color: #bada55',
  );
  vm.callHook('onNarratSetup');
  let container: HTMLElement;
  if (typeof options.container === 'string') {
    container = document.querySelector(options.container)!;
  } else {
    container = options.container!;
  }
  if (!container) {
    alert('The narrat container was not found!');
  }
  useRenderingStore().setContainer(container);
  useInputs().listenToContainerInputs();
  app.mount(container);
  useRenderingStore().narratAppElement = document.querySelector('#narrat-app');
  // // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
  // // Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
  // if ((import.meta as any).hot) {
  //   (import.meta as any).hot.accept();
  //   (import.meta as any).hot.dispose(() => {
  //     // app.unmount();
  //   });
  // }
  return app;
}

export async function stopApp() {
  app.unmount();
  app = null;
}

export async function restartApp() {
  const options = cloneDeep(useMain().options);
  await stopApp();
  return await startApp(options);
}

export function registerComponent(name: string, component: any) {
  app.component(name, component);
}
