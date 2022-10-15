---
title: Narrat Plugin API
description: The Narrat plugin API allows for extending engine features with custom code.
---

::: danger
The plugin API documentation is a work in progress, and the plugin API is being improved over time. Don't hesitate to ask on Discord for help with plugin development
:::

# Plugin API

The plugin API allows anyone to extend the engine's functionality using native TypeScript code and/or custom Vue.js components for UI.

## Features

The plugin API can currently do a few things:

- Custom data stores: Allows creation of custom [pinia](https://pinia.vuejs.org/) data stores. The custom data in those stores can then be serialised by the engine and added to game save files. UI can also use values from data stores
- Custom menu buttons and tabs: Allows adding new menu buttons or tabs in existing menus which will display any Vue.js component passed to it
- Custom Commands: Create custom commands for the narrat scripring language, using the same API as the built-in commands
- Various lifecycle hooks: Lifecycle hooks on page load, engine load, game start, and more, to run custom logic
- Access to built-in data stores: All the data stores used in the engine for managing the various features can be used by plugins to manipulate any game data
- Access to config and other utilities: The engine exports various utilities used internally and also the API to access the game's config

## How to use

There is a [sample plugin](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat-plugin-counter) in the narrat repo which serves as an example of how to use the plugin API. This plugin is a self-contained project that can be built and exported as an npm package to import and use in any narrat game.

- The `src/plugin.ts` file is the entry point for the plugin which is what gets exported and used.

- The `src/demo.ts` file is the entry point for running the plugin in dev mode, which starts a self-contained demo of narrat running the plugin

::: info
Plugins need to be registered with narrat by calling `registerPlugin`, as is done in the `demo.ts` file.
:::

::: tip
The sample plugin uses a bit of many features of the plugun API, so it's a good place to start if you want to see how everything works
:::

## How to create a plugin library

There is a [create-narrat-plugin](https://github.com/liana-p/narrat-engine/tree/main/packages/create-narrat-plugin) package which is similar to the create-narrat tool used to start new games.

By runnning:

```bash
npm create narrat-plugin@latest
```

A new project containing a plugin will be created. The template used is the sample counter plugin above

## How to create a plugin directly in a project

If making a plugin as a library isn't needed, it is possible to simply add plugin code directly in a narrat project to avoid having to build a complete package just for a plugin.

In `src/index.ts`, it is possible to directly create a plugin class (similarly to what's done in `plugin.ts` in the sample plugin) and register it directly there. This allows developing the plugin and the game alongside each other easily

## Finding out more about the API

The API isn't very documented yet, but looking at the example can help. Some relevant useful files to look at:

- [plugins.ts](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/exports/plugins.ts): The `NarratPluginObject` interface there exports the expected interface for a plugin and can be a good starting point to see available options
- [exports folder](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/src/exports): The exports folder in the narrat package contains all the files exporting the public narrat API, which can help with finding what can be imported for use in plugins
