---
title: Characters and portraits
description: This page explains how to add or edit characters in the characters.yaml file
---

# Characters and portraits

## characters.yaml

The `characters.yaml` file contains the config for all characters that can speak in the game. They should all at least have a name value, and a list of different sprite variants . The sprite is used for displaying character portraits during dialogue

When using a talk command like `talk player idle "Hello!"`, the engine will look for a character with the name `player` in the `characters.yaml` file, and display the `idle` sprite variant of that character.

::: danger
Do not delete the default game and player characters.

The `game` character is the placeholder one used for empty text commands.
The `player` character is the one used for the text when the player makes choices.

You can change which character is used as the default with the `playerCharacter` and `gameCharacter` options as seen below.
:::

## Example characters config

```yaml
---
config:
  imagesPath: img/characters/
  playerCharacter: player
  gameCharacter: game
characters:
  game:
    name: ''
    color: white
  player:
    style:
      color: orange
    sprites:
      idle: player.webp
    name: You
  player2:
    style:
      color: green
    sprites:
      idle: player.webp
    name: Player 2
```

## Video Characters

Characters can have a video instead of an image to display animated characters. For example:

```yaml
characters:
  helper:
    sprites:
      idle:
        image: helper_cat.webp
      videoPose:
        video: helper_video.mp4
        width: 200
        height: 355
    style:
      color: green
    name: Helper Cat
```

Then using `talk helper videoPose "Hello!"` will play the video inside the portrait window.

## Hidden characters

If you want the portrait for a character to _not_ appear, you can set the value of a specific sprite to `"none"`:

```yaml
characters:
  player:
    style:
      color: orange
    sprites:
      idle: none
    name: You
```

Then using `talk player idle "Hello"` will make the player's name appear as the speaker, but no portrait window will be shown.

## Available options

The color character names appears as can be changed with the `color` value in the `style` property of the character (the value can be any valid CSS color).

A character's config can have the following values:

- `name`: The name the character will appear as
- `sprites`: A key-value object of pose names to the url of the picture to use for that pose. Poses are used with the talk command (the command `talk player idle "A sentence"` would use the character "player" with the picture for the pose named "idle")
- `style`: An object to customise how that character looks with the following options:
  - `portraitCssClass`: A CSS class name to give to the portrait window for that character. This allows you to apply custom CSS styling to any character's portrait window
  - `color`: a CSS color (ie. "red", or #FFF)
  - `boxCss`: [CSS style object](https://www.w3schools.com/jsref/dom_obj_style.asp) for custom-styling of the box encapsulating a dialogue from that character.
  - `nameCss`: Same as above, but the styling will apply to the name of the character specifically
  - `textCss`: Same as above, but will apply to the text "spoken" by the character

## Character portrait styling

::: tip
Character portraits automatically get given the id of the character as a CSS class, so you can easily use this CSS class to style portraits per character
:::

Individual character poses can also specify their own width and height, if you want to have different sizes for different poses:

```yaml
helper:
  sprites:
    idle: # Instead of putting the image directly, have an object with an image property, and width/height values
      image: helper_cat.webp
      width: 150
      height: 200
    videoPose:
      video: helper_video.mp4
      width: 200
      height: 355
  style:
    color: green
    portraitCssClass: test
  name: Helper Cat
```
