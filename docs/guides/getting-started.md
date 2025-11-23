---
title: Get Started with Narrat and create a game in a minute
description: This guide explains how to get started using the narrat game engine in a minute
---

# {{ $frontmatter.title }}

Getting started with narrat is very quick. There is a ready-to-use template that can get you running your game in a minute

::: warning
If you are already using `pnpm`, you can ignore this warning.

This guide has recently been updated to use [`pnpm`](https://pnpm.io/installation) instead of `npm` as the package manager. They work generally the same, but `pnpm` is a lot more reliable when it comes to updating narrat and generally actually working. Some bits of documentation may still refer to `npm`, but you can generally just replace `npm` with `pnpm` in commands and it should work the same.

If you don't have pnpm, simply install it, delete your `node_modules` folder and `package-lock.json` file if present, then run `pnpm install` to reinstall everything with pnpm. From that point you can use pnpm for everything.
:::

## In this page

[[toc]]

## What Narrat is for

**Narrat specialises in helping you create narrative games with no programming.** If you want to make action games, or games with many custom-made features, you may want a more typical general-purpose game engine. You can read more about Narrat's features, philosophy, limitations and how to add new features in [this page](/others/what-can-narrat-do).

## Interactive Demo

If you want to quickly get an idea of how narrat works without creating a project, the [interactive playground demo](https://demo.narrat.dev/) lets you edit the narrat demo game instantly in your browser.

## Video Guide

For text instructions, jump to [the next section](#text-instructions).

If you prefer to follow a video, this one minute video shows the entire setup from start to having the game running.

<iframe width="560" height="315" src="https://www.youtube.com/embed/516YTDxSO9Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Text Instructions

## Prerequisites

- Be on a computer running Windows, MacOS or Linux
- Being able to use the terminal and powershell on your computer (some computers block it by default, so if your terminal complains about not being allowed to run script, look at [this solution](https://superuser.com/a/106363))
- Have [node.js ](https://nodejs.org/en/) 22.17.1+ installed (pick the current LTS version). Strongly recommended to use [nvm (linux/mac)](https://github.com/nvm-sh/nvm) or [nvm for windows](https://github.com/coreybutler/nvm-windows) to install and manage your node.js version easily for future updates, and always install the current LTS version.
- Once node.js is installed, [install pnpm](https://pnpm.io/installation). On Windows, you can run `Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression` to install it.
- A text editor, we recommend [VS Code](https://code.visualstudio.com/Download) with the [narrat language extension](https://marketplace.visualstudio.com/items?itemName=NarratEngine.language-narrat).

::: tip
You should use [version control](https://medium.com/@avnishyadav25/git-for-non-developers-a-10-minute-guide-614690c87126) when working on a game project. Version control allows you to:

1. Not lose your work as you have a backup
2. Create frequent checkpoints you can revert to and compare with recent changes if you break your game
3. Work with others on the same project (if you desire to)

Ideally use something like git, or at worse something like Dropbox. It is up to you.
:::

## Creating the game project

Open a terminal in a folder of your choice (on Windows, you can shift-right-click in your folder and choose "Open PowerShell window here")

::: details Help with opening the terminal

![Opening Terminal](/guides/terminal/terminal.png)

For more info on how to open a terminal in a folder on Windows and other OS, see [this link](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

:::

Once opened, you can run the following command:

```bash
pnpm create narrat@latest
```

This will download narrat and ask you some questions to configure your project. You can choose between a few game templates to get started. You can now follow the instructions from the tool to run the game, or follow the "Running the game" guide below

::: details How it works

The narrat template is essentially a template for a mostly empty web project, with narrat as a library.

node.js is the JavaScript engine used to run our project (and build it or export it to an executable game later).

We use [pnpm](https://pnpm.io/)to install libraries into the game. pnpm is simply a package manager for installing JS libraries with node.js

There is a [package.json](https://github.com/liana-p/narrat-engine-template/blob/main/package.json) file at the root of the template, which is a standard node.js file for defining a project and its dependencies, which get installed via npm. Inside the `dependencies` part of this file, you can find narrat with a version number. This is what tells the project to install a specific version of narrat.

Our template uses pnpm to download and install narrat (and other dependencies) and get the game ready to go. Then using pnpm scripts, we can use run commands to build/export the game (which all use node.js under the hood one way or another).

:::

> Why can I not just download an html file of narrat and modify it?

The reason narrat comes as a web application template with commands to build and run it is that it allows the build system to do a lot of magic to compile narrat files, to allow hot-reloading of your scripts and configs, and to make it easy to build for different platforms, enable/disable debugging, etc.

## Install libraries (only the first time or when updating)

With the narrat game setup, [open a terminal inside the folder](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

There is a first command to install the dependencies (libraries) on first use:

```bash
pnpm install
```

::: details If you get warnings durin pnpm install

Unless you see actual errors, **warnings can generally be ignored**

### **Security issues warning**

You will probably se pnpm complain about "**security issues**". Those are false positives and **can be ignored** caused by a very careless implementation of security by NPM. Those security issues are irrelevant to the use case of narrat. Feel free to read more about wh pnpm security warnings are broken in [this article ](https://overreacted.io/npm-audit-broken-by-design/)by Dan Abramov, creator of React

:::

## Running the game

```bash
pnpm start
```

This should open a browser tab with the game running after a short build time. The game can be accessed at <a href="http://localhost:5173/" target="_blank" rel="noreferrer">localhost:5173</a>

The game is ready to edit!

::: info
Those `pnpm` commands come from having node.js and pnpm installed. If the commands aren't recognised, you probably didn't install node.js correctly. [More abou pnpm install](https://www.stackchief.com/tutorials/npm%20install%20|%20how%20it%20works)
:::

## Overview of Narrat

Now that the game is running, you might want to look at the [Overview of Narrat](/guides/narrat-overview) to understand what the different parts of a Narrat game are and how to use them.

## Editing the game

It is now easy to make a game by editing the narrat scripts and config files!

[Editing the game](editing-game)

## Building and exporting the game

[Building and exporting](/guides/building-and-exporting)

## Commands Documentation

[All commands](/commands/all-commands)

<FeedbackForm title="Getting Started" slug="guides/getting-started"/>
