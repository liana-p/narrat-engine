---
description: This documentation page explains how to edit a narrat game
---

# Editing a narrat game

There are two types of content to edit to make a narrat game:

- Dialogue scripts: `.narrat` files that contain the branching narrative of the game
- Config files: `.yaml` files that contain config data about the game

## `public` folder

The assets and config files are inside the `public` folder from the root of the game. This public folder is a folder for static assets which will be added to the final build. A narrat game is effectively made of config files and assets that are all inside this folder.

## `src` folder

The `src` folder is where scripts live. There are TypeScript files to setup the engine, and more importantly in the `script` subfolder are the `.narrat` script files that make up your game.

For advanced uses, it is also possible to change code itself or integrate plugins, which also would be in the `src` folder.

## Narrat scripts

[example-narrat-script.md](../examples/example-narrat-script.md)

Narrat scripts are the main way a game is created. They contain the flow of the game and lines of dialogue. The [narrat scripting language](../scripting/language-syntax.md) is specifically made for narrat.

In the `src/scripts` folder of the game, there is an `game.narrat` file (or named differently depending on which template you used). This is where the actual game dialogue is written. The example dialogue there shows how to use a few basic features, so you can easily start writing your own dialogue. Just above is a link to the example narrat script page to find more examples as needed.

## Importing scripts

All the narrat scripts used in a game are imported and listed in `src/scripts.ts`. If you want to add or remove narrat scripts from your game, import them at the top of that file and remember to add or remove them from the list of scripts exported at the end of the file.

Example `scripts.ts`:

```ts
import demo from './scripts/demo.narrat';
import quest from './scripts/quest.narrat';

export default [demo, quest];
```

Narrat scripts are in a custom language nade for narrat, see the [language syntax guide](../scripting/language-syntax.md) page for more info.

::: tip
We advise using [Visual Studio Code](https://code.visualstudio.com) for editing narrat scripts. There is a [Narrat Language VS Code extension](https://marketplace.visualstudio.com/items?itemName=NarratEngine.language-narrat) which will give you great syntax highlighting.
:::

See the [language syntax page](../scripting/language-syntax.md) below for more details on how to write narrat scripts.

## Example scripts

There are a number of [example narrat games](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/examples) available. Reading through their `.narrat` script files can be a good support for finding out how to do various things.

## Config files

There are various config files in narrat games which allow to extensively customise how the engine behaves.

By default, games ship with a default config so you don't need to do anything. As you start using more features, you will need to edit the config as needed.

#### config.yaml

The config file contains basic info about the game. In it are defined images, screens, buttons, musics, skill checks, items, quests and more.

More info about the config files in the [Config Files guide](config-files.md)

#### characters.yaml

The `characters.yaml` file contains the config for all characters that can speak in the game. They should all at least have a name value, and an `idle` sprite. The sprite is used for displaying character portraits during dialogue, and the value should be a file path relative to the `imagesPath` value defined in the config part of this file

The color character names appears as can be changed with the `color` value in the `style` property of the character (the value can be any valid CSS color).

### What next?

Making a game is simply a matter of editing those files to write the game you want. To know more about available features, look at the left sidebar of this documentation website to see pages about all the features and guides on specific things.

::: tip
Many features get added to narrat frequently and some aren't documented yet but explained in the changelog. See the "Updating narrat" page below for more info.
:::

[updating-narrat.md](updating-narrat.md)
