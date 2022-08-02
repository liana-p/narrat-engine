import 'es6-promise/auto';
import 'virtual:windi.css';
import './css/main.css';

import { Vue3Mq } from 'vue3-mq';
import { createApp } from 'vue';
import GameApp from './app.vue';
import { AppOptions, AppOptionsInput } from './types/app-types';
import { AppOptionsDeprecated, getConfig, setConfig } from './config';
import { getFile } from './utils/ajax';
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

let app: any;

vm.callHook('onPageLoaded');
export async function startApp(
  optionsInput: AppOptionsInput,
  optionsOld?: AppOptionsDeprecated,
) {
  console.log('Starting narrat...');
  const options: AppOptions = Object.assign(defaultAppOptions(), optionsInput);
  if (optionsOld) {
    console.warn(
      `Deprecation warning: startApp now only takes one object with config rather than two. You can move the values in the second parameter of startApp into the first one.`,
    );
    Object.assign(options, optionsOld);
  }
  const configFile = await getFile(options.configPath);
  setConfig(JSON.parse(configFile));
  if (options.baseAssetsPath) {
    getConfig().baseAssetsPath = options.baseAssetsPath;
  }
  if (options.baseDataPath) {
    getConfig().baseDataPath = options.baseDataPath;
  }
  app = createApp(GameApp, {
    options,
  });
  const pinia = createPinia();
  vm.pinia = pinia;
  app.use(pinia);
  const narrat = {
    app,
    vm,
    jump: (label: string) => {
      useVM().jumpToLabel(label);
    },
  };
  (window as any).narrat = narrat;
  // Register menu components
  registerDefaultMenuButtons(app);
  addMenuButtonsFromPlugins();
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
  logManager.setupDebugger(options.debug);
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
