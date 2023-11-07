import { processConfigUpdate } from '@/config/config-helpers';
import { useConfig } from '@/stores/config-store';
import { useMain } from '@/stores/main-store';
import { useNotifications } from '@/stores/notification-store';
import { getAllStores } from '@/stores/stores-management';
import { NarratModule, NarratScript, NarratYaml } from '@/types/app-types';
import { vm } from '@/vm/vm';
import { ModuleNamespace } from 'vite/types/hot';

export function isModuleValid(
  newModule: ModuleNamespace | undefined,
): newModule is ModuleNamespace {
  if (!newModule || !newModule.default) {
    return false;
  }
  return true;
}
export function handleHMR(newModule: ModuleNamespace | undefined) {
  useMain().clearErrors();
  if (!isModuleValid(newModule)) {
    return;
  }
  console.log('Received HMR update for ', newModule.default.id);
  const scriptModule = newModule.default as NarratModule;
  if (isNarratScript(scriptModule)) {
    useNotifications().addNotification(
      `Reloaded ${scriptModule.fileName}`,
      'You can continue playing with the changes.',
    );
    vm.addNarratScript(scriptModule);
  } else if (isNarratYaml(scriptModule)) {
    // Do yaml things!
    const configKey = useConfig().findConfigModuleKey(scriptModule);
    if (configKey) {
      const processedValue = processConfigUpdate(
        useConfig().config,
        configKey,
        scriptModule.code,
      );
      useConfig().reloadConfigModule(configKey, processedValue);
      const relevantStore = Object.values(getAllStores()).find((store) => {
        return store.config === configKey;
      });
      if (relevantStore) {
        if (relevantStore.store().updateConfig) {
          relevantStore.store().updateConfig(processedValue);
        }
      }
    }
    console.log(`Yaml update ${scriptModule.fileName}}`);
  } else {
    console.error('Unknown module type', scriptModule);
  }
}

export function isNarratScript(
  scriptModule: any,
): scriptModule is NarratScript {
  return (
    typeof scriptModule === 'object' &&
    scriptModule !== null &&
    typeof scriptModule.code === 'string' &&
    typeof scriptModule.fileName === 'string' &&
    typeof scriptModule.id === 'string' &&
    scriptModule.type === 'script'
  );
}

export function isNarratYaml(scriptModule: any): scriptModule is NarratYaml {
  return (
    typeof scriptModule === 'object' &&
    scriptModule !== null &&
    typeof scriptModule.code === 'object' &&
    typeof scriptModule.fileName === 'string' &&
    typeof scriptModule.id === 'string' &&
    scriptModule.type === 'yaml'
  );
}

(window as any).narratHMRHandler = (newModule: ModuleNamespace | undefined) => {
  const narrat = window.narrat;
  if (narrat) {
    narrat.handleHMR(newModule);
  }
  const event = new CustomEvent('narrat-hmr', {
    detail: {
      newModule,
    },
  });
  document.body.dispatchEvent(event);
};
