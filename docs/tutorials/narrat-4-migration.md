---
title: Narrat 4 Migration
description: Narrat 4 introduces a few changes and improvements that are worth knowing about if you're upgrading a Narrat 3 game.
---

# Narrat 4 changes

Narrat 4 adds:

- Localization support
- A modified narrat app template with some new code to better handle Steam support and easier build scripts
- A redone settings menu with unified settings UI and gamepad support
- External dependencies all updated to their latest versions
- Other bugfixes

## How to update a game

Those instructions have been tested on a few existing games and should work for most games, but there may be some edge cases that require additional changes, or bugs in Narrat 4 that haven't been discovered yet. At the moment there are no known issues with the migration though.

1. First make sure you have version control like Git so you can revert changes if needed, or at least create a backup.
2. Update your `narrat` package to the latest version with `pnpm install narrat@latest`
3. Create a sample narrat 4 game in another folder to use as reference when comparing your template with the new one. You can do this by running `pnpm create narrat@latest` in a different folder from your existing game.
4. Follow the rest of the instructions to update a few things, or enable new features like localization.

## Mandatory changes

Those changes are required for your game to work with Narrat 4.

### Update to node.js 22

Narrat 4 required node.js 22 or above. It is recommended to use [nvm](https://github.com/nvm-sh/nvm), or [nvm-windows](https://github.com/coreybutler/nvm-windows) on Windows to easily manage and update node.js. Previous versions of Narrat used older node.js versions, so you may need to update.

Once you update, restart your terminal and run `node -v` to verify that the version is 22 or above. Also, delete the `node_modules` folder in your game so you can run `pnpm install` fresh without potentially outdated files.

### CSS path change

in `src/index.ts` you need to change the name of the narrat css file being imported usually at the first line is a line importing the narrat CSS file:

```ts
import 'narrat/dist/style.css'; // [!code --]
import 'narrat/dist/narrat.css'; // [!code --]
```

## Other recommended changes

The rest of those changes aren't mandatory for the game to work, but are recommended to keep up with the updates.

### Update libraries

In your `package.json` file, you should update the version number of many libraries to match what the narrat template has. Scroll to where all the version numbers are listed, and match them to what's in the game you created in step 3 above.

### Add localization support

Create a `localization.yaml` file with localization config, and make sure to include it to the list of configs in `src/configs/index.ts`. Then you can create a `strings` folder with all the yaml files for each language. The easiest way to do that is to simply copy them from the narrat template game you created in step 3 above, which comes with a few example languages.

### Copy across code and package.json scripts

A lot of those changes go together, and will allow you to have all the code setup for a more stable build and Steam support, among other things.

#### Package.json updates

The `package.json` file contains the scripts you can run (like `pnpm run build` or `pnpm run dev`). The narrat template has a lot of new scripts organised into categories for different types of builds and platforms, as well as for releasing on steam or pushing on itch.io.

1. You should copy the entire `scripts` section from the narrat template game you created in step 3 above, and paste it into your existing game's `package.json` file, replacing the old scripts.
2. Along that, copy-paste the `scripts` folder in the new narrat template into the root of your game, it contains a few helper files that are used by the scripts in `package.json`.
3. Run a `Ctrl+H` search and replace in your text editor to replace `my-game` with the name of your game (using `dash-case-syntax`, no spaces). Also note that the game name can have `-steam` added as a prefix for Steam builds (see steam publishing docs for more context).

#### electron-main.js updates

You should copy the `electron-main.js` file from the narrat template game you created in step 3 above, and replace your existing one. If you had custom modifications in this file, use your best judgement to merge the changes.

#### src/index.ts changes

1. Copy across the `src/constants.ts` and `src/steam-plugin.ts` files from the new narrat template into the src folder of your game.
2. In `src/index.ts`, you can delete the Steam plugin as it will now be imported by another file, as well as debug variables.

Essentially you want a clean slate that looks like this:

```ts
import 'narrat/dist/main.css';
import './css/main.css';
import { registerPlugin, startApp } from 'narrat';
import scripts from './scripts';
import config from './config';
import { strings } from './strings/strings';
import { DEBUG, USE_STEAM } from './constants';
import { SteamPlugin } from './steam-plugin';

window.addEventListener('load', () => {
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
      lng: 'en',
      resources: {
        // Puts all the string translation files we have in there
        ...strings,
      },
    },
  });
});
```

But if you had custom plugins or code in your `src/index.ts`, remember to keep those.

## UI Changes

The most important one is the settings menu which has been reworked for gamepad support. If you had custom UI styling in your game, you will likely want to look at this screen to style it to your liking.
