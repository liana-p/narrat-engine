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
