---
description: Cette page de documentation explique comment modifier un jeu narrat
---


# Modifier un jeu narrat

Il y a deux types de contenu à modifier pour réaliser un jeu narrat :

- Les scripts de dialogue : des fichiers `.narrat` qui contiennent la narration du jeu
- Les fichiers de configuration : des fichiers `.yaml` qui contiennent la configuration du jeu

## Jeu exemple 

Voici l'exemple d'un jeu narrat comportant le script `.narrat` suivant :

<NarratSnippetClient :scriptContent="demoScript" :autoJumpOnChange="true" :codeHeight="300" />

## Ouvrir le projet Narrat et bien se préparer

**Un jeu narrat est un simple dossier avec des fichiers dedans.** Pour commencer à écrire votre jeu, ouvrez ce dossier dans votre éditeur de texte (VS Code).

1. Ouvrez VS Code
2. Dans le menu "Fichier", cliquez sur "Ouvrir dossier"
3. Choisissez le dossier du jeu narrat que vous avez créé
4. Vous pouivez désormais naviguer dans le répertoire
5. Une bonne partie des fichiers pourraient ne pas se prêter à votre usage, vous n'avez pas besoin de vous en soucier s'ils ne correspondent pas à une envie créative
6. La plupart des fichiers qui vous intéressent sont dans les dossiers `public/data` (où se trouvent les assets et la config), et dans le dossier `src/scripts` (où se trouvent le code et les scripts narrat)

![Ouvrez un dossier dans VS Code](/guides/get-started/open-folder.png)

::: tip
Installez l'extension VS Code [Narrat Language](https://marketplace.visualstudio.com/items?itemName=NarratEngine.language-narrat) pour bénéficier d'une mise en forme syntaxique lorsque vous modifiez des scripts narrat.

VS Code devrait vous enjoindre à l'installer lorsque vous ouvrez un jeu narrat. Si ce n'est pas le cas, cliquez sur le bouton Extensions sur votre gauche, puis tapez "Narrat" dans la barre de recherche et installez l'extension.
:::

![Narrat VS Code extension install process](/guides/get-started/narrat-extension.png)

## Qu'y-a-t-il dans un jeu narrat ?

Les sections suivantes expliquent quels dossiers et fichiers interviennent dans la modification de votre jeu narrat.

### Dossier `public`

Les assets (images, musiques, etc.) et fichiers de config sont dans le dossier `config` à la racine du jeu. Ce dossier contient les assets statiques qui seront ajoutés au build final.

Toute image, fichier de config, ou autre asset dont le jeu a besoin en dehors du code se trouvent dans ce dossier.

::: tip 
On peut se référer aux assets dans le dossier `public` par leur chemin relatif. Par exemple, dans votre css, vous utiliseriez `/img/button-background.png` pour utiliser une image se trouvant dans `public/img/button-background.png`
:::

### Dossier `src`

Le dossier `src` est là où vivent vos scripts. Il y a des fichiers TypeScript pour lancer le moteur (que vous ne devrez normalement pas modifier), et surtout des fichiers de script `.narrat` dans le sous-répertoire `script` qui constituent votre jeu.

::: info
Pour un usage avancé, il est également possible de changer le code lui-même ou d'intégrer des plugins, qui se trouveront alors aussi dans le dossier `src`.
:::

## Scripts narrat

[example-narrat-script.md](../examples/example-narrat-script.md)

Les scripts Narrat sont la première brique constitutive d'un jeu narrat. Ils contienne le flow du jeu et les lignes de dialogue. Le [langage de script narrat](../scripting/language-syntax.md) est spécifiquement conçu pour Narrat.

Dans le dossier `src/scripts` se trouve un fichier `game.narrat` (potentiellement nommé différemment selon le template utilisé). C'est ici que les dialogues du jeu sont écrits. Le dialogue d'exemple montre comment utiliser quelques fonctionnalités basiques, afin que vous puissiez facilement commencer à écrire vos propres dialogues. Juste au-dessus, il y a un lien vers la page de script d'exemple afin de trouver plus de matériau de références en cas de besoin.

### Importer les scripts

Tous les scripts narrat utilisés dans un jeu sont importés et listés dans `src/scripts.ts`. Si vous souhaitez ajouter ou retirer des scripts narat à votre jeu, importez-les tout en haut de ce fichier et n'oubliez pas de les ajouter ou retirer à la liste des scripts exportés à la fin du fichier.

