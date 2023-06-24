---
description: >-
  This documentation page explains how the syntax of the narrat scripting
  language works
---

# Language syntax and expressions

### Introduction

Since narrat 2.0.0, the scripting language is now a proper language with support for things like variables, recursive expressions, functions and branching.

A code line is an expression, and an expression is in the form `(operator [arg1] [arg2] etc)`.

### Indentation

::: details Indentation explanations

Levels of indentation in scripts are important as the indentation defines the branching depth of a line of code.

The first level of indentation is used to define labels like `main:`, then everything inside that label should be one level of indentation higher, until we get to the next label:

```
main:
  "Hello world" // This line is indented because it is inside the label main
  jump other_label

other_label: // We're back to first level of indentation to create another label
  "We're in the other label"
```

:::

### Labels

::: details Labels

All scripts in a game must be inside a label, which is a way of separating chunks of script content. The first label that automatically runs on game start is `main:`

A label is created with the syntax `[label_name]:`. All the code inside of it is part of that label.

Script can jump from label to label using the jump command.

Simple code example:

```
main:
  talk player idle "Hello world"
```

Here the command operator keyword is `talk`, so the engine will run the talk function and pass it the parameters afterwards which are `player` , `idle` , and "`hello world".`

:::

### Commands

All lines of script in narrat are commands. A command is created by typing the name of the command, followed with arguments separated by spaces. Commands are also effectively expressions, they simply don't have parenthesis around them to be easier to write.

Example:

```
main:
  talk player idle "Hello!" // This is the "talk" command
```

::: tip
There is a [cheatsheet of all available commands](../commands/all-commands.md) with usage examples.

### Expressions

An expression is any command between parenthesis. Any command in the game can be used as an expression, if it returns a value. For example `(+ 2 3)` is an expression that would get evaluated to `5`. (command `+` with arguments 2 and 3)

### Arguments

Commands take arguments as parameters. In narrat syntax, arguments are space-separated. There are 3 basic types of arguments:

- string: Can be written directly without quotes if it doesn't contain spaces, or with quotes for longer strings like sentences: `"Hello, this is a string"`
- number: Any number (`3)`
- boolean: `true` or `false`

Arguments can also be a variable value, in which case it needs to be written as `$variableName`. Example:

```
main:
  set data.day 3
  if (> $data.day 2):
    "We're at least on day 3"
```

In this example, we're using the expression `(> $data.day 2)` which is a comparison of whether the variable `data.day` is more than `2`. This comparison returns true because `data.day` is 3, so the `if` condition passes.

As proven by the code above, an argument can also be an expression itself. In this case the `if` function receives for its first argument the value `true`, because that's what the expression `> $data.day 2` returned.

### Functions

Labels can be used as functions. This allows any script to use the `run` command to run a label's code and then come back to where it was. Example:

```
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

In this example, we `run` the `takeout_menu` function, passing the value `Cake` for the `third_option` argument. This function uses that argument to add an option to its menu.

Once the player has chosen a meal, the `takeout_menu` function returnrs the choice. The main label creates a variable `meal` and stores the returned value to later display it.
