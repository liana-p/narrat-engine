import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, shallowRef, ShallowRef, computed } from "vue";
import {
  OpenedDirectory,
  OpenedEntry,
  OpenedFile,
} from "@/filesystem/file-types";
import { useRouter } from "vue-router";
import {
  processWorkspace,
  readFile,
  saveFile,
  selectFolder,
} from "@/filesystem/file-utils";
import { launchNarratGame } from "@/game-runner/narrat-runner";
import { Child } from "@tauri-apps/api/shell";
import { wait } from "@/utils/utils";

export const useIDE = defineStore("ide-store", () => {
  const workspaceFolder = ref<string | null>(null);
  const openedRoot = ref<OpenedEntry | null>(null);
  const allFiles = ref<Record<string, ShallowRef<OpenedEntry>>>({});
  const currentFilePath = ref<string | null>(null);
  const currentFile = ref<OpenedFile | null>(null);
  const gameIsRunning = ref(false);
  const runningGame = shallowRef<Child | null>(null);

  const router = useRouter();

  async function selectWorkspace() {
    const selected = await selectFolder();
    if (selected !== null) {
      openWorkspace(selected);
    }
  }
  function getFile(path: string) {
    return allFiles.value[path];
  }

  async function openWorkspace(workspacePath: string) {
    await closeWorkspace();
    openedRoot.value = await processWorkspace(workspacePath);
    await loadAllFilesInFolder(openedRoot.value as OpenedDirectory);
    workspaceFolder.value = workspacePath;
    runningGame.value = await launchNarratGame(workspacePath);
    setTimeout(() => {
      gameIsRunning.value = true;
    }, 1000);
    router.push("/ide");
  }

  async function closeWorkspace() {
    workspaceFolder.value = null;
    openedRoot.value = null;
    currentFilePath.value = null;
    currentFile.value = null;
    gameIsRunning.value = false;
    if (runningGame.value) {
      await runningGame.value.kill();
      await wait(0.5);
    }
  }

  async function loadAllFilesInFolder(folder: OpenedDirectory) {
    for (const child of folder.children) {
      loadNewFile(child);
      if (child.directory) {
        await loadAllFilesInFolder(child as OpenedDirectory);
      }
    }
  }
  async function openFile(file: OpenedFile) {
    console.log("trying to open file ", file.name, file.path);
    if (currentFilePath.value === file.path) {
      return;
    }
    if (!allFiles.value[file.path]) {
      throw new Error(`File ${file.path} does not exist`);
    }
    currentFilePath.value = file.path;
    currentFile.value = file;
    currentFile.value.content = await readFile(file);
  }

  function updateCurrentFileCode(code: string) {
    if (currentFile.value) {
      currentFile.value.content = code;
    }
  }

  async function saveCurrentFile() {
    if (currentFile.value) {
      await saveFile(currentFile.value);
    }
  }

  async function loadNewFile(file: OpenedEntry) {
    if (allFiles.value[file.path]) {
      throw new Error(`File ${file.path} already exists`);
    }
    allFiles.value[file.path] = shallowRef(file);
  }
  async function unloadFile(file: OpenedEntry) {
    if (!allFiles.value[file.path]) {
      throw new Error(`File ${file.path} does not exist`);
    }
    delete allFiles.value[file.path];
  }

  const isGameOpen = computed(() => {
    return workspaceFolder.value !== null && gameIsRunning.value === true;
  });
  return {
    workspaceFolder,
    openedRoot,
    selectWorkspace,
    openWorkspace,
    openFile,
    getFile,
    saveCurrentFile,
    currentFile,
    currentFilePath,
    updateCurrentFileCode,
    isGameOpen,
    allFiles,
    gameIsRunning,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIDE, import.meta.hot));
}
