# Narrat FAQ

This page contains the answers to various common narrat questions.

## How do I troubleshoot errors?

If you have errors or need help, the [troubleshooting](../troubleshooting/troubleshooting) page has a lot of useful info.

## How do I add double quotes to my dialogue? It breaks the game

Because dialogue is already wrapped in double quotes in narrat, you need to "escape" double quotes used in your text, as the system thinks that you are closing the text. For example:

```narrat
main:
  "Welcome to "the best game ever"! I hope you will like it" // [!code error]
  "Welcome to \"the best game ever\"! I hope you will like it" // [!code ++]
```

## How do I change the splash screen, title screen or any other background?

Narrat [UI customisation is done via CSS](../guides/customising-ui.md). In the case of splash screens and backgrounds, you can set them up by simply giving a css `background-image` property to the relevant element, as explained in the UI customisation guide.

You might want to also add that image to the `images` list in `config.yaml` to make sure it gets preloaded.

## How do I separate text in paragraphs or add line endings?

Most text in narrat is used as html, which means you can use html tags to separate longer bits of text. For example you could add line breaks with `<br />` or create paragraphs with `<p>`:

```narrat
main:
  "Welcome to my game.<br />I hope you will like it.<p>Here's another paragraph</p>"
```

## How do I make text bold, italic, strike-through, etc?

You can use html in narrat, so use the relevant html tags like `<b>`, `<i>` or `<s>`. Or, create custom css classes to do whatever styling you want and use them with a span tag:

```narrat
main:
  "Welcome to <b>my game</b>.<br />I hope <i>you will like it</i>
  "<span class='red'>This text is red</span>"
```

```css
.red {
  color: red;
}
```

## How do I update narrat?

See the [updating narrat](../guides/updating-narrat) guide

Change the version of narrat in the dependencies part of the `package.json` file to the version you want then run `npm install`. Or simply run `npm install narrat@latest`.

If it doesn't work, try deleting the `node_modules` folder. Sometimes `npm` won't pick up updates.
