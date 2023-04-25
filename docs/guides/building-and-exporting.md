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

The narrat template game is setup to use [electron](https://www.electronjs.org) to easily build a desktop application out of your game.

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
This will create an application for your OS in the `out/` folder
:::

Please look at the [electron documentation](https://www.electronjs.org/docs/latest/) if you want to customise how your app is built, window sizes and other things (hint: Most of it takes place in the `electron-something.js` files at the root of the repo)

## Building for Steam

[Building for Steam](/guides/steam-publishing.md)
