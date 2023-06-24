import 'es6-promise/auto';
import 'virtual:windi.css';
import 'virtual:windi-devtools';

import './css/main.css';

import { Vue3Mq } from 'vue3-mq';
import { createApp } from 'vue';
import GameApp from './app.vue';
import { AppOptions, AppOptionsInput } from './types/app-types';
import { loadConfig } from './config';
import { logManager } from './utils/logger';
import { vm } from './vm/vm';
import { registerBaseCommands } from './vm/commands';
import { createPinia } from 'pinia';
import { defaultAppOptions, useMain } from './stores/main-store';
import { useVM } from './stores/vm-store';

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
  addDirectives(app);
  app.use(pinia);
  const config = await loadConfig(options);
  useConfig().setConfig(config);
  getSaveFile();
  useInputs().setupInputs();
  vm.pinia = pinia;
  useMain();
  const narrat = {
    app,
    vm,
    HMREventHandler: (newModule: ModuleNamespace | undefined) =>
      vm.handleHMR(newModule),
    jump: (label: string) => {
      useVM().jumpToLabel(label);
    },
    getSave: () => {
      return getSaveFile();
    },
  };
  (window as any).narrat = narrat;
  // Register menu components
  registerDefaultMenuButtons(app);
  addMenuButtonsFromPlugins();
  useStartMenu().addButtonsFromPlugins();
  useMain().setOptions(options);
  app.use(Vue3Mq, {
    breakpoints: {
      // default breakpoints - customize this
      s: 0,
      m: 800,
      l: 1200,
    },
  });
  registerBaseCommands(vm);
  logManager.setupDebugger(options.debug!);
  console.log(
    `%c Narrat game engine v${VERSION} - Built at ${BUILD_DATE.toLocaleString()}`,
    'background: #222; color: #bada55',
  );
  vm.callHook('onNarratSetup');
  app.mount('#game-holder');
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

export function registerComponent(name: string, component: any) {
  app.component(name, component);
}
