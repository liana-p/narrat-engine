---
description: Narrat games can have an inventory of player items
cover: ../.gitbook/assets/image (4) (1).png
coverY: 0
---

# Inventory

The inventory system allow players to collect and spend items. There is also a UI for viewing the inventory.

<video controls="controls" src="./inventory/inventory.mp4" type="video/mp4" autoplay="true"></video>

## How to use the inventory

This is how you create an inventory and items in narrat:

Possible items can be defined in the `items.yaml` config file.

```yaml
categories:
  - id: food
    name: Food
  - id: books
    name: Books

items:
  bread:
    name: Bread
    description: A bread in the game.
    category: food
    icon: img/items/bread.webp
    onUse:
      action: jump
      label: eat_bread
  book:
    name: Ominous Book
    description: An ominous book.
    icon: img/items/book.webp
    category: books
    onUse:
      action: run
      label: read_book
    tag: always_interactable
```

The location of `items.yaml` is set in `config.yaml`:

```yaml
items: data/items.yaml
```

Then items can be added/removed in scripts:

```narrat
main:
  add_item bread 15
  remove_item bread 10
  $if this.items.bread.amount > 0:
    talk helper idle "You have %{items.bread.amount} bread"
  else:
    talk helper idle "You have no bread"
```

## Using items

Items can also be used, see guide below:

## Categories

Items can be grouped into categories. Inventory categories are defined in the `categories` part of the config. Each category has an `id` and `name` property. All the categories will become tabs in the inventory ui, on top of the generic `All` category which shows all items.

Items that have no category will appear in the `All` category.

If a game has no categories defined, the inventory will have no tabs and all items will be shown directly in one place.

[items.md](../features/items.md)

![Inventory](./images/inventory.png)

![Inventory demo](./images/inventory-demo.webp)
