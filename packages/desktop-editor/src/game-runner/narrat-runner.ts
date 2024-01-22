import { Command } from "@tauri-apps/api/shell";

export async function launchNarratGame(projectPath: string) {
  const command = new Command(`run-npm-scripts`, ["run", "dev"], {
    cwd: projectPath,
  });
  command.on("close", (data) => {
    console.log(
      `command finished with code ${data.code} and signal ${data.signal}`,
    );
  });
  command.on("error", (error) => console.error(`command error: "${error}"`));
  // command.stdout.on("data", (line) => console.log(`command stdout: "${line}"`));
  command.stderr.on("data", (line) => console.log(`command stderr: "${line}"`));

  const child = await command.spawn();
  console.log("narrat game started, pid:", child.pid);
  return child;
}
