# If

## if function

The `if` command is the main method of doing conditions in narrat. It can be used to branch inside a script, or to make choice options conditionally available.

```
if [condition]:
  "This code is run on condition success"
else:
  "This code is run on condition failure"
```

::: tip
`else` is optional
:::

The condition should be a boolean. You can directly pass a value (`if $data.someValue` ), or an expression that returns a boolean (for example `if (> $data.player.age 18)`

### Examples

Simple example:

```
main:
  talk player idle "Wow, I found the key!"
  add_item key 1
  jump tryDoor

tryDoor:
  if (has_item? key):
    "You open the door and get inside"
  else:
    "You need a key to open the door!"
```

Example:

```
main:
  choice:
    talk alice idle "Do you prefer pizza or buger?"
    "Pizza":
      set data.player.prefers "pizza"
    "Burger":
      set data.player.prefers "burger"

ifExample:
  if (== $data.player.prefers "pizza"):
    talk alice idle "Let's have pizza then"
    jump havePizza
  else:
    talk alice idle "Let's go for a burger"
    jump haveBurger

havePizza:
  //...

haveBurger:
  //...
```
