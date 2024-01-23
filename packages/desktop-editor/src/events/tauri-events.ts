import { useApplication } from "@/stores/application-store";
import { useIDE } from "@/stores/ide-store";
import { emit, listen } from "@tauri-apps/api/event";
import { register } from "@tauri-apps/api/globalShortcut";
export async function setupEvents() {
  const unlisten = await listen("open", (event) => {
    useIDE().selectWorkspace();
  });
  await listen("save", (event) => {
    useIDE().saveCurrentFile();
  });
  await listen("reload", (event) => {
    useIDE().reloadIDE();
  });
  await listen("full_reload", (event) => {
    useApplication().fullReload();
  });

  // await register("CommandOrControl+S", () => {
  //   console.log("ctrl+s pressed!");
  //   useIDE().saveCurrentFile();
  // });
}
