---
description: 'This documentation page explains how the syntax of the narrat scripting
language works'
---

# Narrat Language syntax and expressions

[[toc]]

## Introduction

The `Narrat` language is a **scripting language created for narrat, with the goal of making it easy to write branching dialogue for your games**, while also being powerful enough to create complex games.

The following sections will explain the core principles and features of narrat scripting, so you can understand what's going on when editing narrat scripts.

## How a narrat script works

- Narrat scripts are separared in labels
- Each label contains a chunk of narrat script that the engine can run
- When running scripts, the engine runs each line in the current label in order, until it reaches the end
- The first label the game starts at is `main:` and always needs to be present
- The `jump` command allows the game to move to other labels, while the `run` command allows to run them as functions, and return to the previous label when finished
- You create the narrative of your game by writing dialogue in your narrat scripts, starting with the contents of `main:`

## Labels

**All narrat code in a game must be inside a label**, which is a way of separating chunks of script content. The first label that automatically runs on game start is `main:`. If you open a narrat script, you can see that it's made of a series of labels with code inside them.

::: details Labels
A label is created with the syntax `[label_name]:`. All the code inside of it is part of that label.

Script can jump from label to label using the jump command.

Simple code example:

```narrat
main:
  talk player idle "Hello world"
  jump other_label

other_label:
  talk player idle "We've jumped to another label!"
```

Here the command operator keyword is `talk`, so the engine will run the talk function and pass it the parameters afterwards which are `player` , `idle` , and "`hello world".`
:::

## Code lines

**Each code line in narrat is an instruction that uses a command** (outside of the lines that declare labels as above). The command ends at the end of the line.

A code line is an expression, and an expression is in the form `command [option 1] [option 2] [etc]`. where the first element is the name of the command to use, and the rest are options to pass to the command. There can be any number of options (or none).

**The narrat engine will run your narrat script, playing each code line in order** (starting from what's inside the label `main`) until it runs out of things to do (at which point the dialogue panel will close).

## Indentation

**Levels of indentation in narrat scripts are important** as the indentation defines the branching depth of a line of code.

If you need an explanation on what indentation is, please refer to [this guide](https://www.w3schools.com/python/gloss_python_indentation.asp). It is made for Python but the same idea applies to Narrat.

Your text editor (VS Code) should auto indent for you most of the time, and you can also press "Tab" to add a level of indentation to a line of code.

::: details Indentation

The first level of indentation is used to define labels like `main:`, then everything inside that label should be one level of indentation higher, until we get to the next label:

```narrat
main:
  "Hello world" // This line is indented because it is inside the label main
  jump other_label

other_label: // We're back to first level of indentation to create another label
  "We're in the other label"
```

:::

::: warning
Indentation needs to be respected and be consistent, because it's how the scripting system knows what code is inside what label or branch.

For example if you've started indenting code with 2 spaces, you need to keep doing that for the rest of the script. If you start indenting with 4 spaces, you need to keep doing that for the rest of the script.
:::

## Multiline code

If you want to split a line of code into multiple lines for readability, you can do so by adding a backslash `\` at the end of the line. This tells the engine that the code continues on the next line. It also works with strings. Example:

```narrat
main:
  talk player idle "This is a very long string that \
  I want to split into multiple lines for readability"
  var text (concat \
    "I am concatenating multiple lines of text " \
    "together to make a longer string" \
  )
```

## Commands

All lines of script in narrat are commands. A command is created by typing the name of the command, followed with arguments separated by spaces. Commands are also effectively expressions, they simply don't have parenthesis around them to be easier to write.

Example:

```narrat
main:
  talk player idle "Hello!" // This is the "talk" command
```

::: tip
There is a [cheatsheet of all available commands](../commands/all-commands.md) with usage examples.
:::

## Expressions

An expression is any command between parenthesis. Any command in the game can be used as an expression, if it returns a value. For example `(+ 2 3)` is an expression that would get evaluated to `5`. (command `+` with arguments 2 and 3)

## Arguments

Commands take arguments as parameters. In narrat syntax, arguments are space-separated. There are 3 basic types of arguments:

- string: Can be written directly without quotes if it doesn't contain spaces, or with quotes for longer strings like sentences: `"Hello, this is a string"`
- number: Any number: `3`
- boolean: `true` or `false`
- expression: an expression which returns a value, like `(+ 2 3)` which returns `5`
- variable: A variable, like `$data.day`.

Arguments can also be a variable value, in which case it needs to be written as `$variableName`. Example:

```narrat
main:
  set data.day 3
  if (> $data.day 2):
    "We're at least on day 3"
