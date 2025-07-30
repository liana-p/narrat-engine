import { NarratPlugin, useAchievements, narratEventsEmitter } from "narrat";
import type { Client } from "steamworks.js";
import { USE_STEAM } from "./constants";

function fakeGameloopForSteam() {
  const canvas = document.getElementById(
    "fake-refresh-steam",
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

export class SteamPlugin extends NarratPlugin {
  client?: Client;

  constructor() {
    super();
    console.log(`Steam plugin constructor`);
    if (USE_STEAM) {
      this.initializeSteam();
      this.setupSteamAchievements();
    }
  }

  async initializeSteam() {
    const steamworks = require("steamworks.js");
    this.client = steamworks.init() as any;
    console.log(
      `Steamworks initialized browser side: ${this.client!.localplayer.getName()}`,
    );
    console.log(this.client);
    console.log(
      `Player steam ID: `,
      this.client!.localplayer.getSteamId().accountId,
    );
  }

  getSaveDataPathPrefix() {
    if (this.client?.localplayer) {
      const steamId = this.client.localplayer.getSteamId().accountId;
      if (!steamId) {
        console.error(
          `Error: Steam ID not found on local player. Defaulting to "steam-MISSING_ID-"`,
        );
        return "steam-MISSING_ID-";
      }
      return `steam-${steamId}`;
    }
  }

  setupSteamAchievements() {
    if (USE_STEAM && this.client) {
      // Listen for new achievements
      narratEventsEmitter.on("achievementUnlocked", (achievement) => {
        if (this.client) {
          this.client.achievement.activate(achievement);
          console.log(`Achievement activated on steam: ${achievement}`);
        }
      });
    }
  }

  unlockExistingAchievementsOnSteam() {
    // Check and unlock existing achievements, in case they somehow got missed by steam
    if (this.client) {
      Object.values(useAchievements().achievements).forEach((achievement) => {
        if (achievement.unlocked) {
          // Achievement is unlocked in the save, check it is in steam
          if (!this.client!.achievement.isActivated(achievement.id)) {
            this.client!.achievement.activate(achievement.id);
            console.log(
              `Achievement ${achievement.id} activated on steam, it was previously unlocked in the save.`,
            );
          }
        }
      });
    }
  }

  onGameStart() {
    if (USE_STEAM && this.client) {
      this.unlockExistingAchievementsOnSteam();
    }
  }

  onNarratSetup() {
    console.log(
      "Loading steam plugin - Creating a game loop to force screen refresh",
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
