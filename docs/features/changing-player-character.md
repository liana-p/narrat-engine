---
title: Changing the player character
description: Here is how to change the player character during gameplay in narrat
---

# Changing the player and game characters

## Changing player or game character in the config

In the characters config, values can be changed to change the default player and game characters.

**Note that those two characters must always exist.**

In `characters.yaml`:

```yaml
config:
  imagesPath: img/characters/
  playerCharacter: player # will use the character with key "player" in the list of chrracters whenever the player speaks
  gameCharacter: game # Same for the game character
```

### The player character

The player character appears when making choices, as it's the character that says the line that you chose.

### The game character

The game character is the "default" / narrator character. When writing text without a talk command, it will appear as this character. Some generic system messages might also appear with this character. By default the `game` character has an empty name, which makes it appear as a line of text with no character. But you can change it to be an actual character.

## Changing the player and game characters during gameplay

The commands `change_player_character` and `change_game_character` are available to change which character is the active player, or the one representing the game (when a line of script has text in it with no talk command). They can be used during gameplay to allow dynamic change of the player character.

Here's an example script demoing those features:

```yaml
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
  game2:
    name: 'The Narrator'
    style:
      color: red
    sprites:
      idle: helper_cat.webp
  helper:
    sprites:
      idle: helper_cat.webp
    style:
      color: green
    name: Helper Cat
```

```narrat
main:
  jump test_change_player

test_change_player:
  talk helper idle "Let's change who the player character is."
  choice:
    "change character?"
    "Default player character":
      change_player_character player
    "Second player character":
      change_player_character player2
  jump test_change_player_2

test_change_player_2:
  talk helper idle "Ok, we've changed player character. The new name should appear when making choices now."
  choice:
    talk helper idle "Did you like changing the player character?"
    "Yes":
      talk helper idle "I'm glad you liked it"
    "No":
      talk helper idle "I'm sorry you didn't like it. We can change again if you want."
  change_game_character game2
  "Demo game character change"
  change_game_character game
  "Demo back to default game character"
  jump test_change_player
```
