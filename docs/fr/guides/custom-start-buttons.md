---
title: Boutons du menu de démarrage personnalisés
description: Cette page explique comment ajouter des boutons personnalisés au menu de démarrage d'un jeu narrat
---

# Boutons personnalisés dans le menu de démarrage

Il est possible d'ajouter des boutons personnalisés au menu de démarrage à travers le système de plugin. Ceux-ci peuvent avoir un array `startMenuButtons` qui contient les objets définissant ces boutons.

## Comment faire

Dans `src/index.ts` (ou tout autre fichier typescript), créer un nouveau plugin :

```ts{2}
export class StartButtonsPlugin extends NarratPlugin {
  public startMenuButtons = [
    {
      id: 'test1',
      text: 'Test 1',
      action: () => window.open('https://narrat.dev')
    },
    {
      id: 'test2',
      text: 'Test 2',
      popupComponent: {
        name: 'SkillsWindow',
        component: SkillsWindow,
      },
    },
  ];
}
```

N'oubliez pas d'enregistrer le plugin avant de lancer l'application :

```ts{2}
const onPageLoad = () => {
  registerPlugin(new StartButtonsPlugin());
  startApp({
    baseAssetsPath: assetsPath,
    baseDataPath: dataPath,
    configPath: `${dataPath}data/config.yaml`,
    logging: false,
    debug,
  });
};
```

Les boutons ont les propriétés suivantes :

- `id`: identifiant du bouton (string). Donne une classe CSS unique au bouton et aux potentiels popups que ce dernier créée
- `text`: texte à afficher sur le bouton (et titre du popup le cas échéant)
- `action` (optionnel): une fonction à lancer au clic
- `popupComponent` (optionnel): un objet contenant les informations d'un composant à afficher dans un popup quand le bouton est cliqué
  - `name`: Nom du composant à utiliser (string)
  - `component`: le composant Vue à utiliser

## Composant popup

Si vous utilisez la propriété `popupComponent`, un modal contenant le composant spécifié s'ouvre lorsque vous cliquez sur votre bouton.