::: tip
Vous pouvez écrire votre jeu entier dans un seul fichier de script si vous le voulez, mais il est utile pour des questions d'organisation de le séparer en plusieurs fichiers. N'oubliez simplement pas de les importer comme montré ci-dessous.
:::

Exemple de fichier `script.ts` :

```ts
import demo from './scripts/demo.narrat';
import quest from './scripts/quest.narrat';

export default [demo, quest];
```

Les scripts narrat sont écrits dans un langage conçu pour Narrat, cf. le [guide de syntaxe](../scripting/language-syntax.md) pour plus d'information.

::: tip
Nous recommandons d'utiliser [Visual Studio Code](https://code.visualstudio.com) pour éditer des scripts narrat. Il existe une [extension de langage Narrat](https://marketplace.visualstudio.com/items?itemName=NarratEngine.language-narrat) qui rend disponible une mise en forme syntaxique très efficace.
:::

Se référer au [guide de syntaxe](../scripting/language-syntax.md) pour apprendre plus en détail comment éditer des scripts narrat.

### Scripts d'exemple

Il existe un certain nombre de [scripts narrat d'exemple](../examples/example-narrat-script.md). Les lire peut être un moyen efficace d'apprendre à faire diverses choses.

## Fichiers de config

Il y a divers fichiers de configuration dans les jeux narrat qui permettent de modifier en profondeur le comportement du moteur. 

De base, les jeux utilisent une config par défaut qui ne requiert aucune modification. Vous aurez cependant besoin de la modifier selon vos intentions et besoins.

### config.yaml

Le fichier de config contient les informations basiques du jeu. C'est là que sont définis les images, écrans, boutons, musiques, skill checks, objets, quêtes et autres.

Plus d'info sur les fichiers de config dans le [guide des fichiers de config](config-files.md).

### characters.yaml

Le fichier `characters.yaml` contient la config pour tous les personnages pouvant parler dans le jeu. Ils doivent tous avoir au moins un nom et un sprite `idle`. Le sprite sert à montrer les portraits de personnages durant les dialogues, et on doit s'y référer au moyen du chemin relatif à la valeur `imagesPath` définie dans la partie de config de ce fichier.

La couleur des noms peut être modifiée via la valeur `color`, dans la propriété `style` du personnage (n'importe quelle couleur CSS valide fait l'affaire).

Plus de détails sur la page [Personnages et portraits](../features/characters-and-portraits.md)

### Autres fichiers de config

Il y a d'autres fichiers de config pour la plupart des fonctionnalités de narrat. La meilleure façon d'apprendre à les utiliser est de consulter des templates de jeu pour les voir en action.

- [Templates de jeux tests dans le repo Narrat](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games)
- [Templates de jeux tests dans le repo narrat-examples](https://github.com/liana-p/narrat-examples)

## Et ensuite ?

Pour concevoir votre jeu, ouvrez vos fichiers de scripts `.narrat` et écrivez !

::: tip
**Naviguez dans la sidebar à gauche pour trouver divers pages et guides détaillant des fonctionnalités et leur utilisation**
:::

Vous pourriez également vouloir vous renseigner sur :

### Le guide de syntaxe du langage narrat

[Apprenez le langage de script narrat](../scripting/language-syntax.md) pour écrire votre jeu.

### Cheatsheet de référence détaillant l'ensemble des commandes

[Cette page](../commands/all-commands.md) sert de cheatsheet pour toutes les commandes disponibles dans les fichiers de scripts.

### Viewport 

[Apprenez à manipuler le viewport](../features/viewport.md) pour ajouter des arrières-plans et des boutons interactifs au viewport de votre jeu.

### Guide de personnalisation et d'application de thèmes

[Apprenez à personnaliser votre jeu avec du CSS](../guides/customising-ui.md)

### Build et release de votre jeu

[Apprenez à faire un build de votre jeu pour le distribuer](../guides/building-and-exporting.md)

### Système de skills

[Apprenez à utiliser le système de skills](../features/skills.md)

### Système d'inventaire

[Apprenez à utilser le système d'inventaire](../features/inventory.md)

### Mettre narrat à jour

Il est important de savoir [tenir Narrat à jour](/fr/guides/updating-narrat.md) pour bénéficier des nouvelles fonctionnalités et des correctifs de bugs.

<FeedbackForm title="Editing the game" slug="guides/editing-game"/>
