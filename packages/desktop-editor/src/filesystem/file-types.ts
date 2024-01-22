export interface OpenedEntry {
  path: string;
  name: string;
  directory?: boolean;
  content: string;
  children?: OpenedEntry[];
}

export type OpenedDirectory = OpenedEntry & {
  directory: true;
  children: OpenedEntry[];
};

export type OpenedFile = OpenedEntry & {
  directory: false;
  unsavedChanges?: boolean;
};

export function isDirectory(entry: OpenedEntry): entry is OpenedDirectory {
  return entry.directory === true;
}

export function isFile(entry: OpenedEntry): entry is OpenedFile {
  return entry.directory === false;
}
