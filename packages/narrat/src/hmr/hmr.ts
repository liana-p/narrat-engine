import { NarratScript } from '@/types/app-types';
import { vm } from '@/vm/vm';
import { ModuleNamespace } from 'vite/types/hot';

export function handleHMR(newModule: ModuleNamespace | undefined) {
  if (!newModule || !newModule.default) {
    return;
  }
  const scriptModule = newModule.default;
  if (isNarratScript(scriptModule)) {
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
