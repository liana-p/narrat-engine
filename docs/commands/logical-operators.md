# Logical Operators

In narrat, everything is a command, including logical operators. There are commands for the following operators.

They are used by using the keyword of the operator (the command) followed by its parameters, like any other command in narrat

- `==`, `<`, `>`, `<=`, `>=`, `!=` - Example: `(< 2 3)`
- `&&`, `||` - Example: `if (&& $player.alive (> $player.score 100))`
- ! Negates a value. Example: `if (! false)` <-- will be true
- `?`: Ternary operation. Syntax: `? [condition] [valueIfTrue] [valueIfFalse]`

Example:

```narrat
main:
  set player.score 100
  set player.alive true
  set player.gender F
  set player.pronoun (run get_pronoun)
  if (&& $player.alive (>= $player.score):
    "%{player.pronoun} won"
  else:
    "%{player.pronoun} lost"


get_pronoun:
  return (? (== $player.gender F) "She" "He")
```
