import "narrat/dist/main.css";
import "./css/main.css";
import { registerPlugin, startApp } from "narrat";
import scripts from "./scripts";
import config from "./config";
import { strings } from "./strings/strings";
import { DEBUG, USE_STEAM } from "./constants";
import { SteamPlugin } from "./steam-plugin";

window.addEventListener("load", () => {
  let steam: SteamPlugin | undefined;
  if (USE_STEAM) {
    steam = new SteamPlugin();
    registerPlugin(steam);
  }
  startApp({
    debug: DEBUG,
    logging: false,
    scripts,
    config,
    localization: {
      debug: DEBUG,
      lng: "fr",
      resources: {
        // Puts all the string translation files we have in there
        ...strings,
      },
    },
  });
});
