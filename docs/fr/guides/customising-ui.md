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

**Par défaut, toute image mentionnée dans votre CSS ne sera pas préchargée** car le moteur ignore leur existence.

Si vous avez vesoin de les précharger, ajoutez-les à la liste des images dans `config.yaml` :

```yaml
images:
  myButtonBackground: img/ui/button-background.png
```

## Utiliser des polices d'écriture personnalisées

Vous pouvez utiliser des polices d'écriture personnalisées, se référer au [Guide des polices personnalisées](./using-custom-fonts.md)

## Créer des classes CSS personnalisées

### Mise en place

Les variables CSS ci-dessus permettent de facilement personnaliser des propriétés communes, mais la meilleure manière d'appliquer des changements plus profonds consiste à écrire vos propres classes CSS. La plupart des éléments d'interface dans Narrat ont une classe ou un identifiant CSS spécifique que l'ont peut cibler. 

Ainsi, `.interact-button` est la classe automatiquement appliquée au bouton "Continuer" dans le panneau de dialogue, donc tout code CSS ajouté à cette classe affectera le style de ce bouton :

```css
.interact-button {
  background-image: url('img/ui/continue.png');
  color: rgba(0, 0, 0, 0) !important;
}

.interact-button:hover {
  background-image: url('img/ui/continue_hover.png') !important;
}
```

::: tip 
Notez le paramètre `!important` à la fin. Celui-ci permettra à votre propriété CSS de prévaloir sur celle existante dans le moteur.
:::

Pour pouvoir ajouter du CSS personnalisé, il vous faut un fichier CSS. Le template par défaut en contient déjà un, mais si par hasard vous n'en aviez pas, il vous suffit de créer un fichier `.css` et de l'importer dans `index.ts`.

Ainsi :

1. Créer un dossier `css`dans le dossier `src`, puis un fichier `main.css` à l'intérieur
2. Dans `src/index.ts`, ajoutez cette ligne: `import "./css/main.css";`
3. Tout CSS ajouté à `main.css` sera chargé dans votre jeu

### Identifer des classes CSS à modifier

#### Utiliser les outils de développement

::: details Trouver les classes et identifiants CSS en question

La façon la plus facile de procéder est de passer par l'outil "inspecter" (clic droit -> inspecter sous Chrome ou Firefox).

![Devtools screnshot 1](/guides/css/devtools-1.png)

Les outils de développement listent tous les éléments sur la page dans l'onglet "éléments" (en bas à gauche de l'image ci-dessus). Cet outils montre l'arborescence des élements DOM qui composent une page web (l'interface de narrat est composée d'élements DOM).

Classes CSS disponibles à la modification :

![Devtools picker](/guides/css/devtools-picker.png)

Cliquer sur l'icône avec la flèche en haut à gauche ouvre un outil "pipette" qui permet de cliquer n'importe où sur la page pour sélectionner un élément et visualiser ses propriétés. Ceci rend la navigation et l'identification des éléments très facile.

Finalement, trouver une classe ou un identifiant CSS revient à regarder ce qu'il y a dans le HTML d'un élément via les outils de développement après l'avoir trouvé avec la pipette:

![Element picker](/guides/css/picker.png)

![Element tabs of devtools with picked element highlighted](/guides/css/inspector.png)


Survoler des éléments dans l'onglet correspondant les fait également ressortir visuellement sur la page.

La propriété `class` d'un élément correspond au nom de la classe, la propriété `id` à l'identifiant.

:::

### Classes et identifiants CSS

Une fois une classe ou un identifiant trouvé·e, il ne reste qu'à y ajouter du CSS. Pour une classe, le sélecteur `.` doit être utilisé, suivi du nom de la classe. Pour unidentifiant, le sélecteur est `#`. Par exemple :

```css
.interact-button {
  /* This selector applies to the CSS class named "interact-button" */
  color: red !important;
}

#interact-button {
  /* This selector applies to the css ID named "interact-button" */
  color: red !important;
}
```

::: warning
Attention à ne pas confondre classe et identifiant CSS, la syntaxe emplyée pour les sélectionner est différente.
:::

### Liste de classes CSS à modifier

::: tip
`Cette liste est en cours de rédaction. Si vous ne trouvez pas quelque chose ou si des références ont changé, utilisez les instructions ci-dessus pour trouver ce dont vous avez besoin dans le moteur`
:::

#### Boutons

::: details Buttons CSS

`.button`: classe générique appliquée à tous les boutons

![Button](/guides/css/elements/button.png)

`.interact-button`: le bouton "continuer" du panneau de dialogue

![Interact Button](/guides/css/elements/interact-button.png)

`.dialog-choice`: les choix sélectionnables dans le panneau de dialogue

![Dialog Choice](/guides/css/elements/dialog-choice.png)

`.menu-button`: les deux boutons "nouvelle partie" et "continuer" 

`.start-button`

![Start Button](/guides/css/elements/start-button.png)

`.continue-button`

![Continue Button](/guides/css/elements/continue-button.png)

:::

#### Éléments d'interface

::: details Autres éléments d'interface

`.dialog-container`: contient tous le dialogue

![Dialog container](/guides/css/elements/dialog-container.png)

`.dialog`: l'ensemble de la section à droite de l'écran qui peut défiler et qui contient le dialogue

![Dialog container](/guides/css/elements/dialog.png)

`.menu-container`

![Menu container](/guides/css/elements/menu-container.png)

:::

::: details CSS modal général

`.modal-mask`: l'overlay à moitié opaque appliqué quand un modal (menu popup) est affiché

![modal mask](/guides/css/elements/modal-mask.png)

`.modal-container`: la classe générique contenant tous les modaux

![Dialog container](/guides/css/elements/modal-container.png)

`.modal-header`

![Dialog container](/guides/css/elements/modal-header.png)

`.modal-body`

![Dialog container](/guides/css/elements/modal-body.png)

:::

#### Écran des skills

::: details CSS de l'écran des skills

`.skills-container`

![Dialog container](/guides/css/elements/skills-container.png)

À savoir : la classe `.skills-container` dans l'écran des skills utiliser une [grille CSS](https://learncssgrid.com/). Pour changer le nombre de colonnes par rangée, on peut réécrire la propriété `grid-template-columns`. Ainsi :

```css
.skills-container {
  grid-template-columns: repeat(
    4,
    1fr
  ); /* The first number in repeat is the number of desired columns */
  grid-gap: 30px 30px; /* Space between elements */
}
```

`.skill-display`: la tuile individuelle d'un skill

![Dialog container](/guides/css/elements/skill-display.png)

`.skill-title`

![Dialog container](/guides/css/elements/skill-title.png)

`.skill-xp-container` and `.skill-xp-bar`: skill-xp-container est l'arrière-plan de la barre de progression de l'XP, tandis que skill-xp-bar désigne la partie interne de la barre qui est plus ou moins remplie selon le niveau d'XP

`.skill-xp-text` désigne le texte de l'XP

![Dialog container](/guides/css/elements/skill-xp.png)

`.skill-level`

![Dialog container](/guides/css/elements/skill-level.png)

:::
