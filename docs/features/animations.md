---
title: Animations in Narrat
description: Narrat has a powerful animations feature which lets you animate any element on screen using CSS animations.
---

# {{ $frontmatter.title }}

Narrat animations leverage the versatility of [CSS animations](https://www.w3schools.com/css/css3_animations.asp) to let you animate any element on screen.

Animations can be defined in the `animations.yaml` file, and then used in scripts with the `animate` command.

## Example

<video controls="controls" src="./animations/animations-demo.mp4" type="video/mp4" autoplay="true"></video>

### Code for the example above:

**config.yaml**

```yaml
animations: data/animations.yaml
```

**animations.yaml**

```yaml
animations:
  rotate:
    keyframes: rotate
    options:
      duration: 1000
      iterations: 1
  long-screenshake:
    # narrat-screenshake is a built-in animation that already comes with narrat
    keyframes: narrat-screenshake
    options:
      # Here we're taking the built-in screenshake but using it with different options
      duration: 150
      iterations: 5

keyframes:
  rotate:
    - transform: rotate(0deg)
    - transform: rotate(360deg)
```

**animations.narrat**

```narrat
test_animations:
  choice:
    "Animation test"
    "Screenshake":
      run test_screenshake
    "Rotate":
      run test_rotate
    "Long screenshake":
      run long_screenshake
  jump test_animations

test_screenshake:
  animate #narrat-app narrat-screenshake

long_screenshake:
  animate .dialog long-screenshake 150 20
test_rotate:
  animate_wait .dialog rotate
```

## How it works

Animations in narrat use the [animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) browser function. This function is an API to control [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) via code.

Narrat will find the relevant element via the DOM selector you provide, then find the animation data from config files, and finally call the `animate` function with the relevant parameters.

## How to use the `animate` command

The format for the `animate` command in narrat is the following:

`animate [DOM selector] [animation name] [duration (optional)] [iterations (optional)]`

- `DOM selector`: A CSS selector to select the element to animate. If you want to animate the whole game screen, you can use `#narrat-app` as the selector for example. Use `#my-id` to get an element by its id, or `.my-class` to get an element by its class. With this you should be able to get most things on screen easily
- `animation name`: The name of the animation to use. This is the name of the animation as defined in the animations list of your `animations.yaml` file. If an animation doesn't exist, it can fall back to default built-in animations
- `duration`: The duration of the animation in milliseconds. This is optional and will default to the duration defined in the animation config
- `iterations`: The number of times the animation should repeat. This is optional and will default to the number of iterations defined in the animation config (note: to specify this option, you have to also specify duration)

::: tip
There is an `animate_wait` command, which works exactly the same but will wait until the animation is over. By default, `animate` will play the animation in background and continue the script immediately.
:::

## Animation config

Animations are defined in the `animations.yaml` file. The format is the following:

```yaml
animations:
  [animation name]:
    keyframes: [keyframes name OR keyframes object] # If it's a string, it will pick keyframes from the keyframes list. If it's an object, it will use the object directly
    options: [animation options]
keyframes:
  [keyframes name]: # This is an array of keyframes
    - [keyframe object] # Those are individual steps of the animation. See the mozilla animation docs for examples
    - [keyframe object]
    - [keyframe object]
```

- `animation options`: Options when playing the animation. Can include things like `duration` (in ms) and `iterations` (number of times the animation is played). See list of animation options [there](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#options)
- `keyframe object`: An object defining one key frame of the animation. The keyframes array is a list of them, and they get played in order as the animation progresses. Keyframes have keys that are CSS properties and their values, like when using css transitions. They can also have an `offset` property to specify when in the animation they should be played. See [mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) for examples

## Built-in animations

At time of writing there is only the `narrat-screenshake` animation. This is a simple animation that just shakes an element for a bit.

## Code for more info:

- [utils/animations.ts](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/utils/animations.ts): File where the animation code is and where the default built-in animations are defined.
- [config/animations-config.ts](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/config/animations-config.ts): File definine the shape of the animations config and their options

## Relevant external documentation

- [Mozilla MDN page on animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate): Explains how the animation API works with some example
- [Keyframe formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats): Explains how to define keyframes
- [Keyframe options](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#options) list of available keyframe options
