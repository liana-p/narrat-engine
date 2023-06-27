# Play

## Play Function

The `play` function plays audio, either music or sounds.

See [playing audio](../../features/audio.md) for more info on how to setup the audio system

Syntax: `$play [mode] [audioName] [channel (optional)]`

- mode: `music` , `ambiant` or `sound`
- channel: A number indicating which channel to play audio on. Defaults to 0. Can be used to play multiple musics in parallel on the same mode

## Example

```narrat
play music musicName 0
```
