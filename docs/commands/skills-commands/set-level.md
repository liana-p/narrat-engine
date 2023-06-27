---
description: >-
  The set_level function in narrat increases the level of the player in a
  specified skill
---

# Set Level

The set_level function in narrat increases the level of the player in a specified skill

Syntax: `set_level [skillId] [level]`

See the [skills system guide](../../features/skills.md) to know more

Example:

```narrat
skillCheckChoice:
  choice:
    "Should we try jumping over a fence?"
    roll aSkillCheck agility 70 "Try jumping!" hideAfterRoll:
      success:
        "You graciously jump over a fence, hair blowing in the wind, and land in a heroic pose that would be used in a movie trailer."
        talk inner idle "Woo I did it!!!"
        set_level agility 2
      failure:
        "You try jumping over the fence, but not high enough. You stab your toe against the fence and fall head first into a puddle of mud. It's also in the background of a tiktok a passerby was filming now."
        talk inner idle "Ouch!"
```
