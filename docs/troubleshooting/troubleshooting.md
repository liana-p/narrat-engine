---
title: Troubleshooting
description: This page describes troubleshooting steps for narrat issues
---

# How to debug errors

Most errors on startup come from the script compiler, which usually means there is a syntax error in your script. The error box will usually tell you what the error is, but sometimes unexpected errors can happen which don't have a helpful error message. This is where more advanced troubleshooting is needed.

## Opening the browser developer toold

If you right click on the page and click "inspect" (on Chrome or Firefox), it will open the dev console. The usual shortcut for that is ctrl+shift+J.

![dev console](./dev-console.png)

### The console

The `console` part of the devtools is where errors will appear. It can help find hints about issues. If the errors you find are obscure javascript error and don't help you, you can try asking for help in the narrat discord, preferably with screenshots or copy paste of all error messages you found.

## Check which version of narrat is running

Near the top of the logs in the browser console should be a log indicating which specific version of narrat is running and when it was built.

Make sure this is the version you're expecting, and if you ask for help please include this information.

![narrat version screenshot](./version.png)

### The network tab

Sometimes errors can be caused by a file not loading (a typo in a path for example). Looking in the network tab of the dev tools (you might have to click reload) can help see if any assets are failing to load.

## Errors when building or launching the game

f you get errors in the actual terminal when building the game, it means something is probably wrong with your local setup, and you should ask about those errors on the narrat discord (link on the [website](https://get-narrat.com/))

## Game not launching or missing images after creating a build with electron

The most common cause for this is having paths in the CSS that don't start with `/`. For example it should be `background-image: url("/img/image.png")` and not `background-image: url("img/image.png")`.

## My index.html file doesn't work!

You can't open the `index.html` file created by a build directly, it needs to be hosted on a server. This is because the game loads various files (images and narrat scripts for example), and [browser security policies](http://kb.mozillazine.org/Links_to_local_pages_do_not_work) don't allow web pages to load files directly from your hard drive. You can use a local server to host the game, or upload it to a web server (for example it will work when releasing a game to itch.io).

If you want an easy way to launch a local web server to test your built html game, simply go in the `dist` folder where your built game is in the terminal, and run the command `npx http-server`. This will install and run a lightweight server that lets you access your game.

## Using `+`, `&&` and things like that isn't working properly

Most likely issue is that you're trying to use operators like in most common programming languages (for example `if (something && somethingElse)`). But the in the narrat scripting language everything is a command, including operators. This means that the previous example should actually be `if (&& something somethingElse)`. Or for example `set data.sum (+ 1 (* 2 2))` which in this case would result in 5 (1 + 2 \* 2). Support for operators syntax might be added in the future, but for now you have to use the command syntax as the scripting language is similar to a [lisp language](https://www.tutorialspoint.com/lisp/lisp_operators.htm).

## My electron build isn't updating properly

Remember that the game needs to be built before running on electron by running `npm run build`. The `npm run electron` command only starts electron, but doesn't build your game.

You can use `npm run desktop` as a shortcut command to first build your game and then open electron.

## Errors that can be ignored

::: tip
The following errors can be safely ignored and aren't relevant
:::

### XML Parsing error in the dev console

![xml-error](./xml-error.png)

Those XML parsnig errors on narrat files can be ignored. For some reason, Firefox is trying to parse narrat files as an XML file. It doesn't do anything.

### Security warnings on install

Security warnings from npm when installing a game can be ignored. They come from the npm audit system, which is a very flawed system that flags development tools as being exploitable, even though they're never exposed to users, making those errors irrelevant to their actual use case. More background info on this [here](https://overreacted.io/npm-audit-broken-by-design/).
