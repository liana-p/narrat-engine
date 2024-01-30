---
title: Découvrez Narrat et créez un jeu en une minute
description: Ce guide explique comment commencer à utiliser le moteur de jeu Narrat en une minute.
---

::: warning
**Note:** Le site de documentation est seulement partiellement traduit en français. La plupart des autres pages sont en anglais.

Vous pouvez aider à traduire la documentation en français en contribuant sur [le dépôt GitHub](https://github.com/liana-p/narrat-engine). La documentation est écrite en fichier [Markdown](https://www.markdownguide.org/) avec l'outil [Vitepress](https://vitepress.dev) et est facile à modifier.
:::

# {{ $frontmatter.title }}

Commencer avec Narrat est très rapide. Il existe un template prêt à l'emploi qui vous permettra de lancer votre jeu en une minute.

## Sur cette page

[[toc]]

## À quoi sert Narrat

**Narrat se spécialise dans l'aide à la création de jeux narratifs sans programmation.** Si vous souhaitez créer des jeux d'action ou des jeux avec de nombreuses fonctionnalités personnalisées, vous préférerez sans doute un moteur de jeu plus généraliste. Vous pouvez en savoir plus sur les fonctionnalités, la philosophie, les limitations de Narrat et la façon d'ajouter de nouvelles fonctionnalités sur [cette page](/others/what-can-narrat-do).

## Démo Interactive

Si vous souhaitez avoir une idée rapide de comment Narrat fonctionne sans créer de projet, l'[éditeur interactif](https://demo.narrat.dev/) vous permet de modifier en temps réel une démo dans votre navigateur.

## Guide vidéo

Si vous préférez des instructions écrites, passez à la [section suivante](#text-instructions).

Si vous préférez suivre une vidéo, cette vidéo d'une minute montre toute l'étape de configuration, du début à l'exécution du jeu.

<iframe width="560" height="315" src="https://www.youtube.com/embed/516YTDxSO9Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Instructions écrites

### Prérequis

- Être sur un ordinateur exécutant Windows, MacOS ou Linux.
- Avoir [node.js](https://nodejs.org/fr/) 20+ installé (choisissez la version LTS actuelle sur le site Web).
- Un éditeur de texte, nous recommandons [VS Code](https://code.visualstudio.com/Download).

### Création du projet de jeu

Ouvrez un terminal dans un dossier de votre choix (sous Windows, vous pouvez faire un clic droit dans votre dossier tout en maintenant la touche Shift et choisir "Ouvrir une fenêtre PowerShell ici")

::: details Aide pour l'ouverture du terminal

![Ouverture du terminal](/guides/terminal/terminal.png)

Pour plus d'informations sur la façon d'ouvrir un terminal dans un dossier sur Windows et d'autres systèmes d'exploitation, consultez [ce lien](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

:::

Une fois ouvert, vous pouvez exécuter la commande suivante :

```bash
npm create narrat@latest
```

Cela téléchargera Narrat et vous posera quelques questions pour configurer votre projet. Vous pouvez choisir parmi quelques modèles de jeu pour commencer. Vous pouvez maintenant suivre les instructions de l'outil pour exécuter le jeu, ou suivre le guide "Lancer le jeu" ci-dessous.

::: details Fonctionnement

Le template Narrat est essentiellement un template pour un projet web quasiment vide, avec Narrat en tant que bibliothèque.

node.js est le moteur JavaScript utilisé pour exécuter notre projet (et l'assembler ou l'exporter ultérieurement en tant que jeu exécutable).

Nous utilisons [npm](https://www.w3schools.com/whatis/whatis_npm.asp) pour installer des bibliothèques dans le jeu. npm est simplement un gestionnaire de paquets pour installer des bibliothèques JavaScript avec node.js.

Il y a un fichier [package.json](https://github.com/liana-p/narrat-engine-template/blob/main/package.json) à la racine du template, qui est un fichier standard de node.js pour définir un projet et ses dépendances, qui sont installées via npm. À l'intérieur de la section `dependencies` de ce fichier, vous trouverez Narrat accompagné d'un numéro de version. Celui-ci indique au projet quelle version de Narrat installer.

Notre template utilise npm pour télécharger et installer Narrat (et d'autres dépendances) et préparer le jeu à fonctionner. Ensuite, en utilisant des scripts npm, nous pouvons utiliser des commandes pour assembler/exporter le jeu (qui utilisent tous node.js sous le capot d'une manière ou d'une autre).

:::

### Installer les bibliothèques (uniquement la première fois ou lors d'une mise à jour)

En configurant votre jeu Narrat, [ouvrez un terminal à l'intérieur du dossier](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux/)

Il y a une première commande pour installer les dépendances (bibliothèques) lors de la première utilisation :

```bash
npm install
```

::: details Si vous obtenez des avertissements lors de l'exécution de npm install

À moins que vous ne voyiez de véritables erreurs, les avertissements peuvent généralement être ignorés.

Vous verrez probablement npm se plaindre de "problèmes de sécurité". Ceux-ci sont de faux positifs et peuvent être ignorés, ils sont causés par une mauvaise gestion de la sécurité par NPM. Ces problèmes de sécurité sont sans rapport avec l'utilisation de Narrat. Vous pouvez vous renseigner à ce sujet en lisant [cet article](https://overreacted.io/npm-audit-broken-by-design/) de Dan Abramov, le créateur de React.

:::

## Lancer le jeu

```bash
npm start
```

Cela devrait ouvrir un onglet de navigateur avec le jeu lancé après un court temps d'assemblage. On peut accéder au jeu  à l'adresse <a href="http://localhost:5173/" target="_blank" rel="noreferrer">localhost:5173</a>

Le jeu est prêt à être édité !

::: info
Ces commandes `npm` proviennent de node.js. Si les commandes ne sont pas reconnues, vous n'avez probablement pas installé node.js correctement. [Plus d'informations ici](https://www.stackchief.com/tutorials/npm%20install%20%7C%20how%20it%20works).
:::

## Aperçu de Narrat

Maintenant que le jeu est lancé, vous voudrez peut-être consulter [Une vision d'ensemble de Narrat](/guides/narrat-overview) pour comprendre les différentes parties d'un jeu Narrat et comment les utiliser.

## Éditer le jeu

Il est maintenant facile de créer un jeu en éditant les scripts et les fichiers de configuration de Narrat !

[Editer le jeu](/guides/editing-game)

## Assemblage et publication

[Assemblage et exportation](/guides/building-and-exporting)

## Documentation des commandes

[Documentation des commandes](/commands/all-commands)

<FeedbackForm title="Commencer" slug="fr/guides/getting-started"/>
