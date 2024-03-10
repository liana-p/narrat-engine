---
description: Cette page de documentation explique comment éditer un jeu Narrat
---

<script setup>
import NarratSnippetClient from '../components/NarratSnippetClient.vue';

const testDemoScript = `main:
  think player idle "Where am I..."
  set test (+ 1 2)
  set data.test (concat (add 1 2) "Hello, " (concat "nice" "World"))
  set data.test2 true
  // This is a comment

  choice:
    talk narrat idle "You just %{$data.test} woke up in some sort of game engine demo."
    "I'm in a game engine?":
      talk narrat idle "Yes, you're inside an example narrat game with the documentation website."
    "What?":
      talk narrat idle "Eh, you'll get it later."
  think player idle "I see..."
  jump testLabel2
testLabel2:
  "This is another label"
  
label3:
  "Hello"`;

const demoScript = `main:
  think player idle "Where am I..."
  choice:
    talk narrat idle "You just woke up in some sort of game engine demo."
    "I'm in a game engine?":
      talk narrat idle "Yes, you're inside an example narrat game with the documentation website."
    "What?":
      talk narrat idle "Eh, you'll get it later."
  think player idle "I see..."`;
</script>

# Editer un jeu Narrat

Il y a deux types de contenu à éditer pour réaliser un jeu narrat :

- Les scripts de dialogue : des fichiers `.narrat` qui contiennent la narration à embranchements du jeu
- Les fichiers de configuration : des fichiers `.yaml` qui cotiennent des données de configuration à propos du jeu

## Jeux Narrat de démonstration

Voici un jeu Narrat de démonstration avec le script `.narrat` suivant :

<NarratSnippetClient :scriptContent="demoScript" :autoJumpOnChange="true" :codeHeight="300" />

## Ouvrir le projet narrat et se préparer à éditer les fichiers

**Un jeu Narrat est juste un dossier avec des fichiers dedans**. Pour commencer à éditer votre jeu, ouvrez le dossier dans votre éditeur de texte (VS Code).

1. Ouvrez VS Code
2. dans le menu "Fichier", cliquez sur "Ouvrir dossier"
3. Sélectionnez le dossier du jeu Narrat que vous avez créé
4. Vous pouvez désormais naviguer parmi ses fichiers
5. Un grand nombre de ces fichiers ne seront sans doute pas adaptés à votre besoin, vous n'avez pas à vous en soucier en dehors d'un usage avancé.
6. La plupart des fichiers dont vous aurez besoin se trouveront dans les dossiers `public/data` (là où se trouvent les assets et les fichiers de config) et `src/scripts` (là où se situent le code et les scripts Narrat)

![Ouvrir un dossier dans VS Code](./get-started/open-folder.png)

::: tip
Installez l'extension Visual Studio Code [Narrat language](https://marketplace.visualstudio.com/items?itemName=NarratEngine.language-narrat) afin de bénéficier d'un code couleur pour la syntaxe des scripts Narrat.

Vs Code devrait vous recommander de l'installer lorsque vous ouvrez un jeu Narrat. Si ce n'est pas le cas, cliquez sur le bouton Extensions dans le ruban de gauche, puis tapez "Narrat" dans la barre de recherche et installez l'extension.

![Processus d'installation de l'extension Narrat pour VS Code](./get-started/narrat-extension.png)
:::

## Quels sont les éléments constitutifs d'un jeu Narrat ?

Les sections suivantes vont vous expliquer quels dossiers et fichiers interviennent dans l'édition de votre jeu Narrat.

### Dossier `public`

Les assets (images, musiques, etc.) et fichiers de configuration se trouvent dans le dossier `public` à la racine du jeu. Ce dossier est destiné à contenir les assets statiques qui seront utilisés dans le build final.

Toute image, tout fichier de configuration, tout asset que le jeu devra charger en dehors du code se trouvera dans ce dossier.

::: tip
On peut se référer aux assets dans le dossier `public` via leur chemin relatif à ce dossier. Par exemple, en CSS, afin d'utiliser l'image se situant à l'adresse `public/img/button-background.png`, vous utiliseriez l'expression `/img/button-background.png`.
:::

### Dossier `src`

