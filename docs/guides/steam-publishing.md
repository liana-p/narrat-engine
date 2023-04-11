---
description: >-
  If you've made a narrat game, you might want to release it on Steam. This page
  explains how
---

# Publishing on Steam (Steamworks integration)

### Narrat Steamworks integration

narrat now has a [Steamworks](https://partner.steamgames.com/) integration by default in the template. It should allow any narrat game to run on Steam with basic integration (the Steam overlay works).

For a primer on how to generally build and export narrat games, see this page:

[building-and-exporting-your-game.md](building-and-exporting)

### How to build for Steam

The integration is brand new so there are a few manual steps to setting up the integration. This might change in the future to be easier to use

#### First time setup

1. Create a game with the latest narrat template. (If updating an existing game, the simplest way would probably be to copy-paste the config, scripts and assets of the game and paste them into a brand new setup of the narrat template)
2. Edit `steam_appid.txt` at the root of the repo and put the desired steam app id. The default (`480`) is fine to use during development as it is the Steam default testing app.
3. In `electron-main.js`, near the top of the file, set `useSteam` to true
4. In `src/index.ts`, near the top of the file, set `useSteam` to true

#### Running in Steam and packaging for Steam

Steam needs to be running for a game using Steamworks to work properly, and you need to own the app matching the Steam app id being used.

To run the app directly, use `npm run electron` (after building the game) or `npm run run` (to build the game and then run electron automatically). The Steam overlay should work when doing this.

To package the game for release, run `npm run package`. The game will be in the `out` folder.

#### Adding the game to Steam

With the game built in the `out` folder, it is possible to go in Steam and choose `Add non-Steam game`, then browse to the path of the `narrat-template.exe` inside the subfolders in `out` folder, and add that .exe to Steam. It is then possible to run the game in Steam.

To actually publish the game to Steam, you should look at Steam's documentation on how to become an approved partner and publishing your app, but the app exported in the `out` folder should work on Steam

### Known limitations

- The system currently only builds for windows 64 bit. To change that, you would need to edit the part of the `package` script in `package.json` that copies the `steam_appid.txt` to copy from the right folder depending on the architecture you're targeting.
- There is currently no usage of specific Steam features (like achievements or others). Feel free to write a plugin for advanced features you may need, as the [Steamworks.js libray](https://github.com/ceifa/steamworks.js) used should enable most use cases. For more info on how Steam was integrated into narrat, see [this blog post](https://www.liana.one/integrate-electron-steam-api-steamworks)
