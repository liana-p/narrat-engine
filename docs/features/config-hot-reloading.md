---
title: Hot Reloading for Config Files
description: In Narrat 3.6.0 and above, config files can be hot reloaded, allowing to make changes in real-time
---

## Config files hot reloading

Similarly to narrat scripts, config files can now be imported as code files and hot reloaded in narrat 3.6.0.

To use this new system, the yaml files for the config need to be moved to the `src` folder instead of the `public` folder, as they are now part of the code.

`config.yaml` also becomes `common.yaml`, and the parts of `config.yaml` which specify the paths of other config files can be deleted.

## How to migrate to the new system

The example games have been updated to use the new system, so they can be used as an example. To use the new system:

1. Move your yaml files to a `config` folder in the `src` folder
2. Create a `index.ts` file in the `src/config` folder which exports all the config files as a single object, like this:

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

3. Then, in `index.ts`, the new config object needs to be imported and passed, and the old one can be removed:

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
    config, // [!code --]
    debug,
    logging: false,
    scripts,
  });
});
```
