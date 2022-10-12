---
description: >-
  The wait function in narrat makes the game wait a specified amount of time
  before continuing to the next instruction
---

# Wait

The wait function in narrat makes the game wait a specified amount of time before continuing to the next instruction. Useful for adding dramatic pauses between lines, or anything that could use a delay.

Syntax: `wait [timeInMiliseconds]`

Example:

```
talk presenter idle "The match will start in 3..."
wait 1000
talk presenter idle "2"
wait 1000
talk presenter idle "1"
wait 1000
talk presenter idle "GO!"
```
