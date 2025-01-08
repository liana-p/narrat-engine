---
title: Narrat Plugin Hooks
description: The Narrat plugin API has hooks called by the engine at various stages of loading which can let you run custom code at those points.
---

## Plugin hooks

Plugins can define hook functions that the engine will call at various stages of loading. These hooks can be used to run custom code at those points.

### Available hooks

- `onPageLoaded`: Earliest hook called as soon as the page starts
- `onNarratSetup`: Called when the narrat app is created but before anything is mounted
- `onAppMounted`: Called when the main narrat app has been mounted to the DOM
- `onAssetsLoaded`: Called as soon as asset loading is over
- `onGameSetup`: Called at the very end of the game loading process, before the engine properly starts
- `onStartScreenMounted`: Called when the start screen has been mounted to the DOM
- `onGameStart`: Called when a game starts via pressing new game or continue
- `onGameMounted`: Called when the in-game scene has been mounted to the DOM (game has started playing)
- `onGameUnmounted`: Called when the in-game scene has been unmounted from the DOM (game has stopped playing)
