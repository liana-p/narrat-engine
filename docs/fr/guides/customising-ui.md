---
description: Cette page explique comment user de CSS pour personnaliser l'aspect visuel d'un jeu Narrat et de son interface
---

# Personnaliser l'aspect de l'interface

Les jeux Narrat sont basés sur des technologies web standard (HTML/CSS/JS) et chacuns de leurs éléments sont donc personnalisables avec du CSS.

## Fonctionnement du langage CSS

Le CSS est un moyen d'appliquer un style à des éléments web sélectionnés au moyen d'une règle, et ce à travers des propriétés précises. Ainsi :

```css
.button {
  background-color: red;
}
```

Ce code applique un fond de couleur rouge à tout élément possédant la classe CSS `button`. Pour plus d'information, consultez [l'intro au CSS de w3schools](https://www.w3schools.com/css/css_intro.asp) et effectuez des recherches Google selon vos besoins spécifiques.

## Comment utiliser du CSS dans Narrat

Il y a deux moyens d'utiliser du CSS pour personnaliser votre interface dans Narrat. L'un est de modifier des variables CSS pour remplacer, par exemple, le schéma de couleur, et l'autre consiste à écrire vos propres classes CSS pour passer outre celle existant déjà dans le moteur.

::: danger
Si vous utilisez des images dans votre CSS, les chemins doivent commencer par `/`, sans quoi les assets en question ne seront pas trouvés au moment du build.
Par exemple : `background-image: url('/images/my-image.png');` plutôt que `background-image: url('images/my-image.png');`
:::

## Variables CSS

### Introduction

::: details Fonctionnement des variables CSS

Une variable CSS est une valeur assignée à une propriété, stockée dans une variable. Elle permet à l'utilisateur de réutiliser cette variable à divers endroits. Utiliser des variables pour les couleurs, tailles, fonds etc. standards permet de construire un thème facilement modifiable. Voici un échantillon du CSS par défaut utilisé par Narrat :

```css
:root {
  --text-color: #d9e1f2;
  --light-1: hsl(210, 30%, 40%);
  --light-2: hsl(255, 30%, 50%);
  --light-background: linear-gradient(to right, var(--light-1), var(--light-2));
}

.button {
  background: var(--light-background);
  color: var(--text-color);
}

.input {
  background: var(--light-background);
  color: var(--text-color);
}
```

Le code ci-dessus créée des variables pour stocker des couleurs spécifiques, et ces couleurs sont réutilisées dans diverses classes CSS. cela signifie que changer la valeur assignée à `--text-color` appliquera le changement à tout code CSS en faisant usage.
:::

Voici une liste de toutes les variables CSS de Narrat :

::: details Variables CSS disponibles pour modification dans Narrat

```css
:root {
  --font-family: 'Helvetica', sans-serif, 'Arial', 'sans-serif';
  --bg-color: rgba(19, 23, 32, 0.9);
  --text-color: #d9e1f2;
  --grey-text-color: #a6a6a6;
  --primary: hsl(255, 30%, 55%);
  --focus: hsl(210, 90%, 50%);
  --secondary: #42b983;
  --border-color: hsla(0, 0%, 100%, 0.2);
  --light-1: hsl(210, 30%, 40%);
  --light-2: hsl(255, 30%, 50%);
  --light-gradient: linear-gradient(to right, var(--light-1), var(--light-2));
  --light-background: rgba(255, 255, 255, 0.3);
  --button-background: var(--tile-background);
  --button-text-color: var(--text-color);
  --modal-gradient-1: rgba(18, 21, 26, 0.8);
  --modal-gradient-2: rgba(37, 40, 44, 0.6);
  --modal-background: linear-gradient(
    90deg,
    var(--modal-gradient-1) 0%,
    var(--modal-gradient-2) 100%
  );
  --tile-gradient-1: rgba(18, 21, 26, 0.9);
  --tile-gradient-2: rgba(37, 40, 44, 0.7);
  --tile-background: linear-gradient(
    90deg,
    var(--tile-gradient-1) 0%,
    var(--tile-gradient-2) 100%
  );
  --tile-border-color: rgba(166, 166, 166, 0.3);
  --shadow-1: hsla(236, 50%, 50%, 0.3);
  --shadow-2: hsla(236, 50%, 50%, 0.4);
  --hud-background: rgba(0, 0, 0, 0.4);
  --hud-text-color: var(--text-color);

  --notification-bg: var(--tile-background);
  --notification-text-color: var(--text-color);
  --notification-description-color: var(--grey-text-color);
  --notification-icon-size: 40px;

  --skills-text-background: rgba(0, 0, 0, 0.5);
  --skills-text-color: var(--text-color);
  --skills-level-background: rgba(0, 0, 0, 0.5);
  --skills-level-color: orange;
  --skills-xp-bar-height: 40px;

  --skill-check-name-color: orange;
  --skill-check-difficulty: orange;
  --skill-check-success: green;
  --skill-check-failed: red;
  --skill-check-color: orange;

  --dialog-choice-color: orange;
  --dialog-choice-hover-color: var(--text-color);

  --inventory-text-background: rgba(0, 0, 0, 0.5);
  --inventory-text-color: var(--text-color);
  --inventory-amount-background: rgba(0, 0, 0, 0.5);
  --inventory-amount-color: orange;

  --quest-title-color: yellow;
  --completed-quest-title-color: grey;

  --objective-in-progress-color: white;
  --objective-completed-color: grey;

  --loading-bar-inner-bg: var(--light-background);
  --loading-bar-outer-bg: var(--bg-color);

  --dialog-box-bg: var(--bg-color);
  --dialog-box-border: none;

  /* Tabs */
  --tabs-background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(100, 100, 100, 1) 53%,
    rgba(0, 0, 0, 0.2) 100%
  );
  --tab-active-background: rgba(0, 0, 0, 0);
  --tab-active-text-color: var(--text-color);
  --tab-inactive-background: rgba(0, 0, 0, 0);
  --tab-inactive-text-color: var(--text-color);
  --tab-border-style: solid;
  --tab-border-color: white;
  --tab-selected-glow-color: var(--focus);

  --tooltip-background: #331d00;
  --tooltip-border: 1px solid orange;
  --tooltip-border-radius: 5px;
  --tooltip-title-font-size: 1.2rem;
  --tooltip-font-size: 1rem;
  --tooltip-title-color: red;
  --tooltip-color: var(--text-color);

  --highlighted-tooltip-keyword-color: red;
  --highlighted-tooltip-keyword-font-size: 1.1em;
  --highlighted-tooltip-keyword-font-weight: bold;

  --achievement-title-color: var(--text-color);
  --achievement-tile-background: var(--tile-background);
  --achievement-tile-border-color: var(--tile-border-color);
  --achievement-description-color: rgb(170, 170, 170);

  --separator-bg-color: rgba(250, 250, 250, 0.8);
  --separator-height: 1px;
  --separator-width: 100%;
}
```

:::

::: tip
Pour consulter la liste à jour des variables CSS, voir [main.css](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/css/main.css#L1) dans le moteur
:::

## Notes sur le préchargement d'images