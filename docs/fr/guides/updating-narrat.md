---
title: Mettre Narrat à jour
description: Narrat est fréquemment mis à jour avec de nouvelles fonctionnalités, améliorations et corrections de bugs ; il est recommandé de le garder à jour.
---

# Mettre Narrat à jour

## Le changelog

Avant de mettre à jour, il est important de noter qu'il existe un [changelog](https://github.com/liana-p/narrat-engine/blob/main/CHANGELOG.md) sur GitHub qui détaille ce qui a changé dans les dernières versions.

En cas de **modification radicale** (c'est à dire, une modification du moteur exigeant des utilisateurs qu'ils effectuent un changement dans leur code pour que celui-ci continue à fonctionner), celle-ci est très clairement mentionnée dans le changelog.

::: warning

Lors de la mise à jour vers une nouvelle version, vérifier dans le changelog s'il y a des **modifications radicales** est une bonne habitude à prendre.

:::

::: tip

Il arrive fréquemment que de nombreuses fonctionnalités soient ajoutées à Narrat sans être documentées ; lire le changelog est un bon moyen de les découvrir.

:::

## Comment faire la mise à jour

La version de Narrat utilisée par un jeu est celle spécifiée dans la partie `dependencies` du fichier `package.json` situé à la racine du jeu. Par exemple :

![package.json](/guides/updating/image.png)

Pour mettre à jour, entrez la commande `pnpm install narrat@latest` dans le terminal, ce qui sélectionnera la dernière version en date.

Sinon, il est également possible de renseigner un numéro de version spécifique dans `package.json` puis d'entrer `pnpm install` dans le terminal pour installer cette version.

Pour suivre les différentes versions et savoir laquelle est la plus récente, visitez la [pag pnpm pour Narrat](https://www.npmjs.com/package/narrat)

::: warning

Il arrive que `pnpm` ne sélectionne pas les nouvelles versions. Si vous n'êtes pas certain·e que Narrat s'est correctement mis à jour, vous pouvez supprimer le dossier `node_modules` (où sont installées les bibliothèques) et entrer à nouveau `pnpm install`

Vous pouvez également vérifier [quelle version de Narrat est en cours d'exécution](https://docs.narrat.dev/troubleshooting/troubleshooting.html#check-which-version-of-narrat-is-running)
:::
