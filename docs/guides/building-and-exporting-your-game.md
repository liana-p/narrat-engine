# Building and exporting your game

## Building your game as a website

You can build your game as a static website

```
npm run build
```

{% hint style="info" %}
&#x20;This will generate a built version of your game as a website in the `build/` folder
{% endhint %}

## Building your game as an app

The narrat template is already setup to use [electron](https://www.electronjs.org) to easily build a desktop application out of your game.

#### Requirements

- Have [git](https://git-scm.com) installed
- If you're installing git on windows, using the default options for every step in the setup process is fine

You can run your game as an app:

```bash
npm run electron
```

Or you can package it as an executable (should work on Windows, Mac, Linux):

```bash
npm run package
```

{% hint style="info" %}
This will create an application for your OS in the `out/` folder
{% endhint %}

Please look at the [electron documentation](https://www.electronjs.org/docs/latest/) if you want to customise how your app is built, window sizes and other things (hint: Most of it takes place in the `electron-something.js` files at the root of the repo)

## Building for Steam

See the following page

[publishing-on-steam-steamworks-integration.md](publishing-on-steam-steamworks-integration.md)
