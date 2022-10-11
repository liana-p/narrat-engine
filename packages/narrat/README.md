# 🚀 Narrat

![example workflow](https://github.com/liana-p/narrat-engine/actions/workflows/main.yml/badge.svg)

[![Open in Codeflow](https://developer.stackblitz.com/codeflow/assets/button-open-in-codeflow-medium.svg)](https://pr.new/github.com/liana-p/narrat-engine/edit/main/packages/narrat/README.md)

Narrat is a game engine for making interactive narrative RPGs packed with features.. Create your game by editing with a Simple scripting syntax. It supports Skills with skill check rolls, an Items inventory, and has a Quests System. The script system is very powerful and allows branching choices, functions, variables and conditions.

More info on the [narrat website](https://get-narrat.com). There is an [online demo](https://get-narrat.com/demo/) available to try in the browser.

## Getting Started

The best way to get started in a minute is to follow the [Getting Started](https://docs.get-narrat.com/guides/getting-started) documentation page. It shows you to download the ready-to-use game template to get started writing a game with narrat.

## Development (for contributors)

Note: Narrat is a monorepo using `pnpm` as package manager. The `packages` folder contains the individual packages, including the main `narrat` package.

Narrat is written in [TypeScript](https://www.typescriptlang.org/). It uses the [Vue](https://vuejs.org/) framework for front-end development. It also uses [pinia](https://pinia.vuejs.org/) for state management

### Requirements

- [node.js](https://nodejs.org/en/) (Downloading LTS is fine)
- [pnpm](https://pnpm.io/). This Narrat repo is a monorepo using pnpm workspaces to easily manage the different packages.
- A text editor capable of editing a TypeScript and Vue.js project. Recommended: [VSCode](https://code.visualstudio.com/) and the extension [Volar](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-volar) for Vue.

### Running the engine for development

1. Install dependencies

`pnpm install`

2. Run the demo

`pnpm dev`

This starts the engine on the demo page with the `example.nar` demo script loaded for testing.

### Developping narrat specifically

If developping on the narrat package, it's better to go inside the narrat package folder and run commands there.

### Multiple demo games

There are multiple demo games and it's possible to add new ones. For example `npm run rpg` will run the `rpg` demo. Demos are in the `examples` folder.

Running a specific demo is done by changing an environment variables. See the scripts in `package.json` for how to run a specific demo.

### Available pnpm commands in narrat

- `start`: Start the demo for development
- `build`: The main build command, builds the library in a state ready to use or publish.
- `test`: Unit tests, used in CI
- `dev`: Same as start
- `generate-types`: Generates `.d.ts` type declaration files for the library (auto run on builds)
- `fix-type-aliases`: Uses [tsc-alias](https://www.npmjs.com/package/tsc-alias) to auto-replace [path mappings](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) in the built files, as the TypeScript compiler doesn't do it. (auto run at the end of builds)
- `lint`: Runs the linter on the code (used in CI)
- `check-types`: Validates TypeScript types.

### CI info

The following tasks run on CI, and CI is required to pass for pull requests to be merged:

- Linting
- Engine build
- Unit tests (currently only the parser is unit tested)
- TypeScript type checking.

Please make sure your code passes lint/tests/build/type checks before opening a PR.

### Working on the code

The narrat codebase isn't currently documented, outside of the [usage docs](https://docs.get-narrat.com). The code is fully written in TypeScript though and should be clearly separated enough to be approachable.

### Engine architecture

The narrat engine runs primarily as a Vue app. All the UI in the game is made of Vue components, and when a game uses narrat it effectively creates a Vue app.

#### App state

The engine's state is stored in pinia. It is split in separate pinia modules for different areas of the engine. They can all be found in the [src/stores](src/stores) folder.

- `audio`: handles playing and stopping audio and music
- `dialog`: Receives and stores all lines of dialogue created by game scripts which appear at the right of the game in the main interactive narrative view.
- `hud`: Stores stats which are displayed on the hud
- `inventory`: Manages the player's item inventory
- `main`: Manages app-level logic and other generic systems like startup/reset/load/save
- `notifications`: Manages notifications which appear at the top of the screen
- `quests`: Manages quests and objectives
- `rendering`: Manages the layout's state for dynamically placing and resizing the game UI
- `skills`: Manages player skills and xp. Also store skill check states
- `vm`: Manages the virtual machine which runs the scripting language and controls the game flow.

All stores can be accessed anywhere in the code with the `use` hooks (example: `useVM()`).

#### Scripting language (VM and parser)

The scripting language for narrat runs in a virtual machine which has its state stored in the Vue app with Pinia.

The narrat scripting language relies on the parser and the vm. The code for the parser is mainly in [src/vm/vm-parser.ts](src/vm/vm-parser.ts). The parser is in charge of taking the `.nar` files as input, and returning a tree of parsed expressions that the engine can use.

The actual VM is what runs narrat games, and generally controls the flow of the application. The general logic for the vm is in the `vm` store, but there is also some logic sprinkled in the `src/vm` file.

All the actual operations available to the scripting language (like `talk`) are defined as Command plugins. The built-in commands included in the language by default are in the [src/vm/commands](src/vm/commands/) folder. More command can be added by games by registering plugins.

#### Adding new commands

Language commands are defined in the `vm/commands` folder. It should be easy to add new commands to the game engine by looking at the existing commands as an example. New command plugins are included in the `vm/commands/index` file.

#### Config file

The main config file has a type defined in `src/config.ts`. The vast majority of the config options for narrat are passed in this config files, which games must provide to the engine when starting. New options for the engine should be added to the type for the config file, and also have their default value included in the `src/defaultConfig.ts` file.

Engine code can access the config with the `getConfig()` function.

#### Plugin system

There is now a plugin system developers can use to add new functionality to narrat (more documentation soon). See the [narrat-bitsy](https://github.com/liana-pigeot/narrat-bitsy) plugin for an example.

(Note: The narrat-bitsy plugin hasn't been updated for 2.0.0 and might be a bit out of date).

## Assets used in demo games

- [Pointing arrows from OpenGameArt](https://opengameart.org/content/pointing-arrows)
- [UI button from OpenGameArt](https://opengameart.org/content/buttons-and-frame)
- [10 Basic RPG enemies](https://opengameart.org/content/10-basic-rpg-enemies)
- [RPG Battle backgrounds from OpenGameArt](https://opengameart.org/content/backgrounds-3)
- [3D City from OpenGameArt](https://opengameart.org/content/3d-city)

The rest is handmade.
