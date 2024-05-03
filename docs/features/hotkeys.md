---
title: Hotkeys, Keyboard and Gamepad Shortcuts
description: How to change or disable hotkeys in Narrat
---

# {{ $frontmatter.title }}

You can edit some default hotkeys in the common config.

You can look at the original list of actions in this [file](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/stores/inputs-store.ts).

## List of Configurable Hotkeys

This is the current list:

- skip
- autoPlay
- viewportSelect
- subNextTab
- subPreviousTab
- nextTab
- previousTab
- menu
- system
- cancel
- continue
- up
- down
- left
- right

::: warning
This currently only works with keyboard inputs
:::

## Example Time

In the below example the skills menu has been set to open when 'm' is pressed, and the autoplay hotkey has been disabled.

```yaml
hotkeys:
  menu: 'm'
  autoplay: false
```
