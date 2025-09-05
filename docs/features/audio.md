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

```narrat
play music suspense
wait 1500
pause music
play sound scary
wait 100
talk character idle "Suddenly, something happened!"
resume music # resume the music
```

## Title Screen Music

A music can play on the title screen, by adding the `defaultMusic` option in the audio config:

```yaml
files:
  music:
    loop: true
    src: music/music.mp3

options:
  defaultMusic: music
  volume: 0.5
  musicFadeInTime: 0.5
  musicFadeInDelay: 0.5
  musicFadeOutTime: 0.5
```

## Audio-specific fade timings

Individual audio files can have fade in/out and fade delays configured, which will override the default ones from the audio option when that specific audio plays:

```yaml
files:
  music:
    loop: true
    src: music/music.mp3
    fadeInTime: 2
    fadeOutTime: 2
    fadeInDelay: 2
```

## Audio triggers

Audio triggers allow specifying a sound effect in the config that will be played when a specific event happens. There are a few audio triggers available in narrat.

Simply add the ones you want to use to the config. For example:

```yaml
files:
  click:
    src: audio/click.ogg
  game_start:
    volume: 0.9
    src: audio/game_start.ogg
  failure:
    src: audio/failure.ogg
  success:
    src: audio/success.wav

audioTriggers:
  onPlayerAnswered: "click",
  onPlayerAnsweredTextField: failure
  onPlayerAnsweredDefault: click
  onPlayerAnsweredChoice: failure
  onPressStart: "game_start",
  onSkillCheckFailure: "failure",
  onSkillCheckSuccess: "success"
  onButtonClicked: click
  onSpriteClicked: click
  onItemUsed: click
```

Note that onPlayerAnswered is triggered anytime the player continues the games dialouge, wheras Default, Choice and TextField will only tigger when their specific 'continue' is called.

## Audio Volume mixing

All volumes are between 0 and 1.

The volume a specific audio file is playing at is calculated by multiplying the following volumes together:

- Master Volume (The one in `options.volume` in the audio config file, which players can also edit in the system menu)
- Channel Volume (Starts at 1, players can edit them in the system menu)
- Audio file volume: The volume specified in the audio config file for that specific audio file, if it exists. Otherwise it's 1.

So for example:

If I set master volume to 1, and music volume has been set to 0.5, and a specific sound effect has its volume set at 0.5, then the sound effect will play at 0.25 volume.

## Characters speak audio <Badge type="tip" text="^3.8.0" />

Narrat can play sounds when characters speak. There are two possible ways:

- Playing a specific sound when a new line of dialogue starts
- Playing a sound fo each letter when text is animating

Those sounds can be setup for all characters, and/or customised per character.

In `audio.yaml`, the `dialogAudio` contains the options for this. For example:

```yaml
dialogAudio:
  defaultAudio:
    soundOnNewLine: click
  characterAudio:
    helper:
      soundPerLetter:
        prefix: letter-
```

`defaultAudio` [optional]: Contains the default dialogAudio options to apply for all characters.

- `characterAudio` [optional]: Same options as `defaultAudio`, but for a specific character. If a character has a `characterAudio` defined, it will override the `defaultAudio` options when that character speaks.

The options inside a dialog audio config are as follows:

- `soundOnNewLine` [optional]: The name of a sound to play when a new line of dialogue starts. If not specified, no sound will play.
- `soundPerLetter` [optional]: Configuration to play different sounds for each letter as the dialog animates, animal crossing style.

the `soundPerLetter` option serves to create a sound name based on the letter appearing on screen. It takes an optional prefix and/or suffix and adds them to the letter about to be printed. For example, if the config is as follows:

```yaml
dialogAudio:
  defaultAudio:
    soundPerLetter:
      prefix: letter-
      suffix: -sound
      volume: 0.5
```

If a character is speaking and the letter "c" is about to appear on screen, then the game will try to play the audio named `"letter-c-sound"`, with the volume multiplied by 0.5.

The letter sounds need to be defined as normal sounds in the audio config file. For example:

```yaml
files:
  letter-a:
    src: audio/letter-1.wav
  letter-b:
    src: audio/letter-2.wav
  letter-c:
    src: audio/letter-3.wav
  letter-d:
    src: audio/letter-4.wav
  letter-e:
    src: audio/letter-5.wav
  letter-f:
    src: audio/letter-6.wav
  letter-g:
    src: audio/letter-7.wav
  letter-h:
    src: audio/letter-1.wav
  letter-i:
    src: audio/letter-2.wav
  letter-j:
    src: audio/letter-3.wav
  letter-k:
    src: audio/letter-4.wav
  letter-l:
    src: audio/letter-5.wav
  letter-m:
    src: audio/letter-6.wav
  letter-n:
    src: audio/letter-7.wav
  letter-o:
    src: audio/letter-1.wav
  letter-p:
    src: audio/letter-2.wav
  letter-q:
    src: audio/letter-3.wav
  letter-r:
    src: audio/letter-4.wav
  letter-s:
    src: audio/letter-5.wav
  letter-t:
    src: audio/letter-6.wav
  letter-u:
    src: audio/letter-7.wav
  letter-v:
    src: audio/letter-1.wav
  letter-w:
    src: audio/letter-2.wav
  letter-x:
    src: audio/letter-3.wav
  letter-y:
    src: audio/letter-4.wav
  letter-z:
    src: audio/letter-5.wav

options:
  volume: 0.5
  musicFadeInTime: 0.5
  musicFadeInDelay: 0.5
  musicFadeOutTime: 0.5

audioTriggers: {}

dialogAudio:
  defaultAudio:
    soundPerLetter:
      prefix: letter-
```

The letter sounds used in narrat for testing this feature can be found in the [examples asset folder](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/assets/audio) and have been generated with [jsfxr](https://sfxr.me/). Feel free to use them in your own games or as placeholders.
