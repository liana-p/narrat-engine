# Talk

The `talk` function is the main function that lets characters speak. It can also be used in choice prompts.

Syntax: `talk [character] [pose] ["Text"] [delay] [autoadvance]`

- **character**: This is the id of the character (as defined in `characters.yaml`)
- **pose:** Refers to which sprite to use for the dialogue, as defined in the list of sprites in `characters.yaml` for this character. This allows you to have different expressions per character
- **text**: The actual line of dialogue to speak
- **delay [optional]**: Delay in miliseconds before the continue button appears or the next line of dialogue is spoken
- **autoadvance [optional, true|false]**: If true, the dialogue will automatically advance to the next line after the delay. If false (or not there), the continue button will appear after the delay

A shorthand for the narrator speaking (without any character sprite or name) is to just write a line of dialogue without the talk command (`"My line of dialogue"`).

## Example

```narrat
talk_example:
    talk cat idle "I'm talking to you!"
    "This is a shortcut for the narrator talking"
    talk player idle "The player can also talk"

```
