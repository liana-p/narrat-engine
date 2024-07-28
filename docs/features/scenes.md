---
title: Scenes
description: Scenes in narrat allow the game to switch from different game layouts that can be used for different purposes.
---

# Narrat Scenes

Narrat has a scenes feature allowing games to switch between different layouts and add completely new custom UI elements to narrat. For example, the default built-in scenes are:

- `engine-splash`: The narrat splash screen on game start
- `game-splash`: The game's intro screen
- `start-menu`: The start menu with all the buttons
- `playing`: The in-game default scene with the viewport, dialog panel etc
- `chapter-title`: An optional scene to display a simple title + subtitle intro screen

The engine automatically goes through engine-splash -> game-splash -> start-menu -> playing, but games can switch to other scenes, or add new ones.

## Using a scene

An example using the `chapter-title` built-in scene:

```narrat
test_change_scenes:
  change_scene "chapter-title" next_label "after_change_scene" title "Chapter 1: The Beginning" subtitle "A new adventure begins!"

after_change_scene:
  talk helper idle "Hello!"
```

<video controls="controls" src="./scenes/scenes.mp4" type="video/mp4" autoplay="true"></video>

### Scene options

A scene can have any number of options, and when using the `change_scene` command those options are given by name. For example, the `chapter-title` scene has the following options:

```ts
next_label: string;
title: string;
subtitle?: string;
duration?: number;
```

::: tip
Those options are defined in the Vue component's props. For example in the `chapter-title` scene component:

```ts
const props = defineProps<{
  options: {
    next_label: string;
    title: string;
    subtitle?: string;
    duration?: number;
  };
}>();
```

:::

::: details Full code for the chapter-title scene component

```vue
<template>
  <div class="chapter-title-scene">
    <h1 class="title chapter-title" v-html="props.options.title"></h1>
    <h2
      class="subtitle chapter-subtitle"
      v-if="props.options.subtitle"
      v-html="props.options.subtitle"
    ></h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useScenes } from '@/stores/scenes-store';
import { useVM } from '@/stores/vm-store';

const props = defineProps<{
  options: {
    next_label: string;
    title: string;
    subtitle?: string;
    duration?: number;
  };
}>();

const timeout = ref<any>(null);
function finishedTimeout() {
  timeout.value = null;
  useScenes().changeScene('playing');
  useVM().jumpToLabel(props.options.next_label);
}
onMounted(() => {
  timeout.value = setTimeout(finishedTimeout, props.options.duration ?? 2000);
});
onUnmounted(() => {
  if (timeout.value) {
    clearTimeout(timeout.value);
    timeout.value = null;
  }
});
</script>
```

:::

Options are passed by adding new arguments to the change_scene command with the name of the option followed by its value. The full syntax for `change_scene` is: `change_scene <scene_name> [option name] [option value] [other option name] [other option value] ...`

In the case of the `chapter-title` scene, the `next_label` option decides what narrat label will be played when the intro sequence is finished. So in the example above, we change to the `chapter-title` scene, and because we gave `after_change_scene` as an option to it, the engine will play the `after_change_scene` label when the scene is finished.

## Creating custom scenes

Scenes use Vue.js components to give more control to the game developer. To create a custom scene, create a new Vue component and register it with the engine. For example look at the [chapter-title](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/src/components/scenes/chapter-title.vue) scene component.

```vue
<template>
  <div class="my-scene">
    <h1 class="title">My scene</h1>
    <h2
      class="subtitle"
      v-if="props.options.subtitle"
      v-html="props.options.subtitle"
    ></h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useScenes } from 'narrat';

const props = defineProps<{
  options: {
    subtitle?: string; // This is an example, any options could be there, or none
  };
}>();

// The timeout allows the scene to automatically change after some time
const timeout = ref<any>(null);
function finishedTimeout() {
  timeout.value = null;
  // This will make the game switch to the main gameplay scene
  useScenes().goToGameScene();
}

onMounted(() => {
  // This will call `finishedTimeout` in 2000 milliseconds
  timeout.value = setTimeout(finishedTimeout, 2000);
});

onUnmounted(() => {
  if (timeout.value) {
    clearTimeout(timeout.value);
    timeout.value = null;
  }
});
</script>
```

Once you have a vue component you want to use as a scene, register it with the engine in index.ts:

```ts
import MySceneComponent from '@/scenes/my-scene.vue'; // [!code focus]

// ...
window.addEventListener('load', () => {
  startApp({
    debug,
    logging: false,
    scripts,
    config,
  });
  useScenes().addNewScene({
    // [!code focus]
    id: 'my-scene', // [!code focus]
    component: shallowRef(GameplayScene), // [!code focus]
    props: {}, // [!code focus]
  }); // [!code focus]
});
```

Once a scene has been registered, it can be used in narrat script via the `change_scene` command:

```narrat
main:
  change_scene my-scene
```

## Changing the default scenes

The `start-menu` scene is the built-in scene that has the main menu with start/continue etc buttons. The `playing` scene is the one when the game is playing.

In some situations, a game might want to inject their own scene to be loaded before those, for example to display a custom splash screen before the start menu.

To do so, the new `scenes` option is available in `common.yaml`:

```yaml
scenes:
  startMenuScene: my-custom-start-scene # The scene to load instead of the start menu with the "Press start to continue"
  gameScene: my-custom-game-scene # The scene to load instead of the normal gameplay scene when starting a game
  gameSplashScene: my-custom-splash-scene # The scene to load instead of the splash screen that shows before the start menu
```

When those options are present, instead of going to the normal game scene, the game will go to the custom scenes defined in the config.

::: warn
It is important to go back to the relevant splash screen scenes or start menu after running your custom scene, as they contain important engine initialization logic. If you override any of those scenes, you should make your new scene go to the expected "default" scene afterwards
:::

To do so, use the `goToGameScene` and `goToStartMenuScene` methods from `useScenes()` (the sample scene above does this).

For example, in your scene component, the following code examples are good ways to go to various narrat scenes:

```ts
import { useScenes, BuiltInScene } from 'narrat';

onMounted(() => {
  // To go to the game scene  // [!code focus]
  useScenes().goToGameScene();  // [!code focus]
  // To go to the start menu screen  // [!code focus]
  useScenes().goToStartMenuScreen();  // [!code focus]
  // To go to another built in scene, use the enum that narrat exports  // [!code focus]
  // For example here, go back to the engine splash screen  // [!code focus]
  useScenes().changeScene(BuiltInScene.EngineSplash);  // [!code focus]
});

:::
```
