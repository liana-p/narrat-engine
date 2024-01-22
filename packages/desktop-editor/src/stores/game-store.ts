import gameScripts from '@/narrat/scripts';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, ref } from 'vue';
import cloneDeep from 'clone-deep';

export interface FileState {
  // File name
  fileName: string;
  // Code content
  code: string;
  // Path on disc
  id: string;
  // Type of file
  type: 'script';
}
export interface GameStoreState {
  scripts: FileState[];
  defaultScript: string;
  activeScript: string;
}
export const useGameStore = defineStore('game-store', () => {
  const defaultScriptName = ref('game.narrat');
  const scripts = ref<FileState[]>(cloneDeep(gameScripts));
  const activeScriptName = ref(defaultScriptName.value);

  function getScript(fileName: string) {
    return scripts.value.find((script) => script.fileName === fileName);
  }
  function getActiveScript() {
    return getScript(activeScriptName.value);
  }
  function updateCurrentFileCode(code: string) {
    const script = getActiveScript();
    if (!script) {
      throw new Error(`Could not find active script`);
    }
    script.code = code;
  }
  function updateCode(fileName: string, code: string) {
    const script = getScript(fileName);
    if (!script) {
      throw new Error(`Could not find script with name ${fileName}`);
    }
    script.code = code;
  }
  const activeScript = computed(() => {
    return getActiveScript();
  });
  return {
    defaultScriptName,
    scripts,
    activeScriptName,
    activeScript,
    getScript,
    getActiveScript,
    updateCode,
    updateCurrentFileCode,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
