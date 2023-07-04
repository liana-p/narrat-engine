---
title: Using custom fonts in narrat
description: How to add custom fonts in your narrat game
---

# Using custom fonts in narrat

You probably want to use custom fonts in your games. This is easy to do in Narrat, because Narrat uses web technology and can be [customised with CSS](./customising-ui.md).

For custom fonts, you will need to load a web font ([see below](#about-web-fonts)). For basic built-in fonts, you can use the default fonts available in CSS.

## How to use a font in CSS

Generally, in CSS, to use a font you simply need to specify its name in a CSS class (in `src/css/main.css`):

```css
body {
  font-family: 'My-Font';
}
```

::: warning
You can't just use any font you have on your PC though, you need to install web fonts in your game to use specific custom fonts. See below
:::

## About web fonts

The first thing you should know is that websites use [web fonts](https://design.tutsplus.com/tutorials/web-fonts-in-60-seconds--cms-29695), which are not exactly the same thing as normal fonts.
On your PC, you can install fonts, but on the web, fonts need to work on every computer, so they are loaded from the internet.

So, to use a custom font in your narrat game, you need to make it load a web font.

::: tip
There are a few [default fonts](https://www.w3schools.com/csSref/css_websafe_fonts.php) considered safe to use on every website.
:::

## How to install a web font in a narrat game

Because a narrat game is simply a web page, you can install a web font the same way you would on any website. This generally involves copy-pasting a bit of html and CSS in your website to make sure the font is loaded and available for use.

In our case, here's how to do it. Imagine you have a font file ready to use. You simply need to add a [`@font-face`](https://www.w3schools.com/css/css3_fonts.asp) directive in your CSS.

For this example, I will use the [Agdasima](https://fonts.google.com/specimen/Agdasima) font from Google Fonts.

### Find a web font and add the files to your game

Place the font you want to use somewhere in the `public` directory so it's accessible. In our case, it will be in the `public/fonts/Agdasima` folder.

### Load the font in your CSS

In your `src/css/main.css` file, add the following `@font-face` directive for each variant of your font (in my case, one regular and one bold one)

```css
/* Regular font */
@font-face {
  font-family: 'Agdasima';
  font-style: normal;
  font-weight: normal;
  src: url('./fonts/Agdasima/Agdasima-Regular.ttf') format('woff2');
}
/* Bold font */
@font-face {
  font-family: 'Agdasima';
  font-style: normal;
  font-weight: bold;
  src: url('./fonts/Agdasima/Agdasima-Bold.ttf') format('woff2');
}
```

### Actually use the font in parts of your game

If you want to override the default font (used pretty much everywhere), you can change the `--font-family` css variable which narrat uses.

```css
#app {
  /* Customise CSS variables here. They will override the existing narrat ones. You can also add your own variables */
  --bg-color: #131720;
  --text-color: #d9e1f2;
  --primary: hsl(255, 30%, 55%);
  --focus: hsl(210, 90%, 50%);
  --secondary: #42b983;
  --font-family: 'Agdasima', sans-serif; // [!code ++]
}
```

If you want to use the font in one specific place, you can use it like any other font in CSS. For example, applying it to the `.title` css class will change the font of most titles and modal headers.

```css
.title {
  font-family: 'Agdasima';
}
```

## Finding fonts to use

There is a great video guide on how to find fonts for your game, as well as licensing considerations:

<iframe width="560" height="315" src="https://www.youtube.com/embed/xCXvWBDLXmE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
