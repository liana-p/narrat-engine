import { useMain } from '@/stores/main-store';
import { useNotifications } from '@/stores/notification-store';
import { NarratScript } from '@/types/app-types';
import { vm } from '@/vm/vm';
import { ModuleNamespace } from 'vite/types/hot';

export function handleHMR(newModule: ModuleNamespace | undefined) {
  useMain().clearErrors();
  if (!newModule || !newModule.default) {
    return;
  }
  const scriptModule = newModule.default;
  if (isNarratScript(scriptModule)) {
    useNotifications().addNotification(
      `Reloaded ${scriptModule.fileName}`,
      'You can continue playing with the changes.',
    );
    vm.addNarratScript(scriptModule);
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
    typeof scriptModule.id === 'string'
  );
}
