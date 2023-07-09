---
title: What can Narrat do, and what is Narrat for?
description: Some conrtext and warnings about the philosophy of narrat and its limitations
---

# {{ $frontmatter.title }}

::: info
You may be used to game engines like Unity or Godot, which are general purpose game engines. Narrat is a domain-specific game engine, and the Narrat scripting language is also a [Domain-specific language](https://en.wikipedia.org/wiki/Domain-specific_language)
:::

Narrat is designed for one specific purpose: **to create narrative games.**

[[toc]]

## Introduction

Narrat is made to give you out of the box a functioning narrative game, with common features, and a scripting language that makes it easy to write branching dialogue for beginners without requiring programming.

It makes it easy and approachable to create games that it's made for, but it might not be the best tool for other types of games.

## What Narrat can do

As a project, initially Narrat was inspired by the general layout and systems of games like Disco Elysium. That is, narrative games with TTRPG mechanics (like skills and skill checks) added on top. Its basic layout is also inspired by it, having a scrolling dialogue panel that reads more like a page of text than a typical message box based visual novel (like ren'py games would do).

Here's a general list of things Narrat can do:

- All the features listed in the website are available for use and require no additional coding
- Those features are customisable within reason via yaml settings files
- The scripting language allows relatively powerful logic to control more complex aspects of your game's behaviour
- The settings for all the features include lots of options and try to account for many different use cases
- The UI can be customised with CSS. This allows you to change the style of the game easily, but it won't make you able to drastically change the layout or content of the various UI elements.
- The dialogue panel can be configured to be displayed in any shape or place, allowing different styles of presentation for games
- Similarly, the viewport with visual screens can be configured for any resolution, and the button system within it allows building of simple UI elements in the viewport
- There is a "sprites" system to handle letting script arbitrary create text and images dynamically on screen, which can allow building custom UIs or features by dynamically displaying your own things in the viewport
- The [plugin API](https://docs.narrat.dev/scripting/plugins.html) is pretty powerful and can add new UI elements, new features, new commands to the language, etc. But it requires being able to actually code (in TypeScript/JavaScript, creating new UI with vue.js)

## What Narrat _can't_ do

Because Narrat handles all the features for you and lets you script dialogue in .narrat files, as a user of narrat you can't easily add new features to the engine. While in a typical game engine you'd write code for every feature, in narrat the engine is made for you to not need to code, but it also limits you to its feature set.

The trade off here is between the ease of making games versus the flexibility. If you use a traditional engine, you'll have to build every feature from scratch but have more power to control them. On a very specific engine like narrat, you are given a lot of features out of the box, but those features are limited to what is implemented in the engine, and what level of customisation has been added.

That said, here are examples of things Narrat can't really do, or can't do easily:

### "Action" real-time, or games with complex graphics

Narrat is mostly meant to handle static things. The scripting language is built to be asynchronous by default (it waits between every line of text for you to do things for example). It doesn't have a game loop, and it would hit performance problems if you tried to control too many sprites. There are options to integrate narrat with more typical 2D code, like how the [Narrat 2D](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat-2d) plugin shows, or a past integration with Bitsy for example, but they are experimental for the moment and will require you to dig into technical details.

In the future, there might be integrations for Narrat to be able to use other popular 2D game engines in the viewport to combine the ease of writing narrat script with the power of a general purpose game engine. There is a [forum thread](https://narrat.discourse.group/t/which-2d-engine-should-narrat-have-an-integration-for/61/5) collecting suggestions on which engines people would like to use within narrat.

### Adding new features

If you're willing to write plugins you can do a lot of things. For example, every command in the engine is a "plugin". Even that will be limited to some extent though. For example, at the moment there is no good way to override existing UI files to completely change the layout of existing features. There are ideas on how to do that with Vue's features though, and someone experienced in it could figure it out.

Without touching plugins, you won't be able to add completely new features with new UI. You can use scripting to create a lot of new mechanics using existing features, especially with clever tricks, but narrat scripts and yaml files alone won't be able to give you a brand new UI window that handles completely new data the engine doesn't know about

Generally, what options you get in the settings files reflects what the engine can do. The rest is up to you to figure out clever hacks within the engine, using the scripting system to handle your own features, writing plugins, or [asking for help in the forum](https://narrat.discourse.group/c/help/5)

### Narrat script is not a general programming language

Narrat script has been built specifically for narrat and its feature set. Over time, it got more and more complex and now has a lot of features traditional programming languages have, allowing you to use very complex logic in scripts if you need to.

But it's still a scripting language very tied to Narrat. For example, it doesn't have fast performance because it's created to be asynchronous and handle a lot of "magic" behind the scenes. The engine "waits" after every line of script for things to happen, and lines of script that change data will also magically make the UI update. This makes it very easy and powerful to write the flow of your game in, but would be a bad choice for real-time logic as it's not meant to be fast.

## Narrat can be improved easily

Within reason, when people need a new features, and if that feature can be implemented in a way that many games could reuse, it will usually be implemented eventually.

If you want to do something new that the engine can't do, feel free to [propose it in the forums](https://narrat.discourse.group/c/engine-dev/7). I can usually add new features pretty quick.

You can also help add new features! [Narrat is open source](https://github.com/liana-p/narrat-engine) and if you're willing to dig in the code, you can add new features easily and [contribute to the engine](https://github.com/liana-p/narrat-engine/blob/main/CONTRIBUTING.md). The way narrat is made makes it usually easy and quick to add new features, or options to existing features, if you're willing to dig into the code of the engine.

Good starting places for people interested would be:

- The [data stores folder](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/src/stores) where the core data and logic and most features are
- The [config folder](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/src/config) where config files and their options are defined
- The [commands folder](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/src/vm/commands) where engine commands are.

Or make your own fork of narrat for your own game and completely customise narrat if you feel like it (but you'll have to maintain it yourself if you do that).

The plugin information in the section below may also contain useful info about Narrat's code.

## More on plugins

If you are interested in [making your own plugins](https://docs.narrat.dev/scripting/plugins.html), you will likely need a basic understanding of how to edit [TypeScript](https://www.typescriptlang.org/) code and [VueJS](https://vuejs.org/) (our UI framework). TypeScript is just fancier JavaScript with types, and you can also use JavaScript files in your projects if you don't want to use TypeScript. You might also want to know that the data stores in the engine use [pinia](https://pinia.vuejs.org/) for state management.

Relevant links if you want to look into plugins would be [this recent forum post](https://narrat.discourse.group/t/extra-menu-page/68/2?u=liana) where I described the most common features of plugins and how they can help add new features, and this simple [counter plugin example](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat-plugin-counter).

There is also the more complex [Narrat 2D](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat-2d) plugin which is not released but about 90% finished, and can be an example of much more complex and deeper integration of a plugin within the engine.

Finally there is a [Narrat Bitsy](https://github.com/liana-p/narrat-bitsy) plugin I wrote more than a year ago. I suspect it doesn't work anymore as I haven't looked at it recently, but some of its code may still be a valuable example of how to integrate a plugin with another engine.
