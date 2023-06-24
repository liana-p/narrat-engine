---
title: Hot Module reloading
---

# Hot module reloading

The development server can [hot reload](https://vitejs.dev/guide/features.html#hot-module-replacement) narrat scripts.

Essentially, narrat scripts can be edited while playing a game, and when a file is saved the changes will be picked up live, without having to restart the game.

When a narrat file is hot-reloaded, all the labels in it are updated. The next time the game jumps to any of those labels, they will have the new version.

::: tip
The hot module reload will not apply until the game has jumped to a new label
:::

## Changes to existing projects

To make this change happen, the default structure of projects has changed. Narrat files are instead imported and listed in `src/scripts.ts`. The game template has been updated to default to this method, but existing games will need to make manual changes to implement this change.

### How to migrate

To start using the new system, follow those steps:

1. Create a `shims-narrat.d.ts` file in the `types` folder with the following:

```ts
// shims-narrat.d.ts

declare module '*.narrat' {
  import { NarratScript } from 'narrat';
  const narratScript: NarratScript;
  export default narratScript;
}
```

2. Create a `scripts` folder inside `src`
3. Move all your `.narrat` scripts in the new `scripts` folder (rename from `.nar` to `.narrat` if still using `.nar` extension)
4. Create a `scripts.ts` file in the `src` folder, like in the following example:

```ts
import game from './scripts/default.narrat';
import otherFile from './scripts/otherFile.narrat';

export default [game, otherFile];
```

Add a new import line for each of your narrat files as above, and don't forget to list them in the array at the end of the file like above.

To add or remove new `narrat` scripts to your game, simply modify this file.

5. In your existing `config.yaml` file, delete the `scripts` list, and delete your `scripts.yaml` file if using it.

```yaml
screens: data/screens.yaml
buttons: data/buttons.yaml
skills: data/skills.yaml
scripts: data/scripts.yaml // [!code --]
audio: data/audio.yaml
```

6. In your `index.ts` file, add the scripts. At the top of the file:

```ts
import scripts from './scripts';
```

Then, modify the `startApp` call (usually near the bottom of the file) to add the scripts. For example:

```ts
window.addEventListener('load', () => {
  if (useSteam) {
    registerPlugin(new SteamPlugin());
  }
  startApp({
    configPath: 'data/config.yaml',
    debug,
    logging: false,
    scripts, // [!code ++]
  });
});
```

7. In your `package.json` file, at the new `vite-plugin-narrat` in the `devDependencies`:

```json
  "devDependencies": {
    "@electron-forge/cli": "^6.1.1",
    "@electron-forge/maker-deb": "^6.1.1",
    "@electron-forge/maker-rpm": "^6.1.1",
    "@electron-forge/maker-squirrel": "^6.1.1",
    "@electron-foxrge/maker-zip": "^6.1.1",
    "@electron/rebuild": "^3.2.13",
    "@vitejs/plugin-vue": "^4.2.3",
    "cross-env": "^7.0.3",
    "electron": "^25.1.0",
    "electron-winstaller": "^5.1.0",
    "prettier": "^2.8.8",
    "shx": "^0.3.4",
    "typescript": "^5.1.3",
    "vite": "^4.3.9",
    "vite-plugin-narrat": "^2.18.0" // [!code ++]
  },
```

8. Make sure you're using narrat 3.0.0 or above. If you're using an older version, update it in your `package.json` file:

```json
  "dependencies": {
    "narrat": "^3.0.0" // [!code ++]
  },
```

9. Run `npm install` to get the new dependencies

10. The game should now work with the new script system. Try editing a script and saving it, and see if the changes are picked up once you jump to a label that has changed
