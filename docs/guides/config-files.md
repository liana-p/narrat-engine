---
description: A narrat game needs various config files to function
---

::: warning
There have been recent changes to the config files to add the [live reloading](../features/config-hot-reloading.md) feature to them. The documentation may not be fully updated for this.

The main important change is that config files are now in the `src/config` folder instead of the `public/data` folder. The main `config.yaml` also becomes `common.yaml`, and the parts of `config.yaml` which specify the paths of other config files can be deleted.

Everything else is the same as before.
:::

# Config files

Config files are all written in [yaml](https://fileinfo.com/extension/yaml) by default, though you can also use json (this is not encouraged).

## Introduction

A narrat game needs a few config files to function. For example the main `common.yaml` is where a lot of settings are configured, and `characters.yaml` is where the various characters that can speak in the game are setup. On top of that, there are config files for specific features (like `items.yaml` or `skills.yaml`).

There are example files available, and games already come with config files setup.

[example-config.md](../examples/example-config.md)

## Editing the config

By default the config files should be in `src/config`. If you want to change its position, edit `src/index.ts` to have the correct path to your new localisation.

The `index.ts` file in `src/config` is the one importing and combining all the config file, so if you need to add, remove or move config files, you will need to update `index.ts` accordingly.

The `config.yaml` file is a [yaml](https://fileinfo.com/extension/yaml) file which should already contain everything necessary if using the template, but some optional values can be omitted. For an example config file, look at the [example configs page](../examples/example-config.md). It may also be relevant to look at other yaml files in the example games.

## Other config files

Many parts of `config.yaml` list a path to another `.yaml` file. This is to separate config into manageable chunks where you only edit the file relevant to a feature (like `skills.yaml`, or `items.yaml`).

The various features and guides sections of this documentation can give more information about how to use each option.

::: tip
The [examples folder](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games) of narrat contains the config for a bunch of example games, which can help you discover available options.
:::

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
- objectives: A key-value list of objectives defined in the `ObjectiveDataSchema`

Then, an objective config has:

- description: A mandatory string
- hidden: An **optional** boolean value

:::

## How the config works

The engine follows this process for loading the config:

- Each config section has a **default config**. This default config exists to provide default values to options that don't need to be changed by default
- The engine loads the **game's config files**. Those are the files coming from the game itself
- **Each default config is merged with the game's config** so that whatever the game customised overrides what's in the default options

## Characters config

Additionally to `common.yaml`, there is a separate `characters.yaml` file containing the config for all characters in the game.

See more info at the [characters and portraits guide](../features/characters-and-portraits.md)

### Other config files

There are individual config files for most narrat features which you can edit. The best way to learn about them is to look at example games and see how they are used.

- [Example test games in the narrat repo](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games)
- [Example games in the narrat-examples repo](https://github.com/liana-p/narrat-examples)
