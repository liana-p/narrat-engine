import { open } from "@tauri-apps/api/dialog";
import {
  readDir,
  readTextFile,
  writeTextFile,
  FileEntry,
} from "@tauri-apps/api/fs";
import { OpenedEntry, OpenedFile } from "./file-types";

const ignoredFolders: RegExp[] = [
  /node_modules/,
  /dist/,
  /src_tauri/,
  /\.mp3$/,
  /\.wav$/,
  /\.ogg$/,
  /\.flac$/,
  /\.aac$/,
  /\.m4a$/,
  /\.mp4$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.gif$/,
  /\.svg$/,
  /\.webp$/,
  /\.ico$/,
];

export async function selectFolder() {
  const selected = await open({
    directory: true,
    recursive: true,
    title: "Open a Narrat project folder",
  });
  if (selected === null) {
    // user cancelled the selection
    return null;
  } else if (typeof selected === "string") {
    // user selected a single file
    return selected;
  } else {
    console.error(`Unexpected return value from open dialog: ${selected}`);
    return null;
  }
}

export async function processWorkspace(workspacePath: string) {
  const entries = await readDir(workspacePath, { recursive: true });
  const root: OpenedEntry = {
    path: workspacePath,
    name: workspacePath,
    directory: true,
    content: "",
    children: [],
  };
  root.children = await processEntryChildren(entries);
  return root;
}

export async function processEntryChildren(
  entries: FileEntry[],
): Promise<OpenedEntry[]> {
  const folders: OpenedEntry[] = [];
  const files: OpenedEntry[] = [];
  for (const entry of entries) {
    const processed = await processEntry(entry);
    if (processed) {
      if (processed.directory) {
        folders.push(processed);
      } else {
        files.push(processed);
      }
    }
  }
  folders.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  files.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return [...folders, ...files];
}

export async function processEntry(
  entry: FileEntry,
): Promise<OpenedEntry | null> {
  for (const ignored of ignoredFolders) {
    if (ignored.test(entry.path)) {
      return null;
    }
  }
  if (entry.children) {
    return processDirectory(entry);
  } else {
    return processFile(entry);
  }
}

export async function processDirectory(
  folder: FileEntry,
): Promise<OpenedEntry> {
  console.log(folder.name);
  const result: OpenedEntry = {
    path: folder.path,
    name: folder.name ?? "",
    directory: folder.children !== null,
    content: "",
    children: [],
  };
  result.children = await processEntryChildren(folder.children ?? []);
  return result;
}

export async function processFile(entry: FileEntry): Promise<OpenedEntry> {
  const result: OpenedEntry = {
    path: entry.path,
    name: entry.name ?? "",
    directory: false,
    content: "",
  };
  return result;
}

export async function readFile(file: OpenedFile): Promise<string> {
  console.log("reading file ", file.path);
  const contents = await readTextFile(file.path);
  return contents;
}

export async function saveFile(file: OpenedFile) {
  await writeTextFile(file.path, file.content);
}
