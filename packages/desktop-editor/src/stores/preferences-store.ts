import {
  UserPreferences,
  WorkspacePreferences,
} from "@/preferences/preference-types";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const usePreferences = defineStore("preferences-store", () => {
  const lastOpenedWorkspace = ref<string | null>(null);
  const recentProjects = ref<WorkspacePreferences[]>([]);
  const currentProjectPath = ref<string | null>(null);

  function onWorkspaceOpened(workspacePath: string) {
    lastOpenedWorkspace.value = workspacePath;
    currentProjectPath.value = addRecentProject(workspacePath).workspaceRoot;
    savePreferences();
  }

  function savePreferences() {
    const preferences: UserPreferences = {
      lastOpenedWorkspace: lastOpenedWorkspace.value,
      recentProjects: recentProjects.value,
      currentProject: currentProjectPath.value,
    };
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }
  function loadPreferences() {
    const preferences = localStorage.getItem("preferences");
    if (preferences) {
      const parsed: UserPreferences = JSON.parse(preferences);
      console.log("Loaded preferences", parsed);
      lastOpenedWorkspace.value = parsed.lastOpenedWorkspace;
      if (parsed.recentProjects) {
        recentProjects.value = parsed.recentProjects;
        currentProjectPath.value = parsed.currentProject;
      }
    }
  }
  function findRecentProject(projectPath: string) {
    return recentProjects.value.find((project) => {
      return project.workspaceRoot === projectPath;
    });
  }
  function addRecentProject(projectPath: string) {
    let project = findRecentProject(projectPath);
    if (!project) {
      project = {
        workspaceRoot: projectPath,
        lastOpenedFile: null,
        lastEdit: Date.now(),
      };
      recentProjects.value.push(project);
    }
    return project;
  }
  function updateOpenProject(currentFile: string) {
    if (currentProjectPath.value) {
      const project = findRecentProject(currentProjectPath.value);
      if (project) {
        project.lastEdit = Date.now();
        project.lastOpenedFile = currentFile;
      }
      savePreferences();
    }
  }
  return {
    lastOpenedWorkspace,
    recentProjects,
    savePreferences,
    loadPreferences,
    onWorkspaceOpened,
    updateOpenProject,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePreferences, import.meta.hot));
}
