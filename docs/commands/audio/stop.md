---
description: The stop function stops audio playing
---

# Stop

## Stop Function

The `stop` function stops audio, either music or sounds.

See [playing audio](../../features/audio.md) for more info on how to setup the audio system

Syntax: `play [mode] [channel]`

::: warning
The `ambient` mode used to be called `ambiant`. This has been deprecated, and you should use `ambient` instead.
:::

- mode: `music, ambient,` or `sound`
- `channel:` The index of the channel to stop

## Example

```narrat
stop music
stop music 1
```
