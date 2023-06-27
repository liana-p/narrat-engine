# Talk

The `talk` function is the main function that lets characters speak. It can also be used in choice prompts.

Syntax: `talk [character] [pose] ["Text"]`

- **character**: This is the id of the character (as defined in `characters.yaml`)
- **pose:** Refers to which sprite to use for the dialogue, as defined in the list of sprites in `characters.yaml` for this character. This allows you to have different expressions per character
- **text**: The actual line of dialogue to speak

A shorthand for the narrator speaking (without any character sprite or name) is to just write a line of dialogue without the talk command (`"My line of dialogue"`

## Example

```narrat
talk_example:
    talk cat idle "I'm talking to you!"
    "This is a shortcut for the narrator talking"
    talk player idle "The player can also talk"

```

<!-- ![Talk example result](../../.gitbook/assets/talk_example.gif) -->
