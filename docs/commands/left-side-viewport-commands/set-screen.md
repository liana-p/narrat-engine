---
description: The set_screen function allows changing visual screens
---

# Set Screen

The `set_screen` function allows switching between different screens

Syntax: `set_screen [screenId] [layer (optional)]`

Example:

```narrat
set_screen map
```

### Layers

Screens can use layers, to make it possible to overlay screens on top of each other. By passing a number as the second parameter to `set_screen`, it will set a screen on this layer. Example:

```narrat
main:
  set_screen game_background // will set the screen game_background on layer 0
  set_screen flashing_overlay 1 // Will set the screen flashing_overlay on layer 1, displaying it above the background
```

See [Screens guide](../../features/viewport.md) for more info
