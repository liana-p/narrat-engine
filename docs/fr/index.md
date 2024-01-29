---
layout: home

hero:
  name: Narrat
  text: Créez des jeux de fiction interactive pour web et desktop
  tagline: Le moteur de jeu pour créer des RPG narratifs interactifs riches en fonctionnalités.
  image:
    src: /logo.svg
    alt: Narrat logo
  actions:
    - theme: brand
      text: Commencer
      link: /fr/guides/getting-started
    - theme: alt
      text: Site web
      link: https://narrat.dev
    - theme: brand
      text: Aperçu
      link: /guides/narrat-overview
    - theme: brand
      text: Playground Interactif
      link: https://demo.narrat.dev

features:
  - icon: 🚀
    title: Très facile à commencer
    details: Vous pouvez essayer Narrat dans votre navigateur sans rien installer. Il y a aussi un outil pour démarrer automatiquement un projet pour vous.
    link: /guides/getting-started
    linkText: Get Started
  # - icon: 📘
  #   title: RPG features out of the box
  #   details: Narrat has a built-in skill system, items, inventory, quests and more.
  #   link: https://narrat.dev
  #   linkText: Learn more on the website
  - icon: 🎲
    title: Système de skills
    details: Narrat est équipé d'un système de compétences puissant qui permet de gagner de l'XP, de monter de niveau et de réussir ou échouer des tests de compétences avec des mécaniques de lancer de dés typiques des JDR.
    link: /features/skills
    linkText: Skills Guide
  - icon: 👩‍💻
    title: Système de script facile pour débutants
    details: Narrat dispose d'un système de script simple, facile à apprendre et à utiliser. Il possède également des fonctionnalités avancées pour des jeux plus complexes.
    link: /scripting/language-syntax
    linkText: Scripting Guide
  - icon: 💻
    title: Publiez sur le web, le desktop et Steam
    details: Les jeux Narrat sont des applications web et fonctionnent sur le web dès le départ. Ils sont également livrés avec des systèmes de build préconfigurés pour la publication sur Windows, Mac, Linux et Steam.
    link: /guides/building-and-exporting
    linkText: Build and export guide
  - icon: 🔥
    title: Hot module Reloading - Pour itérer super vite
    details: Le jeu recharge le script en direct lorsque vous apportez des modifications, vous pouvez donc modifier votre écriture en cours de jeu et continuer avec les changements sans avoir besoin de redémarrer.
    link: /features/hot-module-reloading
    linkTest: Hot module reloading guide
  - icon: 🎨
    title: Thématisation UI facile et puissante avec CSS
    details: Narrat utilise CSS pour le style, vous pouvez donc facilement personnaliser l'apparence de votre jeu. CSS est très facile à apprendre, puissant et largement utilisé, vous pouvez donc trouver des ressources facilement.
    link: /guides/customising-ui
    linkText: Theming Guide
  - icon: 📜
    title: Quêtes
    details: Système de quêtes facile à utiliser avec une UI de journal de quêtes, des descriptions de quêtes et des sous-objectifs.
    link: /features/quests
    linkText: Quests Guide
  - icon: ⚙️
    title: Extrêmement personnalisable
    details: Narrat est conçu pour être personnalisable. Les fichiers de configuration yaml sont très faciles à modifier et peuvent vous permettre de contrôler précisément comment chaque fonctionnalité du moteur est utilisée.
    link: /guides/config-files
    linkText: Config Guide
  - icon: 🎨
    title: Ajouter du visuel facilement
    details: Le système de viewport permet aux jeux d'afficher des écrans pouvant contenir des sprites interactifs, du texte et des boutons. Vous pouvez utiliser cela pour créer des visual novel, point and clicks, etc.
    link: /features/viewport
    linkText: Viewport Guide
  - icon: ✍️
    title: Personnages
    details: Système de personnages avec portraits et poses, similaire à Disco Elysium.
    link: guides/config-files#characters-config
    linkText: Characters config guide
  - icon: 🛒
    title: Inventaire
    details: Système d'inventaire prêt à l'emploi avec une UI et des items customisables qui peuvent etre utilisés par les joueurs.
    link: /features/inventory
    linkText: Items Guide
  - icon: 🎧
    title: Audio sans complications
    details: Le système audio est simple mais puissant, vous permettant d'avoir plusieurs canaux de musique, d'effets sonores et de sons d'ambiance.
    link: /features/audio
    linkText: Audio Guide
  - icon: 🏆
    title: Achievements
    details: Système d'achievements intégré avec une interface utilisateur. Vous pouvez même sauvegarder des données globales sur plusieurs parties de jeu.
    link: /features/achievements
    linkText: Achievements Guide
  - icon: 🎥
    title: Support Video
    details: Narrat prend en charge les vidéos pour les arrière-plans et les portraits de personnages, permettant des jeux FMV ou des arrière-plans animés pré-rendus.
    link: /features/viewport#video-backgrounds
    linkText: Find how to use it
  - icon: ⚙️
    title: Systeme de config custom facile
    details: Le système de paramètres vous permet d'ajouter facilement des paramètres personnalisés à votre jeu. Le moteur s'occupe de les afficher, de permettre au joueur de les modifier et de les sauvegarder.
    link: /features/game-settings
    linkText: Game Settings Guide
  - icon: 👾
    title: Système de sprites pour utilisation avancée
    details: Un système de sprites permet la création dynamique de sprites et de texte avec un graphe de scène pour créer dynamiquement des éléments personnalisés, interface utilisateur, etc.
    link: /features/dynamic-sprites-text-objects
    linkText: Screen Objects docs
  - icon: 🎥
    title: Animations
    details: Narrat peut animer n'importe quoi sur l'écran facilement
    link: /features/animations
    linkText: Animations Guide
  - icon: 🎮
    title: Gamepad
    details: Narrat supporte les gamepad sans effort
    link: /features/gamepad
    linkText: Gamepad Guide
  - icon: ⚙️
    title: API de plugins puissante
    details: Narrat dispose d'une API de plugins puissante qui vous permet d'étendre le moteur avec des fonctionnalités personnalisées. Les plugins peuvent ajouter de nouvelles fonctionnalités complètes au moteur via des commandes de script personnalisées, une interface utilisateur personnalisée et même avoir leurs propres données de sauvegarde.
    link: /plugins/plugins
    linkText: Plugins Guide
---

::: warning
**Note:** Le site de documentation est seulement partiellement traduit en français. La plupart des pages sont en anglais.

Vous pouvez aider à traduire la documentation en français en contribuant sur [le dépôt GitHub](https://github.com/liana-p/narrat-engine). La documentation est écrite en fichier [Markdown](https://www.markdownguide.org/) avec l'outil [Vitepress](https://vitepress.dev) et est facile à modifier.
:::

<!--
# Narrat

![example workflow](https://github.com/liana-p/narrat-engine/actions/workflows/main.yml/badge.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/55d4b9ba-62b7-4c43-86ce-8bc2aaf98643/deploy-status)](https://app.netlify.com/sites/ornate-pie-561978/deploys)

## Getting Started

[Getting Started](/guides/getting-started.md)

## Introduction

Narrat is a game engine for making interactive narrative RPGs packed with features. Create your game by editing with a Simple scripting syntax. It supports Skills with skill check rolls, an Items inventory, and has a Quests System. The script system is very powerful and allows branching choices, functions, variables and conditions.

::: tip
There are many more features to narrat, see more [on the website](https://narrat.dev)
:::

There is an [online demo](https://demo.narrat.dev/). It contains a built version of the [narrat demo example game](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games/demo/data).

Games are written in narrat script files. -->
