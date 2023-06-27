---
description: >-
  The run_label instruction in narrat script allows the creation of reusable
  functions
---

# Functions

The `run` script command is similar to jump, but it runs a label and at the end goes back to where it was before. This is useful to create behaviour similar to **functions**, allowing the creation of reusable labels containing chunks of logic you may want to use in multiple places.

::: danger
It's important to understand the difference between jumping to a label and running a label.

Jumping will reset the virtual machine's stack to that label, and also save the game. It is meant for jumping to different sections of your game.

Running a label on the other hand just runs the code from that label and then continues on where it was, and it doesn't save the game.
:::

For example:

```narrat
main:
  set data.counter 1
  jump functions_test

functions_test:
  run some_function
  talk player idle "Back to functions_test"
  run some_function
  talk player idle "We're back again"

some_function:
  talk player idle "Ran the function %{data.counter} times"
  add data.counter 1
```

In this example when running `functions_test`, the script in `some_function` will be ran, then the execution comes back to do the rest of `functions_test`.

::: tip
**Note:** Saving still only happens when _jumping_ to a label, because being at a specific label is the only way to make sure a save file can keep working if the code of the game gets changed in an update.
:::
