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
import { usePreferences } from "./preferences-store";
import { useApplication } from "./application-store";

export const useIDE = defineStore("ide-store", () => {
  const workspaceFolder = ref<string | null>(null);
  const openedRoot = ref<OpenedEntry | null>(null);
  const allFiles = ref<Record<string, OpenedEntry>>({});
  const currentFilePath = ref<string | null>(null);
  const currentFile = ref<OpenedFile | null>(null);
  const gameIsRunning = ref(false);
  const runningGame = shallowRef<Child | null>(null);

  const router = useRouter();
  const application = useApplication();
  const preferences = usePreferences();
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
    const finishLoading = application.startLoading("/ide");
    await closeWorkspace();
    openedRoot.value = await processWorkspace(workspacePath);
    await loadAllFilesInFolder(openedRoot.value as OpenedDirectory);
    workspaceFolder.value = workspacePath;
    runningGame.value = await launchNarratGame(workspacePath);
    finishLoading();
    findDefaultScriptToOpen();
    usePreferences().onWorkspaceOpened(workspacePath);
  }

  function notifyGameHasStarted() {
    gameIsRunning.value = true;
  }

  async function closeWorkspace() {
    workspaceFolder.value = null;
    openedRoot.value = null;
    currentFilePath.value = null;
    currentFile.value = null;
    gameIsRunning.value = false;
    if (runningGame.value) {
      console.log("Stopping existing narrat game server");
      await runningGame.value.kill();
      await wait(0.5);
      console.log("Narrat game server stopped");
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
    file.content = await readFile(file);
    currentFile.value = file;
  }

  function findDefaultScriptToOpen() {
    const files = Object.values(allFiles.value);
    const scriptFiles = files.filter((file) => {
      return file.name.search(".narrat") !== -1;
    });
    if (scriptFiles.length > 0) {
      console.log(scriptFiles[0]);
      openFile(scriptFiles[0] as OpenedFile);
    }
  }

  function updateCurrentFileCode(code: string) {
    if (currentFile.value) {
      currentFile.value.content = code;
      currentFile.value.unsavedChanges = true;
    }
  }

  async function saveCurrentFile() {
    if (currentFile.value) {
      await saveFile(currentFile.value);
      preferences.updateOpenProject(currentFile.value.path);
      currentFile.value.unsavedChanges = false;
    }
  }

  async function loadNewFile(file: OpenedEntry) {
    if (allFiles.value[file.path]) {
      throw new Error(`File ${file.path} already exists`);
    }
    allFiles.value[file.path] = file;
  }
  async function unloadFile(file: OpenedEntry) {
    if (!allFiles.value[file.path]) {
      throw new Error(`File ${file.path} does not exist`);
    }
    delete allFiles.value[file.path];
  }

  async function reloadIDE() {
    const workspace = workspaceFolder.value;
    if (workspace) {
      await closeWorkspace();
      await openWorkspace(workspace);
    }
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
    notifyGameHasStarted,
    reloadIDE,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIDE, import.meta.hot));
}
