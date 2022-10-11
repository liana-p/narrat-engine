---
description: >-
  The set_button function allows enabling and disabling interactive buttons in
  screens
---

# Set Button

The `set_button` function can enable or disable a button in a screen.

Syntax: `set_button [buttonId] [true, greyed, hidden or false]`

Refer to the [screens feature](../../features/screens.md) guide for more info

Example:

```renpy
set_button parkButton true
```

### Possible values

* `true`: Makes the button enabled and clickable (as long as clicking it is allowed, see [screen buttons interaction tags](../../features/screens.md#button-interaction-tags))
* `false`: Makes the button completely disabled and hidden
* `greyed`: Makes the button disabled and greyed. It will be visible with semi-opacity, but not clickable
* `hidden`: Same as `false`
