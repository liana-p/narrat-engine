export interface WorkspacePreferences {
  workspaceRoot: string;
  lastOpenedFile: string | null;
  lastEdit: number;
}

export interface UserPreferences {
  lastOpenedWorkspace: string | null;
  recentProjects: WorkspacePreferences[];
  currentProject: string | null;
}
