---
description: A narrat game needs various config files to function
---

# Config files

Config files are all written in [yaml](https://fileinfo.com/extension/yaml) by default, though you can also use json (this is not encouraged).

## Introduction

A narrat game needs a few config files to function: The main `config.yaml` is where a lot of settings are configured, and `characters.yaml` is where the various characters that can speak in the game are setup. On top of that, there are config files for specific features (like `items.yaml` or `skills.yaml`).

::: details Split config or embedded config in config.yaml

It is possible to put the config of those other files like `items.yaml` directly in the main `config.yaml`, but this is not encouraged and will probably be deprecated in the future. The narrat template already comes with feature-specific separate config files, which is much easier to use and understand than a single giant config file.

:::

There are example files available:

[example-config.md](../examples/example-config.md)

## Editing the config

By default `config.yaml` should be in `public/data`. If you want to change its position, edit `src/index.ts` to have the correct path to your new localisation

::: details How to manually setup config files (ignore this if using the template)

To manually setup config files to use with narrat, you need your code to call the `startApp` function from narrat, passing it a config object that includes the path to config files:

```typescript
import './css/main.css';
import { startApp } from 'narrat';

window.addEventListener('load', () => {
  startApp(
    {
      charactersPath: 'data/characters.yaml',
      configPath: 'data/config.yaml',
    },
    {
      debug: true,
      logging: false,
    },
  );
});
```

:::

The `config.yaml` file is a [yaml](https://fileinfo.com/extension/yaml) file which should already contain everything necessary if using the template, but some optional values can be omitted. For an example config file, look at the [example configs page](../examples/example-config.md)

The various features and guides sections of this documentation can give more information about how to use each option.

## Validation

**Config files are validated by the engine**. This means when running the game, the engine will show error messages explaining any missing or incorrect values in config files. **This ensures configuration files are always correct.**

## Config options

There are many possible options in the config. They are not currently all documented, but **the documentation for a specific feature often shows or explains the relevant config**.

::: details <strong>Finding out possible config options from the source (advanced usage)</strong>

**More advanced use:** To see the exact definition of config files and their options, look in the [config folder of the engine code](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/src/config). This is where all the possible config options are defined in a json-schema format. This is harder to read, but it is the actual source that defines the possible options in the code, and is likely to be the most up to date way of finding out possible options.

For example:

```ts
export const ObjectiveDataSchema = Type.Object({
  description: Type.String(),
  hidden: Type.Optional(Type.Boolean()),
});
export const QuestDataSchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
  objectives: Type.Record(Type.String(), ObjectiveDataSchema),
});
```

This quest config means a quest has the following properties:

- title: A mandatory string value
- description: A mandatory string value
- objectives: A key-value list of objectives defined in the ObjectiveDataSchema

Then, an objective config has:

- description: A mandatory string
- hidden: An **optional** boolean value

:::

### How the config works

The engine follows this process for loading the config:

- Each config section has a **default config**. This default config exists to provide default values to options that don't need to be changed by default
- The engine loads the **game's config files**. Those are the files coming from the game itself
- Each **default config is merged with the game's config** so that whatever the game customised overrides what's in the default options

### Characters config

Additionally to `config.yaml`, there is a separate `characters.yaml` file containing the config for all characters in the game.

A character's config can have the following values:

- `name`: The name the character will appear as
- `sprites`: A key-value object of pose names to the url of the picture to use for that pose. Poses are used with the talk command (the command `talk player idle "A sentence"` would use the character "player" with the picture for the pose named "idle")
- `style`: An object to customise how that character looks with the following options:
  - color: a CSS color (ie. "red", or #FFF)
  - boxCss: [CSS style object](https://www.w3schools.com/jsref/dom_obj_style.asp) for custom-styling of the box encapsulating a dialogue from that character.
  - nameCss: Same as above, but the styling will apply to the name of the character specifically
  - textCss: Same as above, but will apply to the text "spoken" by the character

Example character config file:

```yaml
---
config:
  imagesPath: './img/characters/'
characters:
  game:
    name: ''
    color: white
  player:
    style:
      color: orange
    sprites:
      idle: player.webp
    name: You
  cat:
    sprites:
      idle: cat_idle.webp
    style:
      color: white
    name: Generic Cat
  shopkeeper:
    sprites:
      idle: shop_cat.webp
    style:
      color: white
    name: Shopkeeper
  helper:
    sprites:
      idle: helper_cat.webp
    style:
      color: green
    name: Helper Cat
  music_cat:
    sprites:
      idle: music_cat.webp
    style:
      color: '#7f06e2'
      boxCss:
        background-color: red
      textCss:
        color: white
        font-family: Comic Sans MS
    name: Music Cat
  inner:
    sprites:
      idle: inner_voice.webp
    style:
      color: red
    name: Inner Voice
```
