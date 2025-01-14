---
description: Cette page explique comment personnaliser l'aspect visuel de votre jeu et créer un thème pour Narrat
---

# Personnaliser l'apparence de l'interface

Les jeux Narrat étant construits sur la base de technologies web standard (HTML/CSS/JS), il est possible de personnaliser l'aspect de chaque élément avec du CSS.

## Comment fonctionne le CSS ?

Le CSS est un outil servant à donner des propriétés de style à des éléments sélectionnés selon une règle. Par exemple :

```css
.button {
  background-color: red;
}
```

Cette règle donnerait une couleur d'arrière-plan rouge à tout élément possédant la classe CSS `button`. Pour plus d'informations, jetez un oeil à [L'introduction au CSS de w3schools](https://www.w3schools.com/css/css_intro.asp) (en anglais) et n'ayez pas peur de faire des recherches sur internet en fonction de vos besoins.

## Comment utiliser du CSS dans Narrat

Il existe deux façons d'utiliser du CSS pour personnaliser votre interface dans Narrat. La première est d'éditer les variables CSS incluses pour modifier les couleurs utilisées ; la seconde est de créer vos propres classes CSS pour passer outre celles qui existent déjà.

::: danger
Si vous utilisez des images dans votre CSS, les chemins d'accès doivent commencer par `/`, ce sans quoi les assets seront introuvables dans le build final.
Par exemple : utilisez `background-image: url('/images/my-image.png');` plutôt que `background-image: url('images/my-image.png');`
:::

## Variables CSS

### Introduction 

::: details Comment fonctionnent les variables CSS ?
Une variable CSS est simplement une valeur de propriété CSS stockée dans une variable. Cette façon de faire permet à l'utilisateur de réutiliser cette variable à de multiples endroits. Utiliser des variables pour les couleurs, tailles de police, arrière-plans etc. usuels permettent de construire un thème facile à modifier. Ainsi, voici une partie du CSS par défaut de Narrat :

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

Le code CSS ci-dessus créée quelques variables dans lesquelles sont stockées des couleurs spécifiques qui sont réutilisées par diverses classes CSS. Changer la valeur de `--text-color` appliquera le changement à toute portion de code CSS en faisant usage.

:::

Voici une liste des variables CSS existant dans Narrat :

::: details Variables CSS disponibles pour modification

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
Pour voir la liste mise à jour des variables CSS, jetez un oeil à [main.css](https://github.com/liana-p/narrat-engine/blob/main/packages/narrat/src/css/main.css#L1) dans le moteur
:::

## Note au sujet du préchargement des images

**Les images utilisées dans votre CSS ne seront pas préchargées par défaut**, car le moteur ne connait pas leur existence.

Si vous devez les précharger, ajoutez-les à la liste des images dans `config.yaml` :

```yaml
images:
  myButtonBackground: img/ui/button-background.png
```

## Utiliser des polices personnalisées

Vous pouvez utiliser des polices personnalisées dans Narrat, voir [le guide des polices personnalisées](./using-custom-fonts.md) pour savoir comment procéder.

## Créer des classes CSS personnalisées

### Mise en place

Les variables CSS ci-dessus vous permettent de facilement personnaliser les propriétés globales, mais pour faire des modifications plus profondes, la meilleure manière de faire est d'écrire des classes CSS personnalisées. La plupart des éléments de l'interface ont une classe ou un identifiant CSS spécifiques que vous pouvez utiliser.

Par exemple, `.interact-button` est la classe CSS donnée au bouton "Continuer" dans la boîte de dialogue. Écrire du code CSS ciblant cette classe changera son apparence :

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
Notez le paramètre `!important` à la fin. Il permet à votre code de passer outre les propriétés déjà existantes dans Narrat en ordonnant à la feuille de style CSS de lui donner une priorité plus haute.
:::

Pour pouvoir ajouter du CSS personnalisé, vous aurez besoin d'un fichier CSS. Le template en inclut déjà un, mais si pour une raison ou une autre vous n'en avez pas, tout ce que vous avez besoin de faire est de créer un fichier `.css` et de l'importer dans votre `index.ts`.

Ainsi :

1. Créez un dossier `css` dans le dossier `src`, puis un fichier intitulé `main.css` en son sein
2. Dans `src/index.ts`, ajoutez la ligne suivante : `import "/guides/css/main.css";`
3. Tout CSS ajouté dans `main.css` sera désormais chargé dans votre jeu.

### Comment savoir quelles classes CSS cibler

#### Utiliser les devtools

::: details Comment trouver la classe ou l'identifiant CSS d'éléments afin de modifier leur apparence

La manière la plus simple de trouver le nom d'une classe ou identifiant CSS afin de la/le modifier est d'utiliser le browser inspector (clic droit -> inspecter sur Chrome et Firefox).

![Devtools screenshot 1](/guides/css/devtools-1.png)    

Les devtools présentent une liste de tous les éléments d'une page dans l'onglet "éléments" (en bas à gauche sur la capture d'écran). Cet outil montre une arborescence de tous les éléments DOM qui constituent une page web (l'interface de Narrat est faite d'éléments DOM).

Classes CSS disponibles à la modification :

![Devtools picker](/guides/css/devtools-picker.png)

Cliquer sur l'icône de flèche en haut à gauche des devtools ouvre un outil de sélection qui vous permet de cliquer n'importe où sur la page pour sélectionner un élément dans la vue éléments des devtools. Ainsi, il est très facile de naviguer et de trouver des éléments sur une page.

Trouver la classe ou l'identifiant d'un élément est donc une simple question de trouver ce qui lui correspond dans le code HTML des devtools après l'avoir sélectionné avec l'outil dédié.

![Element picker](/guides/css/picker.png)

![Onglet éléments des devtools avec éléments sélectionnés surlignés](/guides/css/inspector.png) 

Survoler les éléments dans l'onglet élément les surligne également sur la page.

La propriété `class` d'un élément est le nom de sa classe CSS. Certains éléments ont également une propriété `id`, qui est son identifiant CSS.

:::

### Classes et identifiants CSS

Une fois qu'une `class` ou un `id` ont été identifiés, il s'agit simplement d'ajouter du CSS à l'élément correspondant. Pour ajouter du CSS à une class, le sélecteur doit commencer avec le caractère `.` suivi du nom de la classe. Pour un `id`, il faut utiliser `#`. Ainsi :

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
Prenez garde à ne pas mélanger les classes et les identifiants CSS, car la syntaxe de leur sélecteur est différente.
:::

### Liste de classes CSS utiles

::: tip
Cette liste est régulièrement mise à jour. Si vous ne trouvez pas une information ou si celle-ci a été le sujet de modifications, utiliser les instructions précédentes pour trouver celle-ci par vous-même dans le moteur.
:::

#### Boutons 

::: details Boutons CSS

`.button`: classe générique de base appliquée à tous les boutons

![Bouton](/guides/css/elements/button.png)

`.interact-button`: le bouton "Continuer" dans la boîte de dialogue

![Interact Button](/guides/css/elements/interact-button.png)

`.dialog-choice`: les choix sélectionnables dans la boîte de dialogue

![Dialog Choice](/guides/css/elements/dialog-choice.png)

`.menu-button`: les deux boutons "start game" et "continue game"

`.start-button`

![Start Button](/guides/css/elements/start-button.png)

`.continue-button`

![Continue Button](/guides/css/elements/continue-button.png)

:::

#### Éléments d'interface

::: details Autres éléments d'interface

.dialog-container: contient les répliques et les lignes de dialogue 

![Dialog container](/guides/css/elements/dialog-container.png)

.dialog: l'entièreté de la boîte à droite de l'écran qui est navigable et qui contient tous les dialogues

![Dialog container](/guides/css/elements/dialog.png)

.menu-container

![Menu container](/guides/css/elements/menu-container.png)

:::

::: details CSS modal global

.modal-mask: la masque semi-transparent qui couvre la page lorsqu'un menu modal est ouvert

![modal mask](/guides/css/elements/modal-mask.png)

.modal-container: la classe contenant tous les menus modaux

![Dialog container](/guides/css/elements/modal-container.png)

.modal-header

![Dialog container](/guides/css/elements/modal-header.png)

.modal-body

![Dialog container](/guides/css/elements/modal-body.png)

:::

#### Écran des skills

::: details CSS de l'écran des skills

.skills-container

![Dialog container](/guides/css/elements/skills-container.png)

Une bonne chose à savoir est que la classe `.skills-container` dans l'écran des skills fait usage d'une [grille CSS](https://learncssgrid.com/). Pour changer le nombre de colonnes par rangée, vous pouvez utiliser `grid-template-columns`. Ainsi :

```css
.skills-container {
  grid-template-columns: repeat(
    4,
    1fr
  ); /* Le premier nombre dans repeat est le nombre de colonnes désirées */
  grid-gap: 30px 30px; /* espace entre les éléments */
}
```

.skill-display: The individual tile for a skill

![Dialog container](/guides/css/elements/skill-display.png)

.skill-title

![Dialog container](/guides/css/elements/skill-title.png)

.skill-xp-container et .skill-xp-bar: skill-xp-container est l'arrière-plan de la barre de progression de l'XP, tandis que skill-xp-bar est la barre intérieure qui se remplit selon la quantité d'XP

.skill-xp-text est également le texte de l'XP

![Dialog container](/guides/css/elements/skill-xp.png)

.skill-level

![Dialog container](/guides/css/elements/skill-level.png)

:::