```

In this example, we're using the expression `(> $data.day 2)` which is a comparison of whether the variable `data.day` is more than `2`. This comparison returns true because `data.day` is 3, so the `if` condition passes.

As proven by the code above, an argument can also be an expression itself. In this case the `if` function receives for its first argument the value `true`, because that's what the expression `> $data.day 2` returned.

## Variables

Variables can be set with the `set` function, and can then be used in expressions.

::: tip
Global variables should by convention be put in the `data` object, like `data.day` or `data.playerName`.
:::

Example:

```narrat
main:
  set data.day 3
  talk player idle "It's day %{$data.day}"
```

::: warning
When using the `set` function, we write the variable name without the `$` symbol, because we're passing the `path` of the variable to the `set` function.

When you want to get the `value` of a variable, add a `$` symbol before the variable name, like `$data.day`.
:::

::: danger
Do not use the word `global` as a key in your normal data, as it will conflict with the global save data object. For example if you do `set data.global 5`, it will break the global save data functionality. Instead use another name like `data.meta` or `data.game`. This is also true of all the other keywords mentioned here, avoid using them in your own variable names.
:::

## Local variables

It is also possible to create local variables, which only exist inside the current function scope (the current label). Those variables will disappear once the label is finished

To create a local variable, use the `var` function. Example:

```narrat
main:
  set data.player.name (run ask_player_name) // We get the playerName value from the ask_player_name function

ask_player_name:
  var playerName (text_field "What's your name?") // This variable will stop existing at the end of the function
  return $playerName // We return the value of the variable as a result
```

## Functions

Labels can be used as functions. This allows any script to use the `run` command to run a label's code and then come back to where it was. Example:

```narrat
main:
  set data.counter 0
  run print_counter // Will print "Counter is 0"
  run increase_counter
  run print_counter // Will print "Counter is 1"


print_counter:
  "Counter is %{counter}"

increase_counter:
  add data.counter 1
```

Functions can also receive arguments and return values. The arguments they receive are defined by adding their names after the label name when creating the label.

Example:

```narrat
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

In this example, we `run` the `takeout_menu` function, passing the value `Cake` for the `third_option` argument. This function uses that argument to add an option to its menu.

Once the player has chosen a meal, the `takeout_menu` function returnrs the choice. The main label creates a variable `meal` and stores the returned value to later display it.

## Objects

Narrat scripting supports objects in a transparent way. Objects are automatically created when you created nested properties. For example:

```narrat
main:
  set data.player.name "Alice"
  set data.player.age 25
  "The player's name is %{data.player.name} and they are %{data.player.age} years old"
```

This script created a `player` object which contains the following:

```json
{
  "name": "Alice",
  "age": 25
}
```

### Dynamic indexing

Object keys can be dynamically accessed via variables, which can be useful if you have dynamic content.

The syntax is: `$objectName[$key]`, where `key` is a variable you're using to access the object's property.

For example, imagine we want to load data about various player classes. Let's start with a config file:

```yaml
warrior:
  hp: 100
rogue:
  hp: 50
mage:
  hp: 25
```

Then in narrat:

```narrat
main:
  set data.classes (load_data data/classes.yaml) // the file above
  choice:
  "Choose your class":
    "Warrior":
      set data.player.class warrior
    "Rogue":
      set data.player.class rogue
    "Mage":
      set data.player.class mage

show_player_stats:
  var classInfo $data.classes[$data.player.class] // We're dynamically accessing the class info based on the value of data.player.class
  "You are a %{$data.player.class} with %{$classInfo.hp} HP"
```

### Empty object

Empty objects can be created with the command `new Object`:

```
main:
  set data.player (new Object)
```

## Arrays

