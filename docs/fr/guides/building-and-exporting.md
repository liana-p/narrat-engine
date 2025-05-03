---
title: Réaliser un build et exporter son jeu Narrat
description: Suivez ces étapes pour réaliser un build et exporter un jeu Narrat pour le web ou comme application de bureau
---

# Réaliser un build et exporter son jeu Narrat

## Réaliser un build jouable en ligne

Il est possible d'exporter son jeu comme site web statique

```bash
npm run build
```

::: tip
Ceci générera un build web statique de votre jeu dans le dossier `dist/`
:::

## Réaliser un build de type application de bureau

Le template par défaut est configuré pour utiliser [electron](https://www.electronjs.org) et [electron-forge](https://www.electronforge.io) pour facilement transformer votre jeu en application de bureau.

## Prérequis

- Avoir [git](https://git-scm.com) installé
- Si vous installez git sur windows, vous pouvez garder les réglages par défaut pendant le processus de configuration

Vous pouvez alors lancer vore jeu comme application de bureau :

```bash
npm run electron
```

## Réaliser un build

Vous pouvez également en faire un exécutable (fonctionne sous Windows, Mac, Linux) :

```bash
npm run package
```

::: tip
Ceci crééera une application adaptée à votre OS dans le dossier `out/`, que vous pouvez distribuer en créant une archive .zip du dossier.
:::

Veuillez consulter la [documentation electron](https://www.electronjs.org/docs/latest/) si vous souhaitez personnaliser le processus de build de votre application, la taille de la fenêtre et autres options (tip : tout cela se passe généralement dans les fichiers `electron-xxxxxx.js` à la racine du projet)

## Notes d'importance sur la distribution

Quelques informations bonnes à savoir si vous distribuez un projet sérieux pour lequel vous voulez éviter les ennuis :

- Assurez-vous de bien distribuer les bons fichiers : le contenu de `out/` si vous distribuez un exécutable, ou une archive .zip de `dist/` pour le web. N'incluez pas par accident vos fichiers de code source.
- Par défaut, le fichier `package.json` du jeu template possède un champ `license` spécifiant `MIT`. Cette licence s'applique au jeu template lui-même, mais vous pouvez supprimer ou modifier cette option pour ne pas accidentellement déclarer que votre jeu est sous licence MIT (sauf si vous souhaitez que ce soit le cas). De la même façon, vous pouvez modifier ou supprimer le fichier `LICENSE` à la racine du projet.
- Si vous souhaitez distribuer le jeu sur Steam, n'oubliez pas de modifier le fichier `steam_appid.txt` et de l'inclure dans votre build final avec l'exécutable.

## Distribution sur itch.io 

Itch.io est une plateforme de distribution courante pour les jeux Narrat et est plus globalement orientée "petits jeux indés".

Vous pouvez y distribuer votre jeu comme jeu web ou comme exécutable.

### Distribution comme jeu web sur itch.io

Itch.io attend un fichier .zip contenant une application web, c'est à dire l'archive .zip d'un dossier contenant au moins un fichier `index.html`.

Lorsque vous exécuterez la commande `npm run build`, celle-ci génèrera un dossier `dist` contenant une version web de votre jeu. Vous pourrez créer une archive .zip de ce dossier et l'uploader sur itch.io comme jeu web ; il sera alors jouable directement sur sa page.

### Distribution d'une application de bureau sur itch.io

Pour distribuer votre jeu comme application de bureau standard sur itch.io, suivez les instructions pour exporter votre jeu pour l'OS pour lequel vous souhaitez créer un exécutable, puis uploadez-le sur itch.io en suivant la procédure normale.

## Générer une configuration ou un package similaire pour la distribution du jeu

Electron peut créer des packages de ditribution de votre jeu pour toutes les plateformes usuelles. Vous trouverez dans l'installation par défaut de Narrat les configurations de distribution pour Windows, mac et Linux.

## Créer un distribuable (un"fichier de configuration")

Pour créer un distribuable, utilisez la commande suivante :

```bash
npm run make
```

:::tip
Ceci créera un distribuable pour votre OS dans le sous-dossier `make` du dossier `out`
:::

Cette commande utilise la commande [make](https://www.electronforge.io) d'`electron-forge` pour générer un distribuable de type `setup` pour Windows ou `DMG` pour Mac.

Elle utilise la configuration définie à la section `config` du fichier `package.json`, qui recense les constructeurs disponibles et leurs configurations. À cet endroit, vous pouvez modifier certaines valeurs ou ajouter de nouveaux constructeurs.

Les options configurées par défaut sont utiles pour publier un jeu simple, mais en cas de distribution sur des app stores ou dans un format spécifique, consultez les sections ci-dessous pour plus de détails sur ces options.

Dans certains cas, vous aurez peut-être besoin d'ajouter de nouvelles dépendances à votre package pour pouvoir utiliser un nouveau constructeur. Ainsi, pour utiliser le constructeur .pkg pour l'app store MacOS, vous aurez besoin d'exécuter `npm install --save-dev @electron-forge/maker-pkg`.

## Distribution sur Windows 

La procédure par défaut (et recommandée par Electron) de créer un distribuable Windows est d'utiliser [Squirrel.Windows](https://www.electronforge.io/config/makers/squirrel.windows), qui est pré-configuré dans les jeux Narrat et devrait être utilisé par la commande `npm run make` sous Windows. Vous pouvez consulter sa configuration dans le fichier `package.json`.

Il y a également l'option de créer un installeur .msi avec le [WiX MSI maker](https://www.electronforge.io/config/makers/wix-msi) que vous pouvez configurer dans `package.json` si désiré.

Enfin, l'[AppX maker](https://www.electronforge.io/config/makers/appx) vous permet de distribuer votre jeu sur le Windows Store.

 ## Distribution sur MacOS

 Lancer `npm run package` sur Mac devrait créer un fichier qui peut être exécuté sous MacOS, mais si vous souhaitez distribuer votre applicatino comme .dmg ou comme .mkg, ou sur l'App Store, vous devrez ajouter votre propre configuration de [DMG maker](https://www.electronforge.io/config/makers/dmg) ou [pkg maker](https://www.electronforge.io/config/makers/pkg). Ceci devrait vous permettre de créer des fichiers DMG ou PKG adaptés.

 ## Distribution sur Linux

 Il y a toutes sortes de façons de distribuer des applications Linux, selon les distros et leurs gestionnaires de paquets. La liste des constructeurs de electron-forge recense plusieurs options disponibles, dont [.deb](https://www.electronforge.io/config/makers/deb) et [.snap](https://www.electronforge.io/config/makers/snapcraft).

 ## Distribuer sur Steam (expérimental)

 [Distribuer sur Steam](/guides/steam-publishing.md)