Le dossier `src` est destiné aux fichiers de scripts. Il existe des fichiers TypeScript qui servent à configurer le moteur (que vous n'avez généralement pas à modifier), et plus principalement des fichiers `.narrat` dans le sous-dossier `script` qui constituent votre jeu.

::: info
Dans le cadre d'un usage avancé, il est également possible de changer le code du moteur ou d'utiliser des plugins, qui se trouveraient alors également dans le dossier `src`.
:::

## Scripts Narrat

[example-narrat-script.md](../examples/example-narrat-script.md)

Les scripts Narrat sont la base de la création d'un jeu. Ils contiennent le flow du jeu et ses lignes de dialogue. Le [langage de scripting narrat](../scripting/language-syntax.md) est spécifiquement conçu pour Narrat.

Dans le dossier `src/scripts`, il y a un fichier `game.narrat` (peut-être nommé différemment selon le template que vous avez utilisé). C'est ici que les dialogues du jeu sont écrits. Le dialogue d'exemple ici présent montre l'utilisation de quelques fonctionnalités basiques, afin que vous puissiez commencer à écrire vos propres dialogues. Ci-dessus se trouve un lien vers la page d'exemple des scripts Narrat.

### Importer des scripts

Tous les scripts Narratutilisés dans un jeu sont importés et listés dans `src.scripts.ts`. Si vous désirez ajouter ou retirer des scripts Narrat dans votre jeu, il faut importer les fichiers correspondants en haut de celui-ci et ne pas oublier de les exporter à la fin. 

::: tip
Vous pouvez écrire votre jeu entier dans un seul fichier si vous le désirez, mais il est utile à des fins d'organisation de le séparer entre plusieurs fichiers. N'oubliez simplement pas de les importer de la façon suivante :
:::

```ts
import demo from './scripts/demo.narrat';
import quest from './scripts/quest.narrat';

export default [demo, quest];
```

Les fichiers Narrat sont écrits dans un langage fait sur mesure ; voir le [guide de syntaxe](../scripting/language-syntax.md) pour plus d'informations.

::: tip
Nous recommandons d'utiliser [Visual Studio Code](https://code.visualstudio.com) pour modifier des scripts Narrat. Il existe une [extension de langage Narrat](https://marketplace.visualstudio.com/items?itemName=NarratEngine.language-narrat) qui appliquera un code couleur aux termes de syntaxe utilisés.
:::

### Scripts d'exemple

Un certain nombre de [scripts Narrat d'exemple](../examples/example-narrat-script.md) sont disponibles et constituent de bons exemples pour différents usages.

## Fichiers de configuration

Il existe divers fichiers de configuration dans les jeux Narrat qui permettent de personnaliser le comportement du moteur.

Par défaut, les jeux sont livrés avec une configuration basique qui ne nécessite aucune modification. Vous aurez cependant besoin de modifier cette dernière si vous souhaitez utiliser des fonctionnalités plus avancées.

### common.yaml

Le fichier de configuration contient des informations de base concernant le jeu. C'est ici que sont définis les images, écrans, boutons, skill checks, items, quêtes et plus encore.

Plus d'info dans le [guide des fichiers de configuration](config-files.md).

### characters.yaml

Le fichier `characters.yaml` contient la configuration pour tous les personnages qui parlent dans le jeu. Ils doivent avoir au minimum un nom et un sprite `idle`. Le sprite est utilisé pour afficher le portrait du personnage pendant son dialogue, et la valeur de celui-ci doit être le chemin vers le fichier image utilisé. 

La couleur du nom du personnage peut être modifée via la valeur `color` dans la propriété `style` du personnage (toute couleur CSS fonctionne).

Plus de détails dans [Personnages et portraits](../features/characters-and-portraits.md)

### Autres fichiers de configuration

Il existe des fichiers de configuration modifiables pour la plupart des fonctionnalités du moteur. La meilleure façon d'apprendre à d'utiliser ceux-ci est d'étudier les jeux d'exemple.

- [Jeux tests d'exemple dans le repo Narrat](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games)
- [Example games in the narrat-examples repo](https://github.com/liana-p/narrat-examples)

## Et après ?

Pour réaliser votre jeu, ouvrez vos fichiers de scripts `.narrat` et commencez à écrire votre jeu !

::: tip
**Vous pouvez naviguer dans la sidebar à gauche sur ce site pour trouver des guides et des pages traitant de fonctionnalités et de leur usage.**
:::

Vous voudrez peut-être vous renseigner au sujet d'autres éléments, tels que :

 ### Cheatsheet complète des commandes

 [Cette page](../commands/all-commands.md) contient l'intégralité des commandes disponibles pour vos scripts.

 ### Viewport

[Utilisez le viewport](../features/viewport.md) pour ajouter des arrières-plans visuels et boutons interactifs à votre jeu.

### Personnalisation de l'interface

[Personnalisez l'apparence de votre jeu avec du CSS](../guides/customising-ui.md)

### Build et export de votre jeu

[Faites un build de votre jeu pour le distribuer](../guides/building-and-exporting.md)

### Système de skills

[utilisez le système de skills](../features/skills.md)

### Inventaire

[Intégrez un inventaire à votre jeu](../features/inventory.md)

### Mise à jour

Il est important de [mettre Narrat à jour](./updating-narrat.md) pour bénéficier des dernières fonctionnalités et corrections de bugs.

<FeedbackForm title="Editing the game" slug="guides/editing-game"/>