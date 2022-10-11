import "narrat/dist/style.css";
import "./css/main.css";
import { NarratPlugin, registerPlugin, startApp } from "narrat";

// Enable this when releasing for steam
const useSteam = false;

// Set this to false if you want debug to always be disabled.
// Note: Debug gets auto disabled on builds via the environment variable "VITE_BUILD", passed by the script that runs the game.

let debug = true;

if (import.meta.env.VITE_BUILD && !import.meta.env.VITE_DEBUG) {
  debug = false;
}

class SteamPlugin extends NarratPlugin {
  onNarratSetup() {
    console.log(
      "Loading steam plugin - Creating a game loop to force screen refresh"
    );
    const canvas = document.createElement("canvas");
    canvas.id = "fake-refresh-steam";
    canvas.width = 1;
    canvas.height = 1;
    const styler = canvas as any as HTMLDivElement;
    styler.style.position = "fixed";
    styler.style.top = "0px";
    styler.style.bottom = "0px";
    styler.style.pointerEvents = "none";
    styler.style.zIndex = "30000";
    document.body.appendChild(canvas);
    fakeGameloopForSteam();
  }
}

function fakeGameloopForSteam() {
  const canvas = document.getElementById(
    "fake-refresh-steam"
  ) as HTMLCanvasElement;
  const styler = canvas as any as HTMLDivElement;
  styler.style.width = `100vw`;
  styler.style.height = `100vh`;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
  ctx.fillRect(0, 0, 1, 1);
  requestAnimationFrame(fakeGameloopForSteam);
}

window.addEventListener("load", () => {
  if (useSteam) {
    registerPlugin(new SteamPlugin());
  }
  startApp({
    configPath: "data/config.yaml",
    debug,
    logging: false,
  });
});