Arrays are possible in narrat and can be created with `new Array`, or loaded from a yaml file with the `load_data` command, like with objects above.

Here's an example of an array of strings:

```narrat
main:
  set data.player.inventory (new Array)
  push $data.player.inventory "Sword"
  push $data.player.inventory "Shield"
  push $data.player.inventory "Potion"
  var array_contents (array_join $data.player.inventory)
  "Your inventory contains  %{array_contents}"
```

Or, you can initialise an array directly with properties:

```narrat
main:
  set data.player.inventory (new Array "Sword" "Shield" "Potion")
  var array_contents (array_join $data.player.inventory)
  "Your inventory contains  %{array_contents}"
```

### Dynamic indexing

Similarly to with objects, arrays can be dynamically indexed with variables:

```narrat

main:
  set data.player.inventory (new Array "Sword" "Shield" "Potion")

print_every_item inventory:
  run print_inventory 0


print_inventory_item index:
  var item $data.player.inventory[$index]
  "You have a %{item}"
  add index 1
  if (< $index $data.player.inventory.length):
    run print_inventory $index
```

The script above goes through every item in the inventory one by one and prints them.

### Array commands

There are various available commands for arrays, see them [in the commands reference](../commands/all-commands.md#arrays).

::: tip
Those array commands are generally based on javascript array functions, and use the same API
:::

## Advanced information on The `data` object and others

This section explains more detailed info on how the variable state functions and how the different objects you can access work. It can help do more advanced things, or explain complex situations if you need to debug very specific behaviour with variables.

As seen above, when setting variables they are set in the `data` object. This is the place where all your game-specific variables should generally be stored. There are other objects you can access when setting and reading variables.

When you read or set a variable, narrat will do the following:

1. If the key you're trying to set exists in the current scope, use that. (for example if you've created `var health 1` and later do `set health 5`, it will set the local scope variable `health` to 5). See the next section for what local variables and scopes are.
2. If the key you're trying to access/set exists in `data`, use that. For example if `set data.health 1` exists, then doing `set health 5` will set `data.health` to 5.
3. Otherwise, the engine will try to find the variable you're trying to access/set in the state object provided to the scripting. This object contains:

- `data`
- `global`: Variables stored here will be saved globally (across all save slots). Useful for tracking metagame data, new game+ features, etc. Example: `add global.playthroughs 1`.
- `config`: The contents of the game's config (a combined object containing all the config files). It is technically possible to modify config values at runtime with this, though you will need to make sure changes to this get re-applied when the game reloads a save, if your game uses saving.
- And other more advanced values.

So for example you can do `set data.playerName "Alice"` to set a variable in the `data` object, or `set global.playthroughs 1` to set a variable in the `global` object.

::: tip
The code that creates the state object for narrat to access variable is in [`src/utils/data-helpers.ts`](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/utils/data-helpers.ts#L222) if you want to see how it works.
:::

There are more objects accessible, though they are more advanced use cases and you can easily break things so be careful if you manipulate them manually. In a lot of cases you could try to do a `log` of them to see what they contain and understand how they work / if they contain any data you need.

You technically can modify those objects directly, though it is not advised.

- `skills`: Accesses the state of skills.
- `skillChecks`: Accesses the state of skill checks.
- `buttons`: Accesses the state of buttons.
- `items`: Accesses the state of items.
- `quests`: Accesses the state of quests.
- `stats`: Accesses the state of HUD stats.
- `gameOptions`: The options passed to the narrat engine when starting the game.
- `baseSettings`: Settings (as in player-facing settings) built in narrat
- `customSettings`: Custom settings defined in the config file

For example, running a label with a log of all of those will output the following:

```narrat
test_state:
  log "Base settings: " $baseSettings
  log "Buttons: " $buttons
  log "Config: " $config
  log "Custom settings: " $customSettings
  log "Items: " $items
  log "Game options: " $gameOptions
  log "Quests: " $quests
  log "Skill checks: " $skillChecks
  log "Skills: " $skills
  log "Stats: " $stats
```

Click on the logged objects (and then click on the target object for technical reasons) to inspect and explore what it contains.

![Log state result screenshot](/scripting/language-syntax/log-state.webp)
