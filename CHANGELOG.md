# [2.14.0](https://github.com/liana-p/narrat-engine/compare/v2.13.1...v2.14.0) (2023-06-11)

### Features

- **conditions:** new elseif conditions feature ([#68](https://github.com/liana-p/narrat-engine/issues/68)) ([1704e14](https://github.com/liana-p/narrat-engine/commit/1704e144ed0cf34c4a0f1fe580378673c530b22f))

# [2.14.0-alpha.1](https://github.com/liana-p/narrat-engine/compare/v2.13.1...v2.14.0-alpha.1) (2023-06-10)

### Features

- **conditions:** new elseif conditions feature ([#68](https://github.com/liana-p/narrat-engine/issues/68)) ([1704e14](https://github.com/liana-p/narrat-engine/commit/1704e144ed0cf34c4a0f1fe580378673c530b22f))

## [2.13.1](https://github.com/liana-p/narrat-engine/compare/v2.13.0...v2.13.1) (2023-04-16)

### Bug Fixes

- issue with create-narrat publish ([d1a1c95](https://github.com/liana-p/narrat-engine/commit/d1a1c95c3fdf8f429c650ef71a7583b68a029620))

### Features

- **audio:** new audio resume command and fix for playing audio that was paused ([#66](https://github.com/liana-p/narrat-engine/issues/66)) ([64713de](https://github.com/liana-p/narrat-engine/commit/64713debf5a86725568fb16eef812731c6607213))

# [2.13.0](https://github.com/liana-p/narrat-engine/compare/v2.13.0-alpha.1...v2.13.0) (2023-04-13)

### Bug Fixes

- **notifications:** notifications now disappear properly ([a1a8e21](https://github.com/liana-p/narrat-engine/commit/a1a8e219152c857bcb1857530e933d6d5cb2164a))

# [2.13.0-alpha.1](https://github.com/liana-p/narrat-engine/compare/v2.12.1...v2.13.0-alpha.1) (2023-04-13)

### Bug Fixes

- **build:** new release process is causing issues, trying a new version ([116b02f](https://github.com/liana-p/narrat-engine/commit/116b02f8320c5cfd79d44d54597cfbf3284884bc))
- create-narrat script issue fix ([1c6cda2](https://github.com/liana-p/narrat-engine/commit/1c6cda223de6a21e7150e1543258f7a701a0190d))

## [2.12.1](https://github.com/liana-p/narrat-engine/compare/v2.12.0...v2.12.1) (2023-04-12)

### Features

- **achievements:** achievement notifications ([#65](https://github.com/liana-p/narrat-engine/issues/65)) ([c6fe5b3](https://github.com/liana-p/narrat-engine/commit/c6fe5b3b69a9a24de7d4019c537b23e5380fc402))

# [2.12.0](https://github.com/liana-p/narrat-engine/compare/v2.10.4...v2.12.0) (2023-04-11) - Achievements!

## Achievements

See the new achievements feature:

https://docs.get-narrat.com/features/achievements.html

### Bug Fixes

- issue with saving non-object values ([#42](https://github.com/liana-p/narrat-engine/issues/42)) ([41881df](https://github.com/liana-p/narrat-engine/commit/41881df425f1f25fa0d164dc38b8c13578b01a0d))
- save data issues ([#44](https://github.com/liana-p/narrat-engine/issues/44)) ([f67826c](https://github.com/liana-p/narrat-engine/commit/f67826c25050befdbb83e3293f68003594f98514))

### Features

- achievements and global save ([#47](https://github.com/liana-p/narrat-engine/issues/47)) ([669c120](https://github.com/liana-p/narrat-engine/commit/669c12092c5c0add7234544b2a11cb08cdb1280a))
- Apply configured audio file volume to played music and sound ([#43](https://github.com/liana-p/narrat-engine/issues/43)) ([63b56ca](https://github.com/liana-p/narrat-engine/commit/63b56ca117489341e4b437547bf2887a2a68ca18))
- component testing setup with vitest and jest-dom ([#46](https://github.com/liana-p/narrat-engine/issues/46)) ([cef092e](https://github.com/liana-p/narrat-engine/commit/cef092e4fad5acd64a9ba2251031f8021a827eb7)), closes [#45](https://github.com/liana-p/narrat-engine/issues/45)
- docs updates and automated release process ([#50](https://github.com/liana-p/narrat-engine/issues/50)) ([58fe210](https://github.com/liana-p/narrat-engine/commit/58fe21067a2c7a3933006d821c32797f966922a4))
- Fix and improve doc links in various places ([#48](https://github.com/liana-p/narrat-engine/issues/48)) ([abed47a](https://github.com/liana-p/narrat-engine/commit/abed47a98a904f4baa54f2670156938bb655df32))
- Get skill check ([#38](https://github.com/liana-p/narrat-engine/issues/38)) ([02b787e](https://github.com/liana-p/narrat-engine/commit/02b787e74c8d5e14d7f132feaaab335d8e8df212))
- more tests setup ([#49](https://github.com/liana-p/narrat-engine/issues/49)) ([984de73](https://github.com/liana-p/narrat-engine/commit/984de73c0f243a6bff0e85b6480cfd340f193f0f))
- sprite onclick arguments supports arguments ([#41](https://github.com/liana-p/narrat-engine/issues/41)) ([5c95e2f](https://github.com/liana-p/narrat-engine/commit/5c95e2f5fc0eeccec315d8d29b3c4424e1748ae7))

## Breaking Changes

- There is a new `saveFileName` string property that must be added to the `config.yaml` file. More info in the [saving and loading docs](https://docs.get-narrat.com/features/save-and-load.html#saving-and-reloading-1).

# Narrat changelog

## [2.12.0] Achievements and global save data

## Achievements

See [achievements docs](https://docs.get-narrat.com/features/achievements.html)

## Global Save Data

The engine now supports global save data. Global save data isn't associated with any save slot and is instead global for the entire game. This allows tracking meta data across multiple playthrough, or enabling features like achievements across multiple saves.

To use, set values in the `global` object instead of `data`. For example:

```narrat
main:
  talk player idle "hello world"
  add global.counter 1
  talk player idle "Global counter is %{$global.counter}"
```

Every time a new game is started, this script will increase the global counter despite it being a new save.

To reset global save data, use the `reset_global_save` command.

### Notable Change

There is a change to the name of the save file. It has been renamed because using a static name can make multiple games have their save files clash if hosted on the same website (for example games hosted on [itch.io](https://itch.io)).

The name of the save file is now generated based on the new `saveFileName` option configured in `config.yaml`.

## [2.11.1] Small bugfixes

- fix: there was an issue where it was possible to select a "hidden" choice (choice that didn't pass a condition) by pressing the corresponding keyboard number

## [2.11.0] Audio volume improvement and saves fix

- Audio volume in an individual audio file's config wasn't used properly and is now correctly mixed with the relevant volume for channels (by [@jornvandebeek](https://github.com/jornvandebeek))
- There was a problem where some game data didn't reset properly if a player continued playing after a save was made, went back to the main menu and reloaded the saved without reloading the browser

(technical note: pinia stores weren't all reset properly. If there are more bugs of this kind please signal them)

## [2.10.8] Fix to saves for non-object values

A bug had sneaked in where non-object values (strings, numbers, booleans) were not saved properly in the save file.

## [2.10.7] Passing arguments to sprite `onClick`

Arguments can now be passed to the `onClick` property of a sprite, by passing a string with the label and space-separated arguments.

It it also possible to make the `onClick` property be an object containing `label` (string), `method` (jump or run) and `args` (array of arguments) values for more advanced use cases.

Example:

```narrat
test_sprites_click:
  set data.sprite (create_sprite img/characters/cat_idle.webp 200 200)
  set data.sprite.onClick "some_label someArgument"
```

Clicking on the sprite will jump to `some_label` and pass as first argument the value `someArgument`

## [2.10.6] - New `get_skill_check` and `skill_check_result` functions

Those two new functions make it possible to access the data of a skill check.

- `get_skill_check` returns the skill check object for a given skill check label (contains `happened`, `succeeded` and `hidden`)
- `skill_check_result` returns the result of a skill check as `true` if succeeded or `false`

Example:

```narrat
test_skill_checks:
  choice:
    "test skill roll"
    roll testSkillCheck agility 50 "Test this skill roll":
      success:
        "You succeed!"
      failure:
        "You fail!"
    "no roll":
      "hello"
  var test (get_skill_check testSkillCheck)
  log $test
  log (skill_check_result testSkillCheck)
```

(See the logs in the js console after running this to see the skill check values appearing in it)

## [2.10.5] - Tooltip improvements

Tooltips now work inside the text of sprites in the viewport

## [2.10.4] - Bugfixes

- Improvement to error messages when the game tries to use characters that don't exist or have missing poses
- Fix for CRLF line endings causing the create-narrat script to fail with Yarn on unix systems
- Various new files are now exported in the narrat package (for development of plugins)

## [2.10.3] - Custom start menu buttons

New plugin API to add custom buttons to the start menu additionally to the basic ones.

See [Custom start menu buttons docs](https://docs2.get-narrat.com/guides/custom-start-buttons)

## [2.10.2] - Sprites nesting fix

Fixed an edge case where sprites nesting would cause an infinite loop during saving

## [2.10.1] - Plugin API updates

Small fixes to the plugin API after recent changes. No other functional changes

## [2.10.0] - Nested sprites and texts in the viewport

### /!\ Breaking change

There is a small breaking change with the **Characters config**

The path to `characters.yaml` now needs to be specified in the `characters` key of the `config.yaml` file.

```yaml
characters: data/characters.yaml
```

The previous mention of the path to `characters.yaml` at the bottom of `src/index.ts` should be removed:

```ts
startApp({
  configPath: 'data/config.yaml',
  debug,
  logging: false,
});
```

### Rest of changes

### Nested sprites and texts

Previously there was a simple sprite feature to create and display individual sprites.

Those **sprites are now called `Screen Objects`**, and can be of different types (empty object, text or sprite for now).

They **can also be nested within in each other in a scene graph structure**, as you would see in many other game engine. Changing a parent will affect all the child objects within.

Usage example:

```nar
test_sprites_click:
  var sprite (create_sprite img/characters/cat_idle.webp 200 200)
  var sprite2 (create_sprite img/characters/cat_idle.webp 50 100 $sprite)
  var text (create_object 50 100 $sprite2)
  set text.anchor.x 0.5
  set text.anchor.y 0.5
  set text.width 200
  set text.height 200
  set text.text "Hello world!!!"
  wait 500
  set sprite.x 400
  wait 500
  set sprite.y 100
```

The script above would create a sprite, with another nested sprite in it, and a nested text at the end. Then by moving the first sprite, everything will move together.

### New options to disable buttons and sprite clicks during scripts by default

- By default, clicking on buttons or sprites will be disabled during scripts (ie. when the dialog panel appears)
- To change this behaviour, set `clickableDuringScriptsByDefault` to `true` in `buttons.yaml`. This will allow all buttons and sprites to be clickable during dialogs
- Individual buttons or sprites have a `scriptClickable` option which can be set to true or false to override the default behaviour.

Example:

```buttons.yaml
clickableDuringScriptsByDefault: false
```

```game.nar
test_sprites_click:
var sprite (create_sprite img/characters/cat_idle.webp 200 200)
set sprite.onClick some_label
```

In this setup, the sprite will only be clickable during scripts.

if we set `set sprite.scriptClickable true`, then the sprite will be clickable during scripts too.

If we change the default options in `buttons.yaml` then all scripts will be clickable by default and we can disable them individually.

## [2.9.3] - Array find index function

A new helper function to find the index of an element in an array using a predicate to run a custom condition.

Syntax: `array_find_index [array] [predicate_label] [...args]`

The predicate is a label (used as a function) which will be called with each element of the array and should return true or false. When the predicate returns true, a match has been found and `array_find_index` will return the index of that match. The `array_find_index` function will also forward any other passed arguments to the predicate, useful for generic options to a function.

Example: We have an array with card objects in it and want to find the index of the card named "B" to delete it:

```nar
var card1 (new Object)
set card1.name "A"
var card2 (new Object)
set card2.name "B"
set data.deck (new Array $card1 $card2)
```

We can now create our custom predicate function to use with `array_find_index`

```nar
card_finder card name_to_match: // card is the array element, name_to_match is an extra parameter
  if (== $card.name $name_to_match):
    return true // If we found a card name that matches, return true
  else:
    return false
```

Then, to use this:

```nar
var index_to_delete (array_find_index $data.deck "card_finder" "B")
splice $data.deck $index_to_delete 1
```

## [2.9.2] - Time commands

New commands for getting and manipulating time, including reading total play time and session time. See [time functions docs](https://docs.get-narrat.com/commandsall-commands#time-commands)

Fix: There was an issue when using the sprite `onClick` feature

## [2.9.1] - Array initialisation, data loading

It is now possible to initialise an array with values:

`var myArray (new Array 128 249 "hello")`

It is now possible to load a data file into a variable:

```yaml
---
black_lotus:
  image: img/characters/cat_idle.webp
blue_eyes_white_dragon:
  image: img/characters/inner_voice.webp
```

```narrat
set $data.cards (load_data data/cards.yaml)
var dragon (create_sprite $data.cards.blue_eyes_white_dragon 200 300)
```

## [2.9.0] - Arrays, tooltips, quest categories and other things

# ⚠️☢️ Breaking Changes ⚠️☢️

### String template syntax change

The use of variables inside string templates now requires prefixing with `$` like in other pieces of code. For example:

- old: `talk player idle "You have %{data.health} hp"
- new: `talk player idle "You have %{$data.health} hp"

This should be easy to do by simply doing a replace-all in your IDE from "%{" to "%{$"

### Quest categories

The config for quests now needs a config for categories. At the minimum, this needs to be added in the quests config file:

```yaml
categories:
  - id: default
    title: Quests
```

Example of a full file:

```yaml
categories:
  - id: default
    title: Quests

quests:
  breadShopping:
    title: Bread Shopping
    description: The helper cat asked you to buy bread for him.
    objectives:
      bread:
        description: Buy bread for the helper cat.
      delivery:
        hidden: true
        description: Deliver the bread to the helper cat.
```

## Other non-breaking changes

### Arrays

New array syntax! It is now possible to create arrays, and to dynamically access array indexes (or object properties) with variables.

See the [tweet explaining the feature](https://twitter.com/NarratEngine/status/1575809637277761542) or the [other tweet showing another example](https://twitter.com/NarratEngine/status/1575809637277761542).

There are lots of new commands for manipulating arrays which can be found in the [all commands list](https://docs.get-narrat.com/commandsall-commands) docs page.

### Quest categories

Quests UI is now split between categories. See the breaking change above for an explanation on how to use them. It works the same way as item categories

### Tooltips

There is a new tooltip feature allowing keywords in text to automatically appear highlighted and show a tooltip on hover. To use this feature, the new `tooltip.yaml` config file is needed:

```yaml
options:
  width: 350
  keywordsPrefix: '@@'
tooltips:
  - keywords: [bread, breads]
    title: Bread
    description: Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking. Throughout recorded history and around the world, it has been an important part of many cultures' diet. It is one of the oldest human-made foods, having been of significance since the dawn of agriculture, and plays an essential role in both religious rituals and secular culture.
```

Then, in `config.yaml` add the path to the file:

```yaml
tooltips: data/tooltips.yaml
```

#### Tooltip options:

- `width`: Width of tooltip box in pixels
- `keywordsPrefix`: The prefix to use before words in scripts to make the tooltip appear

#### Tooltip config

- `keywords`: A list of all possible keywords to match for showing this tooltip. It's case insensitive
- `title`: The title of the tooltip popup that will appear
- `description`: The content of the tooltip popup

Then, to use in scripts, for example:

```narrat
main:
  talk player idle "I like @@bread"
```

Having one of the keywords defined in the tooltips with the `keywordsPrefix` before it will make it be detected as a keyword and show the tooltip

### Other things

- Items the player has 0 of will no longer appear in the inventory
- New `showIfEmpty` item config option to force an item to appear even if it's empty

## [2.8.1] - Various bugfixes

- There should be less bugs caused by using space to skip dialog
- Using autoplay hotkeys won't interfere with the debug jump to label tool anymore
- Menu tabs now correctly disappear if the feature isn't used
- The Escape shortcut to open the menu has been fixed
- Added clearer error messages when trying to use screens or buttons that don't exist

## [2.8.0] - Improved config files

### Breaking Change

The format of the config files has been improved.

- More consistent
- The engine can now validate the game's config file and give info about incorrect or missing fields.

Some of the fields in the config have slightly changed position, and some old options have been removed as they were replaced by others more recently.

### Dialog panel config

Previously the dialog panel config was split in two different parts. It now all goes into the `dialogPanel` at the root of the main config file:

```yaml
dialogPanel:
  overlayMode: true
  rightOffset: 100
  bottomOffset: 50
  width: 475
  height: 680
  textSpeed: 30
  animateText: true
  timeBetweenLines: 100
```

The previous values should be deleted

### Changes to split configs

Some of the split configs were directly a list of elements (like the quests config files or the screens file), which makes it impossible to add new options to those files without a breaking change.

Those files have been changed where needed to have the list of elements inside a specific key, so that new options can be added to those specific files.

This means existing configs will need to be updated in a few places, as explained below.

### Screens config

The screens config file now contains the screens list inside a `screens` property, to allow adding other options in the same file in the future.

Before:

```yaml
default:
  background: narrat
  buttons:
    - shopButton
overlay:
  background: img/backgrounds/overlay.webp
  buttons:
    - id: testButton
      enabled: true
      text: Test
      position:
        left: 500
        top: 300
        width: 200
        height: 50
      action: shopButton
```

After:

```yaml
screens:
  default:
    background: narrat
    buttons:
      - shopButton
  overlay:
    background: img/backgrounds/overlay.webp
    buttons:
      - id: testButton
        enabled: true
        text: Test
        position:
          left: 500
          top: 300
          width: 200
          height: 50
        action: shopButton
```

### Buttons config

Similar to the screens config, the buttons config now has buttons under the `buttons` property:

```yaml
buttons:
  parkButton:
    enabled: false
    text: Park
    position:
      left: 682
      top: 462
      width: 200
      height: 50
    anchor:
      x: 0.5
      y: 0.5
    action: parkButton
```

### Quests Config

Similar to the screens config, the quests list is now inside the `quest` key of the quests config file:

Before:

```yaml
breadShopping:
  title: Bread Shopping
  description: The helper cat asked you to buy bread for him.
  objectives:
    bread:
      description: Buy bread for the helper cat.
    delivery:
      hidden: true
      description: Deliver the bread to the helper cat.
```

After:

```yaml
quests:
  breadShopping:
    title: Bread Shopping
    description: The helper cat asked you to buy bread for him.
    objectives:
      bread:
        description: Buy bread for the helper cat.
      delivery:
        hidden: true
        description: Deliver the bread to the helper cat.
```

### Audio triggers

The `audioTriggers` part of the config has been moved inside the `audio` config

## [2.7.3] - Data save bug

Fixed a bug where contents of the data object would get overwritten after saving

## [2.7.2] - Sprites bugfix

Fixed a bug where sprites wouldn't be able to move after reloading the game

## [2.7.1] - Small bugfixes

Small bug fixes around items use

## [2.7.0] - Animated text and autoplay update

This update brings new features for text animation and autoplay, along with more customisation options to fully control the size and position of the dialogue panel.

Video showing the new features:

![Watch the video](https://www.youtube.com/watch?v=o_wRNp0h0DE)

### Text animation

Text can now be animated instead of printing instantly, as seen in the video above. The new options are:

```yaml
dialoguePanel:
  textSpeed: 30 # Each letter will take 30 milliseconds to appear
  animateText: true # Text will be animated
  timeBetweenLines: 100 # 100 milliseconds of wait time before going to the next line during autoplay
```

### Autoplay and skip

Two new keyboard shortcuts have been added for autoplay and skip modes

- `a`: Toggle auto play
- `s`: Toggle skip

Auto play mode will make dialogue keep playing automatically (waiting the appropriate amount of time between lines), and pause when a choice is reached.

Skip mode will skip all dialogue very fast and stop once a choice is reached or the dialogue is finished.

There are also two buttons in the UI to toggle those two modes, which can be positioned or hidden with CSS.

### New layout options for the dialogue panel

The `dialogPanel` part of the `layout` config can now have a bottom offset and a height. This allows positioning and sizing of te dialogue panel anywhere. For example, a "traditional" VN game layout can be reproduced by making the dialogue panel wide with a small height and positioning it near the bottom of the page.

```yaml
layout:
  dialogPanel:
    overlayMode: true
    rightOffset: 100
    bottomOffset: 50
    width: 475
    height: 680
```

### Improved game menu

The game menu has been improved and is now split in two parts: The system menu (which contains options and the quit/return to menu) and the "menu" containing game-specific menus like inventory, quests etc.

The game menu also now has tabs to switch between the different sections like inventory and skills, rather than having multiple buttons at the bottom of the screen.

Quests have a better layout with a quest list on the left and details on the right.

### Item categories

Items now support categories. By default items without a category go in the "default" category (appearing as "Items" in the game).

The format of the items config has changed to allow to define categories:

Example:

```yaml items.yaml
---
categories:
  - id: default
    title: Items
  - id: books
    title: Books

items:
  bread: # Has no category, will go in the default category
    name: Bread
    description: A bread in the game.
    icon: img/items/bread.webp
    onUse:
      action: jump
      label: eat_bread
  book:
    name: Ominous Book
    description: 'An ominous book.'
    icon: img/items/book.webp
    onUse:
      action: run
      label: read_book
    tag: always_interactable
    category: books # Will go in the books category
```

## [2.6.4] Repeatable skill rolls

A skill roll can now be tagged as repeatable:

```narrat
main:
  jump test_skills_reset

test_skills_reset:
  choice:
    "Skill check test"
    roll testSkillsReset agility 50 "Test this skill roll" repeatable: // The "repeatable" tag here will allow players to retry the roll
      success:
        "You succeed!"
      failure:
        "You fail!"
    "Other choice":
      "Other choice"
  jump main
```

When a roll is repeatable, the player will be allowed to keep trying it every time they come across it, even if it has failed before. If it has already succeeded, it will be skipped as usual

There is also0 a `reset_roll` function to programmatically reset a skill check in the script, for more granular control:

```narrat
main:
  jump test_skills_reset

test_skills_reset:
  choice:
    "Skill check test"
    roll testSkillsReset agility 50 "Test this skill roll":
      success:
        "You succeed!"
      failure:
        "You fail!"
    "Other choice":
      "Other choice"
  reset_roll testSkillsReset // This will completely reset the state of the skill roll, no matter if it failed or not
  jump main
```

## [2.6.2]

Fixed a bug with reloading audio saves when audio was previously stopped

⚠️ Saves created with 2.6.1 might have an issue with audio data and need to be deleted

## [2.6.1]

Fixed a bug in edge cases with saves

## [2.6.0] New save system and improved default CSS design

The save system has been reworked to be easier to understand and less buggy.

⚠️ Breaking Change: Because there are no existing games with saves out there, migration code for previous save file versions has been deleted to start from a clean slate. This means old versions of save will be automatically reset (or potentially break) when updating the engine.

### Fixed save slots amount

The new system has a fixed amount of save slots allocated to a game, defined in the save part of the config.

In manual mode, one of those slots is the auto save and the others are for manual saves the players may create. In `game-slots` mode, each slot corresponds to a playthrough, like before.

```yaml
saves:
  mode: manual
  slots: 10
```

The rest of the saving system functions as it used to.

### Bug fixes

Some issues with how data was saved (especially when not reloading the page) were identified and fixed.

### CSS Design

The default CSS design has been improved to look nicer. It's mostly changes to default color so it shouldn't impact existing games much. A few new CSS variables have been added to make customising buttons and modals easier:

```css
--light-gradient: linear-gradient(to right, var(--light-1), var(--light-2));
--light-background: rgba(255, 255, 255, 0.3);
--button-background: var(--light-gradient);
--button-text-color: var(--text-color);
--modal-background: rgba(0, 0, 0, 0.7);
```

## [2.5.1] Button improvements

### Button text string interpolation

Buttons text can now use string interpolation to display variable values. Example:

```yaml
buttons:
  - id: shopButton
    text: '%{shopName} Shop'
```

### Button custom CSS class

Buttons have an optional `cssClass` property, to allow giving them a specific css class:

```yaml
buttons:
  - id: shopButton
    cssClass: my-css-class
```

Can be used to for example easily give the same styling to a range of buttons, or to give them hover styling

### New audio triggers

There are 3 new audio triggers to play sound effects when interacting with buttons, sprites and items. Example:

```yaml
audioTriggers:
  onButtonClicked: click
  onSpriteClicked: click
  onItemUsed: click
```

## [2.5.0] Mobile layout and new dialog panel overlay mode

### Mobile layout

Portrait mode mobile device layout support has been fixed and improved. The `layout.verticalLayoutThreshold` part of the config decides which screen width threshold will trigger the change between portrait and landscape.

There are also new options to give an offset to character portraits depending on the orientation of the device, to make it possible to control their position. In the layout config:

```yaml
portraits:
  width: 150
  height: 225
  offset:
    landscape:
      right: 10
      bottom: 0
    portrait:
      right: 10
      bottom: 0
```

### New dialog panel overlay mode

There is now an option to make the dialog panel appear in overlay mode. Instead of it being on the right of the viewport, it will appear on top of the viewport when a script is active. This allows the viewport to use the full width of the screen when not in dialogues.

The new `dialogPanel` part of the layout config controls this option:

```yaml
layout:
  dialogPanel:
    overlayMode: true # True activates overlay mode
    rightOffset: 50 # In overlay mode, the dialog panel will be moved to the left by this amount when overlayed.
```

## [2.4.1] Fix to multiple layers clickthrough

Fixed a bug where a higher layer of screen in the viewport could block clicks through to the previous layers.

## [2.4.0] Sprites support

The engine now supports dynamic sprites in the viewport.

The `create_sprite` function returns an object that can be manipulated to move sprites, change their anchor, opacity, scale and more.

Usage example:

```narrat
test_sprites:
  var sprite1 (create_sprite img/sprites/mannequin.webp 200 500)
  set sprite1.anchor.y 1
  set sprite1.scale 0.5
  var sprite2 (create_sprite img/sprites/mannequin.webp 500 700)
  set sprite2.anchor.y 1
  var pos 200
  wait 20
  set sprite1.x 250
  wait 20
  set sprite1.x 300
```

## 2.3.5

Fixed a bug in the previous release when emptying an already empty layer

## [2.3.4] Screen transitions fixes and improvements

- fix: transitions no longer fail when starting from an empty screen layer
- fix: Loading a game save where a layer was emptied doesn't crash anymore
- feature: The `empty_layer` command can now use transitions: `empty_layer 0 slide-right 2000`

## [2.3.3] Split config files support

The config can now be split in multiple files to be easier to edit. Possible files are:

- screens
- buttons
- skills (contains skills, options and skillOptions)
- scripts
- audio (contains files for list of audio, and options for audioOptions)
- items
- quests

To use a split config file, simply replace the value of that object in the config with the path of the file that contains the config. Example:

Before:

config.yaml

```yaml (config.yaml)
screens:
  default:
    background: narrat
  # ... Rest of the screens config
```

After:

config.yaml

```yaml (config.yaml)
screens: data/screens.yaml
```

screens.yaml

```yaml
default:
  background: narrat
map:
  # Rest of the config
```

For an example, see the config files in the [default example](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games/default/data)

## [2.3.2] Yaml support

The engine now supports `yaml` config files. The `config.json` and `characters.json` can now be written in yaml. The engine will detect which one of the two is being used based on the file extension in the path.

Websites like [json2yaml](https://www.json2yaml.com) can easily convert existing json files into yaml. Then it's just a matter of naming the file `config.yaml` instead of `config.json`, and updating the path that's passed to narrat in `src/index.ts`.

## 2.3.1

fix: A bug where manual saves would get overriden as autosaves in manual save mode has been fixed.

## 2.3.0

### Improved plugin API

The plugin API has been improved to allow for more features (not documented yet).

There is now an [example plugin](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat-plugin-counter) in the repo that serves as an example of how to write plugin.

There is also a [create-narrat-plugin](https://github.com/liana-p/narrat-engine/tree/main/packages/create-narrat-plugin) tool to easily create a plugin project, similar to the create-narrat tool.

## 2.2.18

### New config options to customise the engine splash screen and game splash screen

It is now possible to add a `splashScreens` option to `config.json`, where the following values can be used (all optional).

**Note:** In debug mode, the engine splash screen is automatically skipped to save development time, regardless of options. Change debug to false in `src/demo.ts` if you want to see splash screens.

```ts
  splashScreens: {
    engineSplashScreen?: {
      skip?: boolean;
      fadeDuration?: number;
      timeBeforeFadeout?: number;
      overrideText?: string;
      overrideLogo?: string;
    };
    gameSplashScreen?: {
      startButtonText?: string;
    };
  };
```

Example:

```json
{
  "splashScreens": {
    "engineSplashScreen": {
      "timeBeforeFadeout": 3,
      "fadeDuration": 2
    },
    "gameSplashScreen": {
      "startButtonText": "Start Game"
    }
  }
}
```

## 2.2.17

### Create narrat tool updated

The create narrat tool has been updated with a more recent demo, and a template based on the RPG demo.

### More convenient `startApp` function

Optional backwards-compatible convenience change to the `startApp` function:

Previously, `startApp` was split into two different options objects for no good reason:

```ts
startApp(
  {
    baseAssetsPath: assetsPath,
    baseDataPath: dataPath,
    charactersPath: `${dataPath}data/characters.json`,
    configPath: `${dataPath}data/config.json`,
  },
  {
    logging: false,
    debug,
  },
);
```

Now, it is possible to put all those values in one object (but it's backwards compatible so existing code will work just as it did before):

```ts
startApp({
  baseAssetsPath: assetsPath,
  baseDataPath: dataPath,
  charactersPath: `${dataPath}data/characters.json`,
  configPath: `${dataPath}data/config.json`,
  logging: false,
  debug,
});
```

### New `baseDataPath` option in startApp

(Optional) If for whatever reason you want data assets (scripts) to be located in a different base folder than the default, you can pass this option as in the example above.

### Internal repo changes

Internal changes to repository structure to make it easier to develop example games and the narrat template games (templates are now taking from example games to avoid duplication). The repo also stopped using git LFS and is reusing common assets across examples to avoid more asset duplication.

This Shouldn't affect end users

## 2.2.16

Nicer loading and game splash screen feature

## 2.2.15

### Manual saves

The engine now has a feature to use manual saves in a game instead of the default system of save slots per game that auto save.

In config.json, setting `saves.mode` to `manual` will enable this feature. The default is `game-slots` which is the existing behaviour (where each game has a single save slot and keeps saving in that slot).

To summarise:

- `game-slots`: Save mode where each press of "New game" creates a save slot for that playthrough, and the game auto-saves in that slot every time. If loading a save, the game will auto-save in the slot that was just loaded. Each save slot is basically a linear playthrough where the save gets auto erased whenever the game auto saves.
- `manual`: Save mode where there is a single global auto save used no matter which save gets loaded, but manual saves won't be overwritten unless the player chooses to overwrite them

With this, there are two new commands:

`save`: Lets the player choose where to save the game to a manual save slot
`save_prompt`: Asks the player if they want to save, then does the same thing as `save`

Syntax: `save [save_name]`: The first argument is an optional name for the save slot. Can be used for auto-naming saves with for example the current chapter or other. Otherwise it defaults to generating a name based on the save's number.

**Note:** Saves still only save data when jumping labels, so the data that gets saved in a manual save will be the data at the point where the jump to the current label happened.

## 2.2.14

- Bugfix: An edge case caused by a [bug on firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=706773) would cause keyboard events to stop working after a button has been clicked with the recent update that auto disables them, so this has been fixed by not using a native button to avoid having it keyboard selectable
- Internal architecture updated to be a monorepo, with pnpm now used as a package manager for internal development. Shouldn't affect users

## 2.2.12 and 2.2.13

Internal architecture updates to support the new [create-narrat](https://github.com/liana-p/narrat-engine/tree/main/packages/create-narrat) tool to generate narrat projects automatically.

The narrat template is now retired in favor of this new tools, and there are now multiple choices of templates in the create-narrat tool for people to use when setting up projects.

## 2.2.11

### Transitions feature

See [Transitions](https://docs.get-narrat.com/features/transitions) docs for more info

## 2.2.10

New function to return to the main menu from a script: `menu_return`

## 2.2.8

- Bugfix to inventory items that use the `run` command in the middle of a running dialogue

### New features

- Screen buttons can have a `tag`, which works the same as interaction tags for inventory items. The default tag gets disabled inside scripts, and all buttons have the `default` tag by default. This makes it possible for buttons to automatically be greyed when entering a dialogue, without having to manually disable them or change screen.
- New config option: `gameFlow.labelToJumpOnScriptEnd`: When the game reaches script end (when it shows the debug message about the script being finished), if this option is present it will instead jump to the provided label. This allows automatic jumping back to a map screen label or other whenever dialogues end.

## 2.2.4 - 2.2.7

Various bugfixes to previous changes

## 2.2.3

New `think` command. Works the same as talk, but doesn't wrap text in quotes.

It also has custom CSS so each version of text can be customised. talk commands add the CSS class `talk-command`, think: `think-command`, and the basic text command adds `text-command`.

Example:

```py
think player idle "I wonder if I could eat a whole pizza in 28 seconds"
```

## 2.2.2

New notification commands and options:

- `disable_notifications`: Disables notifications
- `enable_notifications`: Enables notifications

New config option: `skillOptions.notifyLevelUp` (boolean). Default: true. If set to false, will disable notifications from level ups for the whole game.

## 2.2.1

Notifications can now use html tags and string interpolation

Example: `notify "Hello <span style='color:red;'>%{playerName}</span>"` will work

## 2.2.0

Audio improvements:

- New audio mode: `ambiant` for ambiant music/sound
- New audio channels feature: Optional `channel` parameter in `play`, `stop` and `pause` commands to choose a channel (defaults to 0). This allows having multiple musics, or multiple ambiant sounds to play at once.

Examples:

- `play music calm` will play the music `calm` on channel 0.
- `wait 2000`
- `play music calm 1` will play the music `calm` on channel 1. Because it's a different channel, the musics will superpose
- `wait 2000`
- `stop music 1` will stop the music on channel 1.
- `play ambiant forest` will play the ambiant sound `forest` on channel 0. This is a different audio mode, so it will be played independently of the musics.

Sounds now also use channels, but they ignore all the code related to fading musics in and out, or stopping the previous audio on the channel (because sounds are meant to be a one off and people shouldn't have to bother keeping track of sound channels).

To stop the last audio played on the channel `stop sound` works. It is still possible to use channels with sounds (`play sound bang 1` then later `stop sound 1`), but it shouldn't be necessary.

## 2.1.6

Fixed an issue where the `random` command didn't accept 0 as a number

## 2.1.5

Bugfixes related to save slots edge cases

## 2.1.4

New math commands:

- `floor`: Turns a number into an integer (whole number), rounding down.
- `ceil`: Turns a number into an integer (whole number), rounding up.
- `round`: Rounds a number to the nearest integer.
- `sqrt`: Square root of a number.
- `^`: Exponentiation.

Also, the `set_level` and `add_level` commands will give a warning and auto round values passed if they're not whole numbers.

### Save slots

The engine now supports save slots. The "Load game" button will open a window for the player to choose a save file to load.

There is also a new "Continue" button that will appear if the player has already played to continue playing on the same slot as last time.

## 2.1.3

There is now access to the game's config and app options in script, notably useful to check if the game is in debug mode. New available options:

`$config`: The game's config.
`$gameOptions`: The options passed when launching the game with `startApp`

Example:

```rpy
main:
  if $gameOptions.debug:
    "Do something in debug mode"
```

## 2.1.2

### Internal Refactor

The scripting engine has been refactored internally to differentiate between blocks and frames. A frame in the stack is now a function call (running a label or jumping), whereas blocks are for branching. That means any block inside a frame still has access to the same scoped variables (which are stored in the frame), and `return` can now be called anywhere inside a function and will interrupt the function and return, like in other languages.

### Bugfixes

- There was an issue with the `text` command from the fix in 2.1.1, now solved
- There were various issues affecting performance and logic in keyboard handling with the dialogue box which are now fixed
- Added a bit of debouncing on the keyboard events because there was an issue when speeding through games

### Keyboard events in production

Previously, the engine was using a `keydown` event for picking choices with the keyboard. This allowed speeding through the game quickly, but shouldn't be possible in production.

The engine now instead uses a `keyup` event if the debug mode is up, to make it impossible to speed through the game by holding space for normal players.

## 2.1.1

fix: The `text` command (default command for printing text without using `talk`) was adding quotes around text since 2.0.0. This is now fixed.

## 2.1.0

### ⚠️ Breaking Change ⚠️

Narrat has been updated to use [vite 3](https://vitejs.dev/blog/announcing-vite3.html#the-ecosystem-is-ready-for-v3). The only breaking change is that the path of the narrat CSS file has changed:

In the game's `index.ts` the import of CSS needs to change. Before:

`import 'narrat/dist/lib.css';`

After:

`import "narrat/dist/style.css";`

Many new features, TODO: fill changelog.

### Data shorthand

It is now no longer necessary to prefix things with `data` when setting or getting variables.

For example `set player.name` is equivalent to `set data.player.name`.

The way the system works when looking up variables is:

- Return if there's a base variable in the lookup state matching (for example `data`, `skills` etc)
- Otherwise if a variable exists in the local scope (created with `var`) use that
- Otherwise default to assuming we're editing something inside `data`

### New example RPG game

There is now an example [dungeon crawler turn based RPG](https://github.com/liana-p/narrat-engine/tree/main/examples/rpg) game made as a test to push the engine and scripting features. It is not meant to be a full game, but can be a useful reference for advanced usage.

### Anchor feature for buttons

There is now an optional `anchor` property for buttons, useful for anchoring a buttom from its center or any other place.

Example:

```json
{
  "buttons": {
    "go_front": {
      "enabled": false,
      "background": "img/ui/front.png",
      "position": {
        "left": 440,
        "top": 120,
        "width": 96,
        "height": 96
      },
      "anchor": {
        "x": 0.5,
        "y": 0.5
      },
      "action": "choose_front"
    }
  }
}
```

### Base assets path

There is now a way to pass a base assets path to narrat, which will be prepended to the path of any assets that need to be loaded by the engine (this was needed to implement the multiple demos in a single repo).

The option is `baseAssetsPath` which can be passed in the first options object of `startApp`.

See the `demo.ts` file for an example of how to use it.

### Game examples now in the repo

The repo has been restructures to allow having multiple example games directly inside it.

The `examples/` folder contains a subfolder for each demo game, where the data/asset files for a game can be placed.

To run an example game, the dev script needs to be run with a special environment variable pointing to the path of the game to run. For example, a command has been added to run the rpg game:

`npm run rpg` -> Runs `cross-env VITE_EXAMPLE=examples/rpg npx vite dev`

Demo games can also be built from the repo. For example:

`npm run build-rpg` -> Runs `cross-env VITE_DEMO_BUILD=rpg npx vite build && shx cp -r examples/rpg/* built-example/rpg`. The built game is then available in the `built-example/rpg` folder.

### New commands

Added a lot of new commands while making the RPG example.

#### Math operations

- Negate numbers: `neg 1` -> returns -1
- Absolute function: `abs -1` -> returns 1
- Min - returns lowest passed number: `min 1 2` -> returns 1
- Max - returns highest passed number: `max 1 2` -> returns 2
- Clamp - returns number between min and max: `clamp 1 2 3` -> returns 2 (syntax: `clamp [min] [max] [value]`)

#### Random generation

- Random number: `random 1 10` -> returns an **integer** random number between 1 and 10 (inclusive)
- Random float: `random_float 1 10` -> returns a float between 1 and 10
- Random from args: `random_from_args "a thing" "another thing" 2 "things can be any value"` -> returns a random item from the list of arguments

#### Strings

- Concat: `concat "a" "b"` -> returns "ab" (Syntax: `concat [string1] [string2] [string3]...`)
- Join: `join ", " "a" "b"` -> returns "a, b" (Syntax: `join [separator] [item1] [item2] [item3] ...`)

#### Skills

- Set level: `set_level agility 1` -> sets the level of the skill "agility" to 1
- Get level: `get_level agility` -> returns the level of the skill "agility"
- Get xp: `get_xp agility` -> returns the xp of the skill "agility"

#### Utility

- Log: `log $someVariable` -> logs the value of the variable $someVariable to the console (Syntax: `log [value1] [value2] [value3]...`). Can be used to log anything for debugging

## 2.0.12

New layers feature: Multiple screens can be overlaid on top of each other in layers.

Layers are defined by their number, being displayed from 0 to x. By default, the `set_screen` command sets a screen on the first layer, as it did before. To set a screen on a different layer, pass the layer number as a second parameter.

```py
set_screen my_screen 1
// do stuff, then remove the overlay
empty_layer 1
```

## 2.0.11

feature: The left-side viewport now uses DOM instead of canvas so screens and buttons can use animated gifs or webp.

The config has optionally been made easier to edit, with no need to define images in the `images` part of the config. buttons can also now be optionally defined inside the screen directly. The config is still compatible with the old syntax.

Example:

```json
{
  "screens": {
    "default": {
      "background": "narrat"
    },
    "map": {
      "background": "img/backgrounds/map.png",
      "buttons": [
        {
          "id": "shopButton",
          "enabled": false,
          "background": "img/ui/shop-button.png",
          "position": {
            "left": 38,
            "top": 6,
            "width": 255,
            "height": 226
          },
          "action": "shopButton"
        },
        {
          "id": "parkButton",
          "enabled": false,
          "background": "img/ui/park-button.png",
          "position": {
            "left": 632,
            "top": 86,
            "width": 255,
            "height": 226
          },
          "action": "parkButton"
        }
      ]
    }
  }
}
```

## 2.0.10

fix: `quest_completed?` now returns the correct value

## 2.0.9

Internal engine changes, shouldn't impact users.

Refactor to the VM and commands system to handle the way the stack flows better. Commands don't have to call `nextLine` on the VM to run the next line, instead the VM properly knows when a command is truly finished and controls the program's flow.

Also renamed `stacks` to `frames`, as the stack is the array that contains the frames and this was confusing.

## 2.0.8

- Fix: Auto scrolling when new text is added now works properly
- Fix: error when using set_stat or add_stat with a value of 0

## 2.0.7

Fixed an error where the `roll` function always returned true even if the skill check failed

## 2.0.6

Fixed a reggression bug introduced in 2.x where player choices weren't printed anymore in the dialogue history after making a choice.

## 2.0.4

Fixed more audio edge cases around race conditions

## 2.0.1

Fixed audio bug around loading

### New feature: Text Fields

New text fields feature to let players type answers to questions.

Usage: `text_field [prompt]`

Example:

```py
main:
  set player.name (text_field "Enter your name")
  "Your name is %{playerName}"
```

## 2.0.0

The narrat 2.0.0 branch is now the main branch.

Narrat 1.x has been deprecated and moved to the `v1-latest` tag on npm.

To install old v 1.x for legacy games, use `npm install narrat@v1-latest` instead of just `npm install narrat`

To know more about how to update a game to 2.x, see the [narrat 2.0.0 docs](https://docs.get-narrat.com/readme/narrat-2.0)

## 2.0.0-rc4

### Important Note

The main CSS file from narrat must now be imported in games using it to have the default CSS.

Simply add `import 'narrat/dist/style.css';` at the top of your `index.ts` (before your own CSS).

### Switch to vite

To make developping narrat easier, the bundler used has been switched from rollup to vite. Vite is recommended as the standard for Vue these days, and the rollup vue plugin is deprecated. The update was necessary to support more recent features.

This has no impact on end users, other than having to import the CSS file as explained above.

## 2.0.0-rc3

- Improvements to debugging to show more useful info on parser/runtime errors
- Corrected display of line numbers in errors
- Made parser continue parsing after errors to make it easier to see all errors at once and to be able to play the game even if there are parser errors

## 2.0.0-rc1

### Narrat 2.0

### What changed in narrat 2.0

Narrat has a **new language syntax** in 2.0.0 - The parser has been improved to turn the narrat scripting into a full programming language with support for expressions, variables and functions

The syntax is generally the same so existing scripts would mostly work, except for the use of `$if` (which used to be a hack by sending your code to JavaScript [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)).

### Script updating tool

There is a [script updating tool](https://github.com/liana-p/narrat-engine-Script-Updater) which can be used to help automatically update existing scripts from 1.x to work with the new syntax.

{% hint style="danger" %}
The old syntax is largely compatible, but the $if instruction works very differently now. The script will update those $if instructions to match the new system, but might fail at updating long series of conditions in $if
:::

### Installing narrat 2.0

Narrat 2.0 is currently published under a different tag to avoid people on 1.x accidentally installing it.

To install narrat to, run `npm install narrat@next`. The `next` tag is where the latest 2.x version is published.

### Expressions

Expressions are now a first party feature. An expression is any operation between parenthesis. Any command in the game can be used as an expression, if it returns a value. For example `(+ 2 3)` is an expression that would get evaluated to `5`.

### Syntax for using commands

The syntax for using commands hasn't changed, but it's been formalised.

The format for any operation is `[operator] [arg1] [arg2] [arg3] ...`. Operator is the command's keyword (like `talk`, `set`, `if` etc).

For example:

`set data.player.score 3` is the operator `set` with arguments `data.player.score` and `3`.

`set data.player.score (+ $data.player.score 2)`

The first command would set `3` in `data.player.score`.

The second command is also a set on `data.player.score`, but the second argument (the value) is an expression itself: `(+ $data.player.score 2)`. So the final resulting command is effectively `set data.player.score 5`.

### Using Variables

To use a variable's value in a command, prefix its name with `$` as in the example above. In the case of the `set` command, we want to pass to set the variable's name, not its value, so we don't use `$` at the start.

Variables are also available in string interpolation as before, to insert variables in text:

`talk player idle "Hello %{data.player.name}"`

### New If syntax

The previous `$if` is gone, now `if` is a command itself, which takes one argument: the condition. If the condition is true it plays the next branch, and it can have an optional else branch.

Example:

```py
set data.age 25
if (> $data.age 18):
  "The player is an adult"
else:
  "The player is not an adult"
```

#### More details on syntax and expressions

More complex example:

```py
main:
  set data.winThreshold 10
  set data.player.score 5
  set data.player.scoreBonus 5
  if (== (+ $data.player.score $data.player.scoreBonus) $data.winThreshold):
    "The player won!"
```

In this example, the script stores a few variables, and then uses them in an `if` to compare their value. The `==` operation returns true if all arguments are equal, while the `+` operation adds values together and returns the result.

Here's how the code above would get broken down as the expressions get calculated:

```py
if (== (+ $player.score $player.scoreBonus) $data.winThreshold):
if (== 10 $data.winThreshold):
if (== 10 10):
if true
```

### New operators

A lot of new operators have been added to be able to perform basic operations with the new scripting system:

- `+`, `-`, `*`, `/` : Will add/substract/etc arguments passed and return the value. Can take infinite arguments
- `||` and `&&` : Will or/and all arguments passed and return true or false. Inifinite arguments
- `>`, `>=`, `<`, `<=`, `==`, `!=` : Compares arguments 1 and 2, returns true or false. Note: equality uses truthy equality, not strict equality
- `!`: Negates argument 1
- `?`: Ternary operation. Arg 1 is the condition, 2 is what gets returned on success, 3 what gets returned on failure

### New helper functions

New helper functions for easily checking quests and inventory without long lines:

- `quest_completed? [questId]`: Returns true if the quest `questId` is completed
- `objective_completed? [questId] [objectiveId]`: Same for an objective
- Also quest_started and `objective_started`
- `has_item? [itemId] [amount (optional)]`: Returns true if the player has an item (if amount is passed, the player needs to have amount or more of it)
- `item_amount? [itemId]` Returns how many of an item the player has.

### Local variables

Local variables can now be declared. They exist inside the scope in which they are declared. Example

```python
main:
  run variables_test
  "The variable 'test' is now undefined because we left the scope it was created in: %{test}"

variables_test:
  var test 1
  "Test value is %{test}"
```

### Function with arguments and return values

Labels are now "functions" and can take arguments or return values.

Example:

```
main:
  var meal (run takeout_menu Cake)
  "The player chose to eat %{meal}"

takeout_menu third_option:
  var meal ""
  choice:
    talk helper idle "Which meal do you want?"
    "Pizza":
      set meal pizza
    "Burger":
      set meal burger
    "%{third_option}":
      set meal $third_option
  talk helper idle "Chosen %{meal}"
  return $meal

```

### Other new features

#### Audio triggers

New audio triggers feature to play sounds on certain events in the game.

Simply add the sounds to the config:

```json
  "audioTriggers": {
    "onPlayerAnswered": "click",
    "onPressStart": "game_start",
    "onSkillCheckFailure": "failure",
    "onSkillCheckSuccess": "success"
  }
```

Keys are event names, and values are the id of an audio you've defined in the config. For now all the available events are the ones above. Once defined, the sound will play every time that event is triggered.

## 1.3.3

1.x branch is now deprecated as 2.x is being pushed to main.

See [Narrat 2.0 update](https://docs.get-narrat.com/readme/narrat-2.0) docs for more info on how to update to 2.x

The main breaking change is the syntax for $if has changed, and also a CSS file needs to be imported in the game's `index.ts`:

`import 'narrat/dist/lib.css';`

## 1.3.2

- Improvement to variables editor for debugging
- Bugfixes to access quests in conditions

## 1.3.1

New feature to "use" items.

In an item config, an optional `onUse` value is available, which cn be set to a label to jump to when using the item.

There are also interaction groups which allow scripts to toggle on/off whether using items is allowed. They can be configured to automatically be turned off during dialogue scripts (to avoid bugs/side effects that jumping to an item's label would cause halfway through dialogue).

Config:

```json
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
        "action": "run",
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

The `onUse` `action` property can be either `jump` or `run`, allowing to either jump to a script, or run a script as a function (see [1.3.0 changes](#1.3.0) or [functions docs](https://docs.get-narrat.com/features/functions)), which effectively allows interrupting the current dialogue to run an item's function before going back to it.

The `tag` property on an item data sets which interaction group it is part of. This allows fine control of which items can be allowed to be used when. For example, some items might be available to use all the time, while some should only be allowed to be used at certain points.

By default if not provided, items have the `default` tag, and the default configuration has the `default` tag set to use `onlyInteractOutsideOfScripts`, which automatically disables interaction during scripts to avoid issues.

In the example above, the bread can only be interacted with outside of scripts and will use a jump to a label, while the book can be interacted with at any time and will use a `run`, effectively running a label as a function and then going back to where the script was.

In scripts, interaction tags can be controlled:

```py
main:
  disable_interaction someTag
  talk player idle "Impossible to use items with the tag someTag for now"
  enable_interaction someTag
  talk player idle "It is now possible to use items with the tag someTag"
```

## 1.3.0

New `run` function to run a label as a "function"

The difference between this and jump is that using `run` will go back to where you were before once the label is over.

For example:

```py
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

**Note:** Saving still only happens when _jumping_ to a label, because being at a specific label is the only way to make sure a save file can keep working if the code of the game gets changed in an update.

## 1.2.1

Improved reset feature when returning to main menu to avoid potential bugs

## 1.2.0

## Quests system

There is a new quests system.

Quests can be defined in the config:

```json
  "quests": {
    "breadShopping": {
      "title": "Bread Shopping",
      "description": "The helper cat asked you to buy bread for him.",
      "objectives": {
        "bread": {
          "description": "Buy bread for the helper cat."
        },
        "delivery": {
          "description": "Deliver the bread to the helper cat."
        }
      }
    }
  }
```

Scripts can interact with the quest system:

- Start Quest: `start_quest breadShopping`
- Start objective: `start_objective breadShopping delivery` (for hidden objectives)
- Complete objective: `complete_objective breadShopping bread`
- Complete quest: `complete_quest breadShopping`

Example demo:

```py
quest_demo:
  set_button shopButton true
  set_button parkButton false
  jump bread_quest

bread_quest:
  choice:
    talk helper idle "Can you get 2 pieces of bread for me?"
    "Yes":
      talk helper idle "Thanks, that's very nice!"
      talk helper idle "I'll be waiting for you at the park"
      jump bread_start
    "No":
      talk helper idle "Oh, okay"
      jump quest_demo

bread_start:
  start_quest breadShopping
  talk inner idle "Time to go to the shop to buy some bread then."
  set_screen map
  set_button shopButton true

shopButton:
  set_screen default
  "You visit the bread shop"
  talk shopkeeper idle "Hello, I'm a little baker selling bread!"
  set data.breadPrice 5
  jump shop_menu

parkButton:
  choice:
    talk helper idle "Ah, so do you have my bread?"
    "Yes!" $if this.items.bread.amount >= 2:
      talk helper idle "Thanks a lot!"
      complete_objective breadShopping delivery
      complete_quest breadShopping
    "No :(":
      talk helper idle "Oh okay"
  set_button parkButton false

shop_menu:
  choice:
    talk shopkeeper idle "So, do you want some bread?"
    "Buy bread (costs %{data.breadPrice})" $if this.stats.money.value >= this.data.breadPrice:
      add_item bread 1
      $if this.data.breadPrice === 5:
        add_stat money -5
      else:
        add_stat money -4
      jump map_update
    roll bread_haggle haggling 50 "Try to haggle for bread" hideAfterRoll:
      success "You explain that helper cat needs bread to feed his poor family":
        set data.breadPrice 4
        talk shopkeeper idle "I guess I can sell you bread for 4 coins"
        jump shop_menu
      failure "You try to pity trip the shopkeeper but he won't bulge":
        talk shopkeeper idle "The price is 5 coins, nothing less, nothing more."
        jump shop_menu
    "Exit":
      jump map_update

map_update:
  $if this.items.bread.amount >= 2:
    complete_objective breadShopping bread
    talk inner idle "I've got enough bread now, I'm going to go to the park."
    start_objective breadShopping delivery
    set_screen map
    set_button parkButton true
    set_button shopButton false
  else:
    talk inner idle "Hmm, I still need to buy more bread for helper cat."
    set_screen map
```

## 1.1.0

### Inventory system

There is a new inventory system.

Possible items can be defined in the config:

```json
  "items": {
    "bread": {
      "name": "Bread",
      "description": "A bread in the game.",
      "icon": "img/items/bread.png"
    }
  }
```

Then items can be added/removed in scripts:

```py
main:
  add_item bread 15
  remove_item bread 10
  $if this.items.bread.amount > 0:
    talk helper idle "You have %{items.bread.amount} bread"
  else:
    talk helper idle "You have no bread"
```

## 1.0.0

### State management rewrite

Rewrote the state management of the engine using [pinia](https://pinia.vuejs.org/) instead of Vuex for state management.

This allows the state to be more modular, easy to use and better compatible with Vue.js devtools for development of the engine, as pinia is now the official vue state management library.

The version has been bumped to 1.0.0 as it's a major rewrite. No bugs have been found when testing though.

### Save files breaking change

The save file format has changed, so saved games from previous versions would break. As no one is using this engine in production for now, this isn't an issue.

A new `version` string has been added to save files, so that in the future it will be possible to add migrations from older save files to newer ones if needed

## Updated Vue version

The Vue dependency version has been updated to the current latest (3.2.37)

## Vuex peer dependency deleted

Vuex is no longer a peer dependency, and has been replaced with pinia.

## 0.11.1

Fixed an error in how the narrat packaged is exported

## 0.11.0

### New Plugin system!

There is now a plugin system developers can use to add new functionality to narrat (more documentation soon). See the [narrat-bitsy](https://github.com/liana-p/narrat-engine-bitsy) plugin for an example.

## 0.10.0

### New XP System

- XP can be accumulated to level
- config option: `skillOptions.xpPerLevel`
- Use `add_xp` in script tso add xp, just like adding levels
- XP now displayed in skills menu

### Other improvements

- Improvements in skill checks display and difficulty
- Bug fixes to skill check edge cases
- Fixed a bug when not having a default title screen music
- Added a new `hideAfterRoll` option to skill checks to hide their choice after they've happened once
- Refactored skill check code for internal consistency between the different ways they're run
- New CSS variables and classes to customise the look of skill check prompts

## 0.9.4

- Fixed a bug when going back to the main menu and reloading the save without refreshing the page
- New `defaultMusic` option in audio options for title screen music

## 0.9.3

- Fixed a bug when loading a saved game

## 0.9.2

- Added new CSS variables and id/classes to make it easier to theme games

Current CSS variables list (Look at [main.css](https://github.com/liana-p/narrat-engine/blob/main/src/sass/main.css) in the narrat repo for up to date version):

```css
:root {
  --bg-color: #131720;
  --text-color: #d9e1f2;
  --primary: hsl(255, 30%, 55%);
  --focus: hsl(210, 90%, 50%);
  --secondary: #42b983;
  --border-color: hsla(0, 0%, 100%, 0.2);
  --light-1: hsl(210, 30%, 40%);
  --light-2: hsl(255, 30%, 50%);
  --light-background: linear-gradient(to right, var(--light-1), var(--light-2));
  --shadow-1: hsla(236, 50%, 50%, 0.3);
  --shadow-2: hsla(236, 50%, 50%, 0.4);
  --hud-background: rgba(0, 0, 0, 0.4);
  --hud-text-color: var(--text-color);
  --notifications-bg: darkslateblue;

  --skills-text-background: rgba(0, 0, 0, 0.5);
  --skills-text-color: var(--text-color);
  --skills-level-background: rgba(0, 0, 0, 0.5);
  --skills-level-color: orange;
}
```

Can be edited in a game's CSS file by overriding those variables in a more specific selector. For example:

```css
#app {
  --bg-color: white;
  --text-color: black;
}
```

would override the background and text colors of the game

## 0.9.1

- Fixed a file capitalisation error in 0.9.0

## 0.9.0

### Breaking Changes

New config options for skills:

- `icon`: Path to the image to use for the skill's icon (currently the skill widget is 200x300, but you can override the CSS if needed)
- `hidden`: Optional boolean to make the skill hidden until it is "obtained". A skill that is configured to be hidden will only start appearing in the skills menu once it's above level 0

Example skills config:

```json
  "skills": {
    "agility": {
      "name": "Agility",
      "description": "How good you are at moving around.",
      "startingLevel": 0,
      "icon": "img/skills/agility.jpg",
      "hidden": true
    },
    "logic": {
      "name": "Logic",
      "description": "How good you are at solving problems",
      "icon": "img/skills/logic.jpg",
      "startingLevel": 0
    }
  },
```

### Bug Fixes

- Music could play multiple times at once when replaying the same music

### New Features and improvements

#### Development and debug

- Improved debug menu with a **variable editor** to view and edit values in the `data` object.
- Also added a separate editor for the entire engine/app state. Can be useful for debugging complex bugs by exploring the state of the app.
- New **Quick label jump** feature to easily jump to specific labels for testing. Press **J** to open and type the name of a label then select a result with up/down arrows and press Enter
- New keyboard shortcut to open debug menu (**d**)
- Added a debug info panel on the main starting screen of the game with info on the shortcuts

#### Engine improvements

- Menu modal improved to be more compact with a cleaner design
- Added fade in and fade outs when changing music (configurable in config)
- **Improved the default UI** to be more pleasing to look at
- Added a **return to Main Menu** button to the main menu for resetting the game
- New **Skills Menu** allowing players to view their skills:
  - It only appears if the game has skills configured
  - It shows skill icons, name and current level on a grid
  - Clicking on a skill opens a skill page with more detailed info and the skill description
  - The skill menu button is next to the usual menu button

## 0.8.5

- Fixed a bug with `clear_dialog` that was disabling all interaction upon use

## 0.8.4

- Fixed many issues with save being broken (it didn't properly save the name of the last label the player was on, effectively restarting the game from scratch every time)
- Added new things to the save function so their state gets reloaded properly on game launch:
  - Current music now gets saved and restarts when reloading the game, if any is active
  - Stats (the ones in the HUD) now get saved
  - Current screen is also saved
- Removed many useless spammy `console.log` and added a `Logger` in the code so that most logs (outside of errors/important logs) will only appear in debug mode.

## 0.8.3

- Fixed bug where menu button would move up as more text gets added to the game

## 0.8.2

- Added css to hide scrollbars in the game UI
- Added a new Menu button with the options to quit and change volume
- Removed volume slider from the HUD and moved it to the new menu

## 0.8.1

- Fixed a bug in accessing values inside conditions caused by changed in 0.7.2

## 0.8.0

- Changed the `set` method to access things without caps (`data`, `skills`, `buttons` instead of `DATA`, `SKILLS`, `BUTTONS`) for consistency.
- Changed string interpolation to have more accessible objects, now values in `data` need to be accessed with `%{data.something}` instead of just `%{something}`
- Now possible to access skill levels in string interpolation with `%{skills.someSkill.level}`
- Improvements to how skill checks are printed to be less awkward

## 0.7.1

- Added `stop` and `pause` functions which work similarly to play for stopping or pausing audio.

## 0.6.5

- Audio and music options from the config now get passed to howler
- Renamed `path` to `src` in audio config (to be consistent with howler)

## 0.6.0

Added stats feature for tracking numbers and displaying them in the hud

Example config:

```
  "hudStats": {
    "money": {
      "icon": "img/ui/money.png",
      "name": "Money",
      "startingValue": 0,
      "minValue": 0
    },
    "energy": {
      "icon": "img/ui/energy.png",
      "name": "Energy",
      "startingValue": 10,
      "minValue": 0,
      "maxValue": 10
    }
  }
```

## 0.5.4

- Improved responsive layout and fixed some issues in it

New config keys required in the layout part of the config (to be documented):

```
  "layout": {
    "backgrounds": {
      "width": 880,
      "height": 720
    },
    "dialogBottomPadding": 70,
    "minTextWidth": 475,
    "mobileDialogHeightPercentage": 60,
    "verticalLayoutThreshold": 1000,
    "portraits": {
      "width": 100,
      "height": 100
    }
  },
```

## 0.4.0

Added responsive layout for mobile and small screens. Still in progress, but functionnal enough to be better than before so I'm releasing it.

## 0.3.4

- Improved string templating to work with deep nesting and also inside choice text

## 0.3.3

- Now detects indentation size and can support any indentation size

## 0.3.2

- Added a new `add_level` function for increasing the level of a skill. Example: `add_level someSkill 1` will increase the player's level in `someSkill` by 1
- Added a new `notify` function for displaying a notification toast that disappears after a few seconds (duration configurable in `config.json`). Example: `notify "Hello, this is a notification"`.

## 0.3.1

Added new config options for controlling how skill rolls are done and the display of their difficulty

## 0.3.0

Breaking changes around renaming data access from scripts

### New Add Command

New `add` command, works the same way as `set` but increments the value based on the existing value, ie. `set SKILLS.someSkill.level 2` will increment `someSkill.level` by 2.

### Skills

- Now possible to set the starting value of a skill (in the config)
- Now possible to edit a skill's value with `set SKILLS.someSkill.level 2` for example
- Skillcheck command renamed to roll (`if this.roll("someSkillCheck", "testSkill", 40);`)

### General

The `set` and `$if` command now refer to data in caps and have access to more data:

- `set SKILLS.someSkill.level [value]` Sets the value of a skill
- `set DATA.someData [value]` Sets a value in the data object (data is for any game-created variables)
- `$if this.SKILLCHECKS.someSkillCheck.passed` now available for checking if a skillcheck has already been passed

## 0.0.14

- Added the changelog (manually made for now)

## 0.0.13

- Added debug menu for jumping to labels (currently doesn't support production builds disabling it)
- Added saving and loading of the game (works by storing data, skills, skillchecks etc. When the game is reloaded, it is brought back at the last label visited)
- Fixed a bug where conditional choices would play the wrong result if a choice is removed due to a condition
- Made script loading and compilation happen during the initial loading, so everything is ready to play when pressing start game
- Skill checks now also save and load their data, so a failed check becomes impossible to choose, and a succeeded skill check can be skipped if shown again
