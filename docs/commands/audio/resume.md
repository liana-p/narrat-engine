# Resume

## Resume Function

The `resume` function resumes an audio channel

See [playing audio](../../features/audio.md) for more info on how to setup the audio system

Syntax: `$play [mode] [channel (optional)]`

- mode: `music` , `ambiant` or `sound`
- channel: A number indicating which channel to resume. Defaults to 0. Can be used to play multiple musics in parallel on the same mode

## Example

```narrat
play music musicName
wait 3000
pause music
wait 200
resume music
```
