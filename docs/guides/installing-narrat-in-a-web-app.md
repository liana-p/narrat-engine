# Installing Narrat in a web app

::: danger
This is for advanced use. It's unlikely you want to follow those instructions unless you know what you're doing
:::

## Install on a project

pnpm install narrat`

For narrat to run, it needs two pieces of data:

- The `config` file which contains the path of your script files and other info
- The `characters` file which contains the list of characters in the game

Copy the content of one of the [example games](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/) and the content of the assets folder somewhere in your app that can be served statically, and have a div in your page's html including your javascript \(you can copy `public/index.html`\) .

Then in your javascript code to launch narrat, use:

```ts
import { startApp } from 'narrat';
import scripts from './scripts';

const debug = true;
// Call `startApp` to run the game, passing the path to your config file and characters file.
startApp({
  charactersPath: 'data/characters.yaml', // Replace with whatever path you have
  configPath: 'data/config.yaml',
  scripts,
  debug,
  container: myContainer, // The container is the div where the game will be rendered
});
```
