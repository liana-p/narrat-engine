---
description: >-
  This documentation explains how to let the player perform actions by using
  items in narrat
---

# Using items

It is possible to make items usable by players, which can trigger a dialogue script label

![](../.gitbook/assets/useitem.webp)

In an item config, an optional `onUse` value is available, which cn be set to a label to jump to when using the item.

There are also interaction groups which allow scripts to toggle on/off whether using items is allowed. They can be configured to automatically be turned off during dialogue scripts (to avoid bugs/side effects that jumping to an item's label would cause halfway through dialogue).

Config:

```renpy
  "items": {
    "bread": {
      "name": "Bread",
      "description": "A bread in the game.",
      "icon": "img/items/bread.png",
      "onUse": {
        "action": "jump",
        "label": "eat_bread"
      },
      "tag": "default"
    },
    "book": {
      "name": "Ominous Book",
      "description": "An ominous book",
      "icon": "img/items/book.png",
      "onUse": {
        "action": "run_label",
        "label": "read_book"
      },
      "tag": "always_interactable"
    }
  },
  "interactionTags": {
    "default": {
      "onlyInteractOutsideOfScripts": true
    }
  }
```

The `onUse` `action` property can be either `jump` or `run`, allowing to either jump to a script, or run a script as a function (see [1.3.0 changes](https://github.com/liana-p/narrat-engine/blob/main/CHANGELOG.md#1.3.0) or [functions docs](https://docs.get-narrat.com/features/functions)), which effectively allows interrupting the current dialogue to run an item's function before going back to it.

### Interaction tags

The `tag` property on an item data sets which interaction group it is part of. This allows fine control of which items can be allowed to be used when. For example, some items might be available to use all the time, while some should only be allowed to be used at certain points.

By default if not provided, items have the `default` tag, and the default configuration has the `default` tag set to use `onlyInteractOutsideOfScripts`, which automatically disables interaction during scripts to avoid issues.

In the example above, the bread can only be interacted with outside of scripts and will use a jump to a label, while the book can be interacted with at any time and will use a `run_label`, effectively running a label as a function and then going back to where the script was.

In scripts, interaction tags can be controlled:

```
main:
  disable_interaction someTag
  talk player idle "Impossible to use items with the tag someTag for now"
  enable_interaction someTag
  talk player idle "It is now possible to use items with the tag someTag"
```
