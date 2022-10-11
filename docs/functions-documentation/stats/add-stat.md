---
description: The add_stat function in narrat add a specified value to a HUD stat
---

# Add Stat



The add\_stat function in narrat add a specified value to a HUD stat

Syntax: `add_stat [statId] [value]`

See [HUD Stats](../../features/hud-stats.md) page for more info on this feature

Example:

```renpy
choice:
  talk shopkeeper idle "So, what do you want to buy?"
  "I want to buy a little snack" $if this.stats.money > 5:
    talk shopkeeper idle "Sure, that will be $5"
    add_stat money -5
    set data.hasSnack = true
  "I want to buy a PS5 game" $if this.stats.money > 70:
    talk shopkeeper idle "Sure, that will be $70"
    add_stat money -70
    set data.hasGame true
```
