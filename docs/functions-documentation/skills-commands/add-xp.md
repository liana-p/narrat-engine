---
description: >-
  The add_xp function in narrat increases the xp of the player in a specified
  skill
---

# Add XP

The add\_xp function in narrat increases the xp of the player in a specified skill



Syntax: `add_xp [skillId] [xp]`

See the [skills system guide](../../features/skills-system.md) to know more

Example:

```renpy
skillCheckChoice:
  choice:
    "Should we try jumping over a fence?"
    roll aSkillCheck agility 70 "Try jumping!" hideAfterRoll:
      success:
        "You graciously jump over a fence, hair blowing in the wind, and land in a heroic pose that would be used in a movie trailer."
        talk inner idle "Woo I did it!!!"
        add_xp agility 5
      failure:
        "You try jumping over the fence, but not high enough. You stab your toe against the fence and fall head first into a puddle of mud. It's also in the background of a tiktok a passerby was filming now."
        talk inner idle "Ouch!"
```

In this example, the player gains agility XP because they succeeded at jumping over the fence.
