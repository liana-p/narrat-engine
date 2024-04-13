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

test_text_autoadvance:
  narrate "Hi!"
  narrate "with delay " 2000
  narrate "With delay and auto advance waiting for text to print" 200 true
  narrate "With delay and auto advance not waiting for text to print" 0 true
  narrate "This is a normal line"

  talk player idle "Hello!"
  talk player idle "This will auto advance" 1 true
  talk player idle "This will not auto advance but has a delay" 2000 false
  talk player idle "this is a normal line"

test_multiline:
  talk player idle "This is a very long string that \
  I want to split into multiple lines for readability"
  var text (concat \
    "I am concatenating multiple lines of text " \
    "together to make a longer string" \
  )
  talk player idle $text
```
