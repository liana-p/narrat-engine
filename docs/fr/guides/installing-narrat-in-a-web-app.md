# Installer Narrat dans une web app

:::danger
Ceci correspond à un usage avancé. Il est peu probable que vous souhaitiez suivre ces instructions, sauf si vous savez ce que vous faites.
:::

## Installer

`npm install narrat`

Pour que narrat fonctionne, il faut deux ensembles de données :

- Le fichier `config` qui contient le chemin vers vos fichiers de scripts et autres informations
- Le fichier `characters` qui contient la liste des personnages dans le jeu

Copiez le contenu de l'un des [templates](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/) et le contenu du dossier d'assets dans un répertoire auquel on peut accéder de façon statique, et créez une div dans le html de votre page qui contiendra votre javascript (vous pouvez utiliser `public/index.html`).

Puis, dans le code javascript qui lance narrat, utilisez :

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
