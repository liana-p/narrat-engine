# Branching dialogue and choices

## Branching dialogue and choices

Narrat is built around branching dialogue and choices. You can use conditions in your script to play different dialogue depending on what's happening, and players can also make choices.

## Choice Function

The choice function is what allows players to make decisions. For example:

```narrat
choice_example:
  choice:
    talk helper idle "What do you want to eat?"
    "I want a burger":
      talk helper idle "Here's your burger"
    "I want a pizza":
        talk helper idle "Here's your pizza"
```

More about the choice function [there](../commands/choice-function.md).

## Conditions

Conditions are used to control whether a line of dialogue should be played or not. The most common way to do conditions is to use the `if` command. For example:

```narrat
condition_example:
  set data.player.evil true
  if $data.player.evil:
    talk shopkeeper idle "Get away from me you monster!"
  else:
    talk shopkeeper idle "Hello, would you like to buy a potion?"
```

More about conditions [there](../commands/if-function.md).
