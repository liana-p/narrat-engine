import { Command } from "@tauri-apps/api/shell";
import { type } from "@tauri-apps/api/os";
import { useIDE } from "@/stores/ide-store";

let osType: string = "Linux";
async function setupPlatform() {
  osType = await type();
}
setupPlatform();
function getNpmScriptName() {
  switch (osType) {
    case "Windows_NT":
      return "run-npm-scripts-windows";
    default:
      return "run-npm-scripts";
  }
}

export async function launchNarratGame(projectPath: string) {
  const command = new Command(getNpmScriptName(), ["run", "dev"], {
    cwd: projectPath,
  });
  command.on("close", (data) => {
    console.log(
      `command finished with code ${data.code} and signal ${data.signal}`,
    );
  });
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line: string) => {
    console.log(`command stdout: "${line}"`);
    // Hack to detect that Vite says the dev server is ready
    if (line.search("ready in")) {
      console.log("Narrat game server ready, launching the game");
      useIDE().notifyGameHasStarted();
    }
  });
  command.stderr.on("data", (line) => console.log(`command stderr: "${line}"`));

  const child = await command.spawn();
  console.log("narrat game process started, pid:", child.pid);
  return child;
}
