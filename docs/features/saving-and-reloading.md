# Saving and Reloading

## Saving and Reloading

### How saving works

Narrat supports automatic saving and reloading, but there are some important details worth knowing about.

How saves works:

- All relevant bits of the state are extracted into one object. This includes
- This object gets stored in the browser's [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- On game load, the local storage gets read for a save, and if present all the data above gets placed in the state to continue playing

{% hint style="info" %}
Because there is no way to identify which specific line of dialogue the player is on, **saving only saves the last label the player started,** not the exact line they reached
{% endhint %}

### Save Slots

A save slot is an individual save file. Each game can have any amount of save slots. There are two different ways save slots are managed, depending on how the game is configured:

- `manual`: This is the default mode. In this mode, there is a single global auto save used no matter which save gets loaded, but manual saves won't be overwritten unless the player chooses to overwrite them. **TLDR: Only one global autosave.**. There is a fixed amount of save slots for the game. This is how most interactive fictions work.
- `game-slots`: An alternative mode where starting a new game will create an Autosave slot for that playthrough, which will keep getting overwritten as the player goes. Starting a new game creates a separate new autosave slot for that playthrough. When the player loads a slot, autosaves will overwrite that slot automatically **TLDR: One save slot per playthrough.** Example: Zelda, Dark Souls

This value can be changed in `config.yaml` in `saves.mode`:

{% code title="config.yaml" %}

```yaml
saves:
  mode: manual
  slots: 10
```

{% endcode %}

{% hint style="info" %}
If using `manual` mode, you should give the player a chance to create manual saves sometimes, as there is only one autosave which can get overwritten by starting a new game
{% endhint %}

### Manual saving

To let the player save manually, there are two commands:

[save-commands.md](../functions-documentation/save-commands.md)

{% hint style="info" %}
Because save data is only generated when jumping to a new label, save prompts should ideally be at the start of a label. Otherwise, the data saved will be outdated.
{% endhint %}

### The problem with saving a specific line

::: details Why we can only save on label change

We could save the dialog line number the player is at, but it would cause issues with game updates. Say the player is at line 53 of `some_script.nar`, but you update the game and the code changes. Suddenly line 53 refers to a completely different bit of dialogue.

One solution could be to give every line of dialogue a unique identifier (which would also allow for localisation), but this would be very tedious for users and isn't planned at the moment.

The only viable solution for saving without risk of game updates breaking past saves

This means some dialogue will be replayed when a user reloads if they were halfway through a label, but it's only because the save was made at a point in time.

:::
