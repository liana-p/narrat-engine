export const VERSION = import.meta.env.VITE_BUILD_VERSION;
export const BUILD_DATE = new Date(import.meta.env.VITE_BUILD_DATE);
export const GAME_NAME = import.meta.env.VITE_GAME_NAME;
const USE_STEAM_IMPORT = import.meta.env.VITE_STEAM;

console.log(
  `%c ${GAME_NAME} v${VERSION} - Built at ${BUILD_DATE.toLocaleString()}`,
  "background: #222; color: #f47cfc",
);

// Enable this when releasing for steam
export const USE_STEAM = !!USE_STEAM_IMPORT;
console.log(`Steam enabled: ${USE_STEAM}`);

// Set this to false if you want debug to always be disabled.
// Note: Debug gets auto disabled on builds via the environment variable "VITE_BUILD", passed by the script that runs the game.

export let DEBUG = true;

if (import.meta.env.VITE_BUILD && !import.meta.env.VITE_DEBUG) {
  DEBUG = false;
}
