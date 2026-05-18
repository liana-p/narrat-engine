---
title: Building and exporting a Narrat game
description: Follow these steps to build and export a narrat game for the web or desktop
---

# Building and exporting a Narrat game

::: warning
If you are already using `pnpm`, you can ignore this warning.

This guide has recently been updated to use [`pnpm`](https://pnpm.io/installation) instead of `npm` as the package manager. They work generally the same, but `pnpm` is a lot more reliable when it comes to updating narrat and generally actually working. Some bits of documentation may still refer to `npm`, but you can generally just replace `npm` with `pnpm` in commands and it should work the same.

If you don't have pnpm, simply install it, delete your `node_modules` folder and `package-lock.json` file if present, then run `pnpm install` to reinstall everything with pnpm. From that point you can use pnpm for everything.
:::

## Building your game as a website

You can build your game as a static website that can be hosted on any platforms that supports hosting html content.

```bash
pnpm build
```

::: tip
This will generate a built version of your game as a website in the `dist/` folder
:::

::: warning
Due to browsers security rules, you cannot just open the resulting `index.html` in a browser as it won't work (browsers aren't allowed to load the various assets from your local hard drive). This is not a narrat issue and is just a normal browser security restriction.
:::

If you want to test the built website locally, you need to run a static web server. There is an easy way to do this since node.js is already installed: Run `pnpm install -g http-server` on your computer to install the [http-server](https://www.npmjs.com/package/http-server) utility. Then in any folder you can run the `http-server` command and it will open a web server that lets you visit the built result.

So for example to test your built game, run:

- `pnpm install -g http-server` (only the first time to install it on your computer)
- Go to the `dist` folder of your built game: `cd dist`
- Run `http-server`
- Either ctrl+click on the link in the terminal to open it, or visit `http://127.0.0.1:8080` in your browser of choice.
- You should see your game running!

::: tip
If you want to release your game as a web game, simply zip the contents of the `dist` folder and upload them to whatever web host or itch.io style platform you want to use.
:::

## Building your game as a desktop application

The narrat template game is setup to use [electron](https://www.electronjs.org) and [electron-forge](https://www.electronforge.io) to easily build a desktop application out of your game.

## Requirements

- Have [git](https://git-scm.com) installed
- If you're installing git on windows, using the default options for every step in the setup process is fine

You can run your game as an app:

```bash
pnpm electron
```

## Building the game for desktop release

Or you can package it as an executable (should work on Windows, Mac, Linux):

```bash
pnpm build-package-windows
```

If you want a debug build that lets you use the browser devtools to investigate issues, run:

```bash
pnpm build-package-windows-debug
```

This will create an application for your OS in the `out/` folder, which you can distribute by zipping it as a folder if desired.

Please look at the [electron documentation](https://www.electronjs.org/docs/latest/) if you want to customise how your app is built, window sizes and other things (hint: Most of it takes place in the `electron-something.js` files at the root of the repo)

::: tip
There are lots of different commands included in the narrat template to build your game for various types of releases and platforms. Open the `package.json` file at the root of your game folder and have a look at the commands in the `scripts` section to see what is available.
:::

::: warning
Some commands need to know the name of your game. For example the steam release copy commands have `my-game-steam` in their name. You need to replace `my-game` with the actual name of your game for those commands to work.
:::

::: details The general format is:

- `build-[destination]-[debug]`: Builds an exe for the specified destination and OS, maybe in debug mode. Examples: `build`: builds default windows application. `build-steam`: Builds for steam. `build-steam-debug`: Builds for steam in debug mode.
- `copy-[platform]-[os]`: Copies the built exe for the specified release destination, putting all the files in the right place (this is needed for steam releases as some files need to be in specific places). Example: `copy-steam-windows`
- `package-[destination]-[os]-[debug]`: Combines the copy and package commands to create a ready to release exe for the specified destination and OS. Example: `package-steam-windows-debug`
- `build-package-[destination]-[os]-[debug]`: Combines the build and package commands to create a ready to release exe for the specified destination and OS. Example: `build-package-steam-windows`

Generally, you will likely not need to use most of those and can simply run `build-package-[destination]-[os]` to create a ready to run the full build process. The other commands are intermediaries that can be useful for debugging or if you want to do things in a specific order.
:::

## Important notes on releasing

There are a few things worth noting if you're releasing anything serious and don't want to run into issues:

- Make sure you release the right folder in `out` if you're releasing an executable, or a zip of `dist` for web. Don't accidentally include your source code files.
- By default the narrat template `package.json` file has a `license` field saying `MIT`. This is the license for the template itself, but you should delete or change that to not accidentally imply that your game is under MIT license (unless you want it to be). Similarly you should change or delete the `LICENSE` file at the root.
- If you want to release on Steam, remember to edit the `steam_appid.txt` file and include it in your final build alongside the executable

## Releasing on itch.io

A common platform to release narrat games on is [itch.io](https://itch.io), as it's a friendly platform for small indie games.

You can either release your game as a web game, or as an executable.

## Releasing on Steam

See the [Steam publishing guide](/guides/steam-publishing.md) for more information on how to release your game on Steam.

### Web game release on itch.io

Itch.io expects you to upload a zip file containing a web application, that is to say a folder containing at least a `index.html` file that has been zipped up.

When you run the `pnpm build` command, it will generate a `dist` folder containing a web version of your game. You can zip this `dist` folder and upload it to itch.io. as a web game, and your game should work on itch.io

### Desktop Application release on itch.io

To release your game as a normal desktop application on itch.io, follow the instructions for exporting your game for the OS you want to release on, and then upload that to itch.io following the normal procedure.

## Generating a setup or similar package for distributing the game

Electron is able to create release packages of the game for most common platforms. Included in the default setup of narrat are the configs to release for Windows, Mac and Linux.

## Creating a distributable (a "setup file")

To create a distributable, you need to run the following command:

```bash
pnpm make
```

:::tip
This will create a distributable for your OS in a `make` subfolder of the `out` folder.
:::

This command uses `electron-forge`'s [make](https://www.electronforge.io) command to generate a distributable like a setup for Windows, or a DMG for Mac.

It uses config defined in the `config` part of the `package.json` file, which lists the makers available and their config. There you can edit some values, or add new makers.

The options configured by default should help if you want to publish a simple game, but if you have more specific needs like publishing to app stores or in a specific format, see the sections below for more info on the available options.

In some cases, you might need to add a new dependency to your package to use a new maker. For example you might need to run `pnpm install --save-dev @electron-forge/maker-pkg` to use the .pkg maker to release on the MacOS App Store.

## Windows Distribution

The default (and recommended by Electron) way to create a Windows distributable is to use [Squirrel.Windows](https://www.electronforge.io/config/makers/squirrel.windows), which is already configured for you in narrat games and should happen if you run `pnpm make` on Windows. You can see its config in the `package.json` file.

There is also the option to create a more old school .msi installer with the [WiX MSI maker](https://www.electronforge.io/config/makers/wix-msi) which you can configure in your package.json if desired.

Finally, the [AppX maker](https://www.electronforge.io/config/makers/appx) can create Windows Store releases.

## MacOS Distribution

Running `pnpm package` on a Mac should create a file that can be executed on MacOS, but if you want to distribute your app as a dmg or pkg, or on the App Store, then you should add your own config for the [DMG maker](https://www.electronforge.io/config/makers/dmg) or [pkg maker](https://www.electronforge.io/config/makers/pkg). This should allow creation of a DMG or PKG file that can be distributed either directly or on the App Store..

## Linux Distribution

There are all sorts of ways to distribute Linux applications depending on distributions and their package managers. The list of makers in the electron-forge list a few of the options, including [.deb](https://www.electronforge.io/config/makers/deb) and [.snap](https://www.electronforge.io/config/makers/snapcraft)

## Building for Steam (experimental)

[Building for Steam](/guides/steam-publishing.md)
