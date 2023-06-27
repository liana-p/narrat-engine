# Roll

The `roll` command in narrat performs a passive skill check which can be used inside a condition so that the condition will only happen if the skill check succeeds.

Syntax: `roll [skillCheckId] [SkillId] [difficultyValue] [mode (optional]`

### Example

```narrat
main:
  if (roll mySkillCheckId agility 50):
    "You managed to climb over the fence"
  else:
    "You fell down"
```

### Options details

- `skillCheckId`: Any text can be used as a skill check id. This id will be used to save that this specific skill check happened, and its value. If that dialogue gets replayed, the game will know what the result was.
- `skillId`: The id of the skill to test on
- `difficultyValue`: The difficulty of the skill check. By default skill checks are a roll between 0 and 100, with the player's skill level increasing the roll. `difficultyValue` is the score to beat.
- `mode`: Optional. There are two possible modes: `hideAfterRoll` and `repeatable`:
  - `hideAfterRoll`: Once the skill check has happened it will be hidden from choice options in the future (even if succeeded)
  - `repeatable:` If the skill check fails, the player can still attempt it again when coming back to the dialogue instead of the option being disabled
