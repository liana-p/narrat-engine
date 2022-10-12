---
title: Example config files
description: Those example config files are the ones used in the narrat demo
---

# Example Config

Those example config files are the ones used in the narrat demo. For the most up to date versions, visit the GitHub links.

::: tip
[This folder on GitHub](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games/demo/data) contains all the config files used in the narrat demo and can serve as a good up to date example of every possible config file.
:::

## Game Config

::: info
See the most up to date config [directly on GitHub](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/examples/games/demo/data/config.yaml)
:::

::: details Example game config.yaml

```yaml
---
gameTitle: Narrat Demo
images:
  narrat: img/backgrounds/narrat.webp
  map: img/backgrounds/map.webp
  shopButton: img/ui/shop-button.webp
  parkButton: img/ui/park-button.webp
dialogPanel:
  overlayMode: true
  rightOffset: 100
  bottomOffset: 50
  width: 475
  height: 680
  textSpeed: 30
  animateText: true
  timeBetweenLines: 100
layout:
  backgrounds:
    width: 1280
    height: 720
  dialogBottomPadding: 70
  mobileDialogHeightPercentage: 60
  verticalLayoutThreshold: 600
  portraits:
    width: 150
    height: 225
screens: data/screens.yaml
buttons: data/buttons.yaml
skills: data/skills.yaml
scripts: data/scripts.yaml
audio: data/audio.yaml
characters: data/characters.yaml
notifications:
  timeOnScreen: 1.5
  alsoPrintInDialogue: true
items: data/items.yaml
quests: data/quests.yaml
hudStats:
  money:
    icon: img/ui/money.webp
    name: Money
    startingValue: 10
    minValue: 0
  energy:
    icon: img/ui/energy.webp
    name: Energy
    startingValue: 10
    minValue: 0
    maxValue: 10
saves:
  mode: manual
  slots: 10
```

:::

## Characters Config

::: info
See the most up to date config [directly on GitHub](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/examples/games/demo/data/characters.yaml)
:::

```yaml
---
config:
  imagesPath: './img/characters/'
characters:
  game:
    name: ''
    color: white
  player:
    style:
      color: orange
    sprites:
      idle: player.webp
    name: You
  cat:
    sprites:
      idle: cat_idle.webp
    style:
      color: white
    name: Generic Cat
  shopkeeper:
    sprites:
      idle: shop_cat.webp
    style:
      color: white
    name: Shopkeeper
  helper:
    sprites:
      idle: helper_cat.webp
    style:
      color: green
    name: Helper Cat
  music_cat:
    sprites:
      idle: music_cat.webp
    style:
      color: '#7f06e2'
      boxCss:
        background-color: red
      textCss:
        color: white
        font-family: Comic Sans MS
    name: Music Cat
  inner:
    sprites:
      idle: inner_voice.webp
    style:
      color: red
    name: Inner Voice
```
