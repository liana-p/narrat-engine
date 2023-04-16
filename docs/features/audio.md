---
title: Narrat Audio Guide
description: This guide explains how to use the audio features of narrat to play sounds and musics
---

# Playing Audio

### Config

The `play` function plays audio, either music or sounds.

To use the `play` function, the game needs to have audio files loaded by adding them to the audio config file, usually located at `data/audio.yaml`:

```yaml
files:
  calm:
    loop: true
    src: music/music.mp3
  battle:
    loop: true
    src: music/battle.mp3
  click:
    src: audio/click.ogg
  game_start:
    volume: 0.9
    src: audio/game_start.ogg
  failure:
    src: audio/failure.ogg
options:
  volume: 0.5
  musicFadeInTime: 0.5
  musicFadeInDelay: 0.5
  musicFadeOutTime: 0.5
audioTriggers:
  onPlayerAnswered: click
  onPressStart: game_start
  onSkillCheckFailure: failure
```

The path of the audio configuration yaml can be changed in the base `config.yaml`:

```yaml
audio: data/audio.yaml
```

The audio engine used is [Howler](https://howlerjs.com). Options added in the config of an audio file will also be passed to Howler. Refer to the [Howler docs](https://github.com/goldfire/howler.js#global-options) for possible options.

### Playing music or sounds

Once there are audio files loaded in the engine, audio can be played with the `play` function at any time in the script:

`play music musicName`

Playing with mode `music` will replace stop and replace the current music to play a new one. There is only one music playing at a time

`play sound soundName`

Playing with the mode `sound` will just play a sound, no matter what else is already playing.

### Stopping and pausing

It is also possible to pause or stop sounds or music:

`stop music` (no need to specify the name because there is only one music playing

`stop sound soundName` (name must be specified)

`pause music` will pause the music.

It can later be resumed with `resume music` or with `play music musicName` (the play command requires the name of the music to play)

For example, one could do a dramatic pause of the music

```
play music suspense
wait 1500
pause music
play sound scary
wait 100
talk character idle "Suddenly, something happened!"
resume music # resume the music
```
