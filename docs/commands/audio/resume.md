# Resume

## Resume Function

The `resume` function resumes an audio channel

See [playing audio](../../features/audio.md) for more info on how to setup the audio system

Syntax: `$play [mode] [channel (optional)]`

::: warning
The `ambient` mode used to be called `ambiant`. This has been deprecated, and you should use `ambient` instead.
:::

- mode: `music` , `ambient` or `sound`
- channel: A number indicating which channel to resume. Defaults to 0. Can be used to play multiple musics in parallel on the same mode

## Example

```narrat
play music musicName
wait 3000
pause music
wait 200
resume music
```
