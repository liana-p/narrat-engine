# Saving and Reloading

## Saving and Reloading

**Important:** The `saveFileName` key in the `config.yaml` file is the name of the save file, and if this value is changed old saves will stop working. Once you have chosen a save file name for a game, do not change it in the future. The name you use should contain the name of your game to avoid clashes with other games

## How saving works

Narrat supports automatic saving and reloading, but there are some important details worth knowing about.

How saves works:

- All relevant bits of the state are extracted into one object. This includes
- This object gets stored in the browser's [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- On game load, the local storage gets read for a save, and if present all the data above gets placed in the state to continue playing

::: tip
Because there is no way to identify which specific line of dialogue the player is on, **saving only saves the last label the player started,** not the exact line they reached
:::

## Save Slots

A save slot is an individual save file. Each game can have any amount of save slots. There are two different ways save slots are managed, depending on how the game is configured:

- `manual`: This is the default mode. In this mode, there is a single global auto save used no matter which save gets loaded, but manual saves won't be overwritten unless the player chooses to overwrite them. **TLDR: Only one global autosave.**. There is a fixed amount of save slots for the game. This is how most interactive fictions work.
- `game-slots`: An alternative mode where starting a new game will create an Autosave slot for that playthrough, which will keep getting overwritten as the player goes. Starting a new game creates a separate new autosave slot for that playthrough. When the player loads a slot, autosaves will overwrite that slot automatically **TLDR: One save slot per playthrough.** Example: Zelda, Dark Souls

This value can be changed in `config.yaml` in `saves.mode`:

```yaml
saves:
  mode: manual
  slots: 10
```

::: tip
If using `manual` mode, you should give the player a chance to create manual saves sometimes, as there is only one autosave which can get overwritten by starting a new game
:::

## Manual saving

To let the player save manually, there are two commands:

[save-commands.md](../commands/save-commands.md)

::: tip
Because save data is only generated when jumping to a new label, save prompts should ideally be at the start of a label. Otherwise, the data saved will be outdated.
:::

## Global Save Data

The engine now supports global save data. Global save data isn't associated with any save slot and is instead global for the entire game. This allows tracking meta data across multiple playthrough, or enabling features like achievements across multiple saves.

To use, set values in the `global` object instead of `data`. For example:

```
main:
  talk player idle "hello world"
  add global.counter 1
  talk player idle "Global counter is %{$global.counter}"
```

Every time a new game is started, this script will increase the global counter despite it being a new save.

To reset global save data, use the `reset_global_save` command.

## Run a function on game load

Sometimes, you might need your game to edit data that can't be saved. For example games can dynamically change the config after starting. A common example would be changing the player's name:

```
test_edit_config:
  set data.playerName (text_field "Enter your name")
  set config.characters.characters.player.name $data.playerName
```

This works fine, but if you reload the game, the player's name will be reset to its default as the game config gets loaded by the engine.

To be able to reapply your dynamic changes on every game reload, or to perform any task you want to perform when the player comes back after loading the game, you can use the `runOnReload` config key:

```config.yaml
saves:
  mode: manual
  slots: 10
  runOnReload: "game_reload"
```

Then for example in the game code:

```
main:
  jump ask_player_name

reset_config_overrides:
  set config.characters.characters.player.name $data.playerName

ask_player_name:
  set data.playerName (text_field "Enter your name")
  run reset_config_overrides
  run verify_edit_config

verify_edit_config:
  talk player idle "It's me, %{$config.characters.characters.player.name}"

game_reload:
  run set_config_overrides
  talk helper idle "The game reloaded, welcome back %{$config.characters.characters.player.name}"
  talk player idle "Wow it's me, and my name is still here!"
```

Without the `reset_config_overrides` function running on game load to add the appropriate values to the config, the player name in the config would still be its default value when reloading a save.

### The problem with saving a specific line

::: details Why we can only save on label change

We could save the dialog line number the player is at, but it would cause issues with game updates. Say the player is at line 53 of `some_script.nar`, but you update the game and the code changes. Suddenly line 53 refers to a completely different bit of dialogue.

One solution could be to give every line of dialogue a unique identifier (which would also allow for localisation), but this would be very tedious for users and isn't planned at the moment.

The only viable solution for saving without risk of game updates breaking past saves

This means some dialogue will be replayed when a user reloads if they were halfway through a label, but it's only because the save was made at a point in time.

:::
