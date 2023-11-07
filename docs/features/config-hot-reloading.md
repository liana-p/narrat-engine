---
title: Hot Reloading for Config Files
description: In Narrat 3.6.0 and above, config files can be hot reloaded, allowing to make changes in real-time
---

## Config files hot reloading

Similarly to narrat scripts, config files can now be imported as code files and hot reloaded in narrat 3.6.0.

To use this new system, the yaml files for the config need to be moved to the `src` folder instead of the `public` folder, as they are now part of the code.

`config.yaml` also becomes `common.yaml`, and the parts of `config.yaml` which specify the paths of other config files can be deleted.

## How to migrate to the new system

::: tip
This is only necessary if your game was created prior to 3.6.0. New games already use the new system. You can keep using the old system if you want, though in the future support for it might be dropped.
:::

The example games have been updated to use the new system, so they can be used as an example. To use the new system:

1. Update your narrat version **and vite-plugin-narrat** versions to 3.6.0 or above. The `vite-plugin-narrat` is necessary for the project to understand yaml files as "code" files.

Either change their version in package.json manually, or run:

`npm install narrat@latest vite-plugin-narrat@latest`

2. Add info about yaml files to the `shims-narrat.d.ts` file in `src/types` (which previously only had info about `.narrat` files). This tells your IDE what is in the yaml files:

```ts
// shims-narrat.d.ts

declare module '*.narrat' {
  import { NarratScript } from './app-types';
  const narratScript: NarratScript;
  export default narratScript;
}

declare module '*.yaml' {
  // [!code ++]
  import { NarratYaml } from './app-types'; // [!code ++]
  const narratYaml: NarratYaml; // [!code ++]
  export default narratYaml; // [!code ++]
} // [!code ++]

// This bit if you want to be able to use `.yml` instead of `.yaml`:
declare module '*.yml' {
  // [!code ++]
  import { NarratYaml } from './app-types'; // [!code ++]
  const narratYaml: NarratYaml; // [!code ++]
  export default narratYaml; // [!code ++]
} // [!code ++]
```

3. Move your yaml files to a `config` folder in the `src` folder
4. Create a `index.ts` file in the `src/config` folder which exports all the config files as a single object, like this:

```ts
import achievements from './achievements.yaml';
import animations from './animations.yaml';
import audio from './audio.yaml';
import buttons from './buttons.yaml';
import characters from './characters.yaml';
import choices from './choices.yaml';
import common from './common.yaml';
import items from './items.yaml';
import quests from './quests.yaml';
import screens from './screens.yaml';
import skills from './skills.yaml';
import skillChecks from './skillchecks.yaml';
import tooltips from './tooltips.yaml';
import { ModuleConfigInput } from '@/config/config-input';

const defaultGameConfigs: ModuleConfigInput = {
  achievements,
  animations,
  audio,
  buttons,
  characters,
  choices,
  common,
  items,
  quests,
  screens,
  skills,
  skillChecks,
  tooltips,
};
export default defaultGameConfigs;
```

::: tip
You may have more or less files to import depending on which config files your game uses.
:::

5. Then, in `index.ts`, the new config object needs to be imported and passed, and the old one can be removed:

```ts
import 'narrat/dist/style.css';
import './css/main.css';
import { NarratPlugin, registerPlugin, startApp } from 'narrat';
import scripts from './scripts';
import config from './config'; // [!code ++]

// Rest of code...
window.addEventListener('load', () => {
  if (useSteam) {
    registerPlugin(new SteamPlugin());
  }
  startApp({
    // Replace the old configPath option with the new config option, which takes the config object.
    configPath: 'data/config.yaml', // [!code --]
    config, // [!code ++]
    debug,
    logging: false,
    scripts,
  });
});
```

> :tada: This should be all you need, now your config files are imported as code, allowing vite to hot reload them. Some parts of the engine should now live-update when config values change, though that might not work everywhere (it depends how the config is used internally)
