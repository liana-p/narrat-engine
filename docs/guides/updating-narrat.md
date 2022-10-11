---
description: >-
  Narrat frequently updates with new features, improvements and fixes, so it is
  advised to keep up to date.
---

# Updating narrat

### The changelog

Before updating, it is worth noting that there is a [changelog](https://github.com/liana-p/narrat-engine/blob/main/CHANGELOG.md) on GitHub showing what's been changed in recent versions.

When there is a **breaking change** (that is, a change in the engine that requires a game developer to change something in their game to not break), it is mentioned very clearly in the changelog.

{% hint style="warning" %}
When updating to a new version, it's a good idea to at least check for **breaking changes** in the changelog
:::

::: tip
There are many new features frequently added to narrat which aren't always documented, so looking at the changelog can be a way of discovering new features.
:::

### How to update

The narrat version used in a game is the one specified in the `dependencies` part of the `package.json` file at the root of the game. For example:

<!-- ![narrat version example](<../.gitbook/assets/image (7).png>) -->

To update, simply run the command `npm install narrat@latest` in the terminal, which will pick up the latest released version.

Otherwise, it is also possible to put a specific version number in `package.json` and then run `npm install` to install that version.

To find out what versions exist and which is the latest released, visit the [npm page for narrat](https://www.npmjs.com/package/narrat)
