# Narrate command

The `narrate` command is used to let the "game" talk instead of a character. It is similar to the `talk` command, but takes no character or pose option.

It is also the command used when the shorthand `text` command syntax is used (when typing a string on a line directly with no command).

Syntax:

- `narrate "text" [delay] [autoadvance]`
- Or directly: `"text"` (delay/autoadance not possible with the shorthand syntax)

- **text**: The actual line of dialogue to speak
- **delay [optional]**: Delay in miliseconds before the continue button appears or the next line of dialogue is spoken
- **autoadvance [optional, true|false]**: If true, the dialogue will automatically advance to the next line after the delay. If false (or not there), the continue button will appear after the delay

## Example

```narrat
test_text_autoadvance:
  narrate "Hi!"
  narrate "with delay " 2000
  narrate "With delay and auto advance waiting for text to print" 200 true
  narrate "With delay and auto advance not waiting for text to print" 0 true
  narrate "This is a normal line"

```
