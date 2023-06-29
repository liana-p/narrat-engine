# Set

## Set Function

The set function allows you to create variables that will be kept (and saved), which can later be used in conditions.

It takes two parameters:

- **path**: The path where you want to save your value. It can be a deep path and will automatically generate nested objects. For example: `data.level_1.ending`
- **value**: The value you want to assign to the variable. For example: `"good_ending"`

### Example

In this example, we ask the player a question, store the answer in a variable, and then use that variable in a condition to play a line of dialogue only for players who like surprises

```narrat
set_example:
    choice:
        talk cat idle "Do you like surprises?"
        "Yes":
            set data.like_surprises true
        "No!":
            set data.like_surprises false
    $if this.data.like_surprises:
        talk cat idle "Since you like surprises, here's a surprise message"

```
