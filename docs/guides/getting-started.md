---
description: >-
  This guide explains how to get started using the narrat game engine in a
  minute
---

::: tip
Getting started with narrat is very quick. There is a ready-to-use template that can get you running your game in a minute
:::

## Video Guide

This one minute video shows the entire setup from start to having the game running

<iframe width="560" height="315" src="https://www.youtube.com/embed/516YTDxSO9Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Text Instructions

### Prerequisites

- Be on a computer running Windows, MacOS or Linux
- Have [node.js ](https://nodejs.org/en/) 16+ installed (pick the current LTS version on the website)

### Creating the game project

Open a terminal in a folder of your choice (on Windows, you can shift-right-click in your folder and choose "Open PowerShell window here")

::: details Help with opening the terminal

<!-- ![](<../.gitbook/assets/image (5).png>) -->

For more info on how to open a terminal in a folder on Windows and other OS, see [this link](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

:::

Once opened, you can run the following command:

```bash
npm create narrat@latest
```

This will download narrat and ask you some questions to configure your project. You can choose between a few game templates to get started. You can now follow the instructions from the tool to run the game, or follow the "Running the game" guide below

### Running the game

::: details How it works

The narrat template is essentially a template for a mostly empty web project, with narrat as a library.

node.js is the JavaScript engine used to run our project (and build it or export it to an executable game later).

We use [npm](https://www.w3schools.com/whatis/whatis_npm.asp)to install libraries into the game. npm is simply a package manager for installing JS libraries with node.js

There is a [package.json](https://github.com/liana-p/narrat-engine-template/blob/main/package.json) file at the root of the template, which is a standard node.js file for defining a project and its dependencies, which get installed via npm. Inside the `dependencies` part of this file, you can find narrat with a version number. This is what tells the project to install a specific version of narrat.

Our template uses npm to download and install narrat (and other dependencies) and get the game ready to go. Then using npm scripts, we can use run commands to build/export the game (which all use node.js under the hood one way or another).

:::

#### Install libraries (only the first time or when updating)

With the narrat game setup, [open a terminal inside the folder](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

There is a first command to install the dependencies (libraries) on first use:

```bash
npm install
```

::: details If you get warnings during npm install

Unless you see actual errors, **warnings can generally be ignored**

#### **Security issues warning**

You will probably see npm complain about "**security issues**". Those are false positives and **can be ignored** caused by a very careless implementation of security by NPM. Those security issues are irrelevant to the use case of narrat. Feel free to read more about why npm security warnings are broken in [this article ](https://overreacted.io/npm-audit-broken-by-design/)by Dan Abramov, creator of React

:::

#### Running the game

```bash
npm start
```

This should open a browser tab with the game running after a short build time. The game can be accessed at <a href="http://localhost:5173/" target="_blank" rel="noreferrer">localhost:5173</a>

The game is ready to edit!

::: info
Those `npm` commands come from node.js. If the commands aren't recognised, you probably didn't install node.js correctly. [More about npm install](https://www.stackchief.com/tutorials/npm%20install%20|%20how%20it%20works)
:::

## Editing the game

It is now easy to make a game by editing the narrat scripts and config files!

[Editing the game](editing-game)

## Building and exporting the game

[Building and exporting](/guides/building-and-exporting)

## Commands Documentation

[All commands](/commands/all-commands)
