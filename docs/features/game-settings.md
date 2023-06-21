---
title: Game settings feature
description: The narrat custom game settings feature allows easy creation of automatic settings menus editable by the player
---

# Game Settings

In Narrat games, the `System` menu displays various common settings. Those settings can be extended by any game to add custom game-specific settings that players can edit via the same menu, and are accessible by game scripts.

## How to add custom settings

Custom settings are defined in the `config.yaml` file of the game. To create a new setting, its schema needs to be added to the list of custom settings. The schema describes the type of setting, as well as info like its name and description.

Imagine you want a custom setting to disable spider content for people with arachnophobia. In `config.yaml`:

```yaml
settings:
  customSettings:
    arachnophobia:
      type: boolean
      defaultValue: false
      name: 'Disable Arachnophobia'
      description: 'Turning this on will censor spider imagery and descriptions in the game'
```

Adding those custom settings to the game's config will make them appear in the System menu, alongside existing default settings.

## Available settings types

- `number`: A floating number. Props: `defaultValue`, `minValue`, `maxValue` which are used to setup a number slider
- `integer`: Same as the previous one, but the number will be rounded
- `boolean`: A boolean. Props: `defaultValue`
- `string`: A string. Props: `defaultValue`

All settings need to specify the `type` property, as well as `name` and `description`

## Usage in scripts

To use custom settings in script, new commands `get_setting` and `set_setting` are be available:

```
main:
  set $data.noSpiders (get_setting arachnophobia)

change_setting:
  set_setting arachnophobia false
```

You can also access settings directly as variables:

```
main:
  talk helper idle "Hello, %{customSettings.playerName}"
```

## Default Settings

Those base settings are already part of the engine by default:

- `textSpeed`: [number] The speed at which the text animates (which also controls auto play delay when not animating)
- `animateText`: [boolean] Toggle text animation
- `fontSize`: [number] Base size of the body font (if your CSS uses `rem` units, changing this font size should generally change all fonts in the game).
