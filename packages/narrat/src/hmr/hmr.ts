import { useMain } from '@/stores/main-store';
import { useNotifications } from '@/stores/notification-store';
import { NarratScript, NarratYaml } from '@/types/app-types';
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
  console.log('Received HMR update for ' + `${newModule.id}`);
  const scriptModule = newModule.default;
  if (isNarratScript(scriptModule)) {
    useNotifications().addNotification(
      `Reloaded ${scriptModule.fileName}`,
      'You can continue playing with the changes.',
    );
    vm.addNarratScript(scriptModule);
  } else if (isYamlScript(scriptModule)) {
    // Do yaml things!
    console.log(`Yaml update ${scriptModule.fileName}}`);
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

export function isYamlScript(scriptModule: any): scriptModule is NarratYaml {
  return (
    typeof scriptModule === 'object' &&
    scriptModule !== null &&
    typeof scriptModule.code === 'string' &&
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
