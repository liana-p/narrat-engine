---
title: Building and exporting a Narrat game
description: Follow these steps to build and export a narrat game for the web or desktop
---

# Building and exporting a Narrat game

## Building your game as a website

You can build your game as a static website

```
npm run build
```

::: tip
This will generate a built version of your game as a website in the `dist/` folder
:::

## Building your game as an app

The narrat template game is setup to use [electron](https://www.electronjs.org) and [electron-forge](https://www.electronforge.io) to easily build a desktop application out of your game.

#### Requirements

- Have [git](https://git-scm.com) installed
- If you're installing git on windows, using the default options for every step in the setup process is fine

You can run your game as an app:

```bash
npm run electron
```

#### Building the game

Or you can package it as an executable (should work on Windows, Mac, Linux):

```bash
npm run package
```

::: tip
This will create an application for your OS in the `out/` folder, which you can distribute by zipping it as a folder if desired.
:::

Please look at the [electron documentation](https://www.electronjs.org/docs/latest/) if you want to customise how your app is built, window sizes and other things (hint: Most of it takes place in the `electron-something.js` files at the root of the repo)

## Releasing on itch.io

A common platform to release narrat games on is [itch.io](https://itch.io), as it's a friendly platform for small indie games.

You can either release your game as a web game, or as an executable.

### Web game release on itch.io

Itch.io expects you to upload a zip file containing a web application, that is to say a folder containing at least a `index.html` file that has been zipped up.

When you run the `npm run build` command, it will generate a `dist` folder containing a web version of your game. You can zip this `dist` folder and upload it to itch.io. as a web game, and your game should work on itch.io

### Desktop Application release on itch.io

To release your game as a normal desktop application on itch.io, follow the instructions for exporting your game for the OS you want to release on, and then upload that to itch.io following the normal procedure.

## Generating a setup or similar package for distributing the game

Electron is able to create release packages of the game for most common platforms. Included in the default setup of narrat are the configs to release for Windows, Mac and Linux.

### Creating a distributable (a "setup file")

To create a distributable, you need to run the following command:

```bash
npm run make
```

:::tip
This will create a distributable for your OS in a `make` subfolder of the `out` folder.
:::

This command uses `electron-forge`'s [make](https://www.electronforge.io) command to generate a distributable like a setup for Windows, or a DMG for Mac.

It uses config defined in the `config` part of the `package.json` file, which lists the makers available and their config. There you can edit some values, or add new makers.

The options configured by default should help if you want to publish a simple game, but if you have more specific needs like publishing to app stores or in a specific format, see the sections below for more info on the available options.

In some cases, you might need to add a new dependency to your package to use a new maker. For example you might need to run `npm install --save-dev @electron-forge/maker-pkg` to use the .pkg maker to release on the MacOS App Store.

### Windows Distribution

The default (and recommended by Electron) way to create a Windows distributable is to use [Squirrel.Windows](https://www.electronforge.io/config/makers/squirrel.windows), which is already configured for you in narrat games and should happen if you run `npm run make` on Windows. You can see its config in the `package.json` file.

There is also the option to create a more old school .msi installer with the [WiX MSI maker](https://www.electronforge.io/config/makers/wix-msi) which you can configure in your package.json if desired.

Finally, the [AppX maker](https://www.electronforge.io/config/makers/appx) can create Windows Store releases.

### MacOS Distribution

Running `npm run package` on a Mac should create a file that can be executed on MacOS, but if you want to distribute your app as a dmg or pkg, or on the App Store, then you should add your own config for the [DMG maker](https://www.electronforge.io/config/makers/dmg) or [pkg maker](https://www.electronforge.io/config/makers/pkg). This should allow creation of a DMG or PKG file that can be distributed either directly or on the App Store..

### Linux Distribution

There are all sorts of ways to distribute Linux applications depending on distributions and their package managers. The list of makers in the electron-forge list a few of the options, including [.deb](https://www.electronforge.io/config/makers/deb) and [.snap](https://www.electronforge.io/config/makers/snapcraft)

## Building for Steam (experimental)

[Building for Steam](/guides/steam-publishing.md)
