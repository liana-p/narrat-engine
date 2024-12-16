# Installer Narrat dans une web app

::: danger
Ceci correspond à un usage avancé. Il est peu probable que désiriez suivre ces instructions à moins que vous sachiez ce que vous faites.
:::

## Installer dans un projet

`npm install narrat`

Pour que Narrat s'exécute, il a besoin de deux informations :

- Le fichier `config` qui contient le chemin de vos fichiers de scripts, ainsi que d'autres informations
- Le fichier `personnages` qui contient la liste des personnages du jeu

Copiez le contenu de l'un des [jeux exemples](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/) et le contenu du dossier d'assets à un endroit de votre application qui peut être servi de manière statique, et utilisez dans le HTML de votre page une div qui contient votre javascript \(vous pouvez copier `public/index.html`\).

Puis, dans votre code javascript qui lance Narrat, utilisez :

```ts
import { startApp } from 'narrat';
import scripts from './scripts';

const debug = true;
// Appelez `startApp` pour lancer le jeu, ce qui passe le chemin de vos fichiers de configuration et de personnages.
startApp({
  charactersPath: 'data/characters.yaml', // Remplacez par votre chemin
  configPath: 'data/config.yaml',
  scripts,
  debug,
  container: myContainer, // Le container est la div dans laquelle le jeu sera rendu
});
```