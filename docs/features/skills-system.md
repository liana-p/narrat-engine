---
description: >-
  The skills system in narrat allows to run random skillchecks (think D&D dice
  roll) compared against the player's level in a particular skill
---

# Skills System

## Skills Introduction

A narrat game can have any number of skills which the player can gain xp and levels for.

Those skills can then be used in skill checks in two ways:

- In a dialog choice, some choices can trigger a skill check with different outcomes depending on success or failures
- Skill checks can also happen passively as conditions in the script to trigger extra content. In those cases, a message appears in the dialogue informing the player that a skill check has just happened, but it wasn't initiated by an intentional player choice.

## What it looks like

<!-- ![](<../.gitbook/assets/image (8).png>) -->Passive Skill check

The difficulty of the skill check depends on a combination of how hard the skill check is configured to be, and the level of the player in this particular skill

Skill check in a choice:

<!-- ![](<../.gitbook/assets/image (6).png>) -->

<!-- ![](<../.gitbook/assets/image (5) (1).png>) -->

## How it works

### Skills configuration

Skills are configured in `skills.yaml`:

```yaml
skills:
  agility:
    name: Agility
    description: How good you are at moving around.
    startingLevel: 0
    icon: img/skills/agility.webp
    hidden: true
  logic:
    name: Logic
    description: How good you are at solving problems
    icon: img/skills/logic.webp
    hidden: true
    startingLevel: 0
  haggling:
    name: Haggling
    description: Get the best prices!
    icon: img/skills/logic.webp
    startingLevel: 1
skillOptions:
  xpPerLevel: 10
  notifyLevelUp: false
skillChecks:
  rollRange: 100
  skillMultiplier: 10
  failureChance: 1
  difficultyText:
    - - 0
      - Very Easy
    - - 10
      - Easy
    - - 30
      - Medium
    - - 50
      - Hard
    - - 70
      - Very Hard
    - - 80
      - Extremely Hard
    - - 90
      - Near Impossible
```

The path of `skills.yaml` can be customised in the main config file:

```yaml
skills: data/skills.yaml
```

Each skill needs to have a name, description, startingLevel, and icon (for display in the skills screen).

The `hidden` option is an optional way to make a skill stay hidden in the skill screen until it reaches level 1. This allows keeping a skill hidden from the player if its existence is a spoiler until it is unlocked.

### Skill options

The `skillOptions` object contains global options about skills in general.

- `xpPerLevel` option, which defines how many XP points a player needs to gain to level up in a skill. XP is currently linear and the same for all skills
- `notifyLevelUp`: If not set to false, players leveling in a skill will make a notification appear in the game

### Skill Checks

#### System explanation

Skill checks work in the following way:

1. The engine generates a "dice roll" between 0 and `rollRange` (default 100)
2. The skill check's difficulty value is the roll to beat. For example a skill check with a difficulty of 90 means that the dice roll needs to be above 90, or about 10% chance of success.
3. Each level the player has in the corresponding skill adds extra points to their roll, that are multiplied by `skillMultiplier` (default: 10)
4. There is an optional `failureChance` value, below which any roll will automatically fail.
5. Each skill check has its own `id` which allows the engine to save the state of each skill check

Practical example:

```
roll aSkillCheck agility 70 "Try jumping!":
```

This skill check uses the agility skill. It has a difficulty of 70.

Let's say the dice roll gives us 53. The player's level in agility is 3, and `skillMultiplier` is 10, so 30 gets added to the roll. This means the total roll of the player is 83.

Because 83 is above 70, the skill check is successful.

::: tip
The `difficultyText` config array specifies a list of thresholds and the corresponding difficulty text to show when the skill check's difficulty is past that threshold. It can have any amount of thresholds with any values. The choice for which text to print takes into account the player's current skill level and multiplier to reflect the real difficulty
:::

## Usage syntax

### Passive skill check

```
  if (roll someSkillCheck agility 40): // You can use skillchecks in conditions
    "This line only appears if you passed a hidden passive skill check"
```

Passive skill checks are done by calling the `roll` function inside an `if` command.

See the [roll function documentation](../functions-documentation/skills-commands/roll.md) for more info and a list of options

If the skill check succeeds, the branch inside the if command will be run. A message will also be printed in the dialogue to inform the player that a skill check happened.

### Active skill check (in choices)

```
choice:
    "Should we try jumping over a fence?"
    roll fenceJump agility 70 "Try jumping!" hideAfterRoll:
      success:
        "You graciously jump over a fence, hair blowing in the wind, and land in a heroic pose that would be used in a movie trailer."
        talk inner idle "Woo I did it!!!"
      failure:
        "You try jumping over the fence, but not high enough. You stab your toe against the fence and fall head first into a puddle of mud. It's also in the background of a tiktok a passerby was filming now."
        talk inner idle "Ouch!"
    "No I'm a coward, I'd rather not":
      "Well okay then"
```

Active skill checks happen in a `choice` command, as one of the options the player can choose.

The syntax is `roll [skillCheckId] [skillId] [difficulty] [promptText] [optional mode]:`

The options are the same as the roll function, except there is a `promptText` option before the optional `mode` option.

- `promptText` is the text that will appear as the prompt for that choice
- Afterwards is the optional `mode` (`repeatable` or `hideAfterRoll`) option

Then, there is a `success` branch and a `failure` branch inside the roll. The engine will go to one of those depending on the result.

### Gaining levels and XP

To make the player gain xp or levels, there are two commands: `add_level` and `add_xp`. Example:

```
add_level agility 1
add_xp agility 3
```

### Resetting a skill roll

[reset-roll.md](../functions-documentation/skills-commands/reset-roll.md)
