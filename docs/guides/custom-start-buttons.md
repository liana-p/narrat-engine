---
title: Custom start menu buttons
description: This page explains how to add custom start menu buttons to a narrat game
---

# Custom start menu buttons

Customm start menu buttons can be added to the game using the plugin system. Plugins can have a `startMenuButtons` array containing objects that define those custom buttons

## How to use

in `src/index.ts` (or any other typescript file), create a new plugin:

```ts{2}
export class StartButtonsPlugin extends NarratPlugin {
  public startMenuButtons = [
    {
      id: 'test1',
      text: 'Test 1',
      action: () => window.open('https://get-narrat.com')
    },
    {
      id: 'test2',
      text: 'Test 2',
      popupComponent: {
        name: 'SkillsWindow',
        component: SkillsWindow,
      },
    },
  ];
}
```

Remember to register the plugin before starting the app:

```ts{2}
const onPageLoad = () => {
  registerPlugin(new StartButtonsPlugin());
  startApp({
    baseAssetsPath: assetsPath,
    baseDataPath: dataPath,
    configPath: `${dataPath}data/config.yaml`,
    logging: false,
    debug,
  });
};
```

The menu buttons have the following props:

- `id`: string id of the button. Will be used to give a unique css class to the button and potential popups created with it
- `text`: Text to display on the button (and title of the popup if using it)
- `action (optional)`: A function to run when the button is clicked
- `popupComponent` (optional): An object containing info about a component to display in a popup when clicking the button.
  - `name`: Name of the component to use, as a string
  - `component`: The actual Vue component to use

## Popup component

If using the popup component option, when clicking the button a modal will open, and inside the modal will be the Vue component that has been supplied.
