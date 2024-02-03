---
title: Vue d'ensemble d'un jeu Narrat
description: Jetons un oeil à ce qui fait un jeu Narrat, les éléments qui le composent, et comment il fonctionne
---

# {{ $frontmatter.title }}

Narrat est un moteur de jeu pour jeux narratifs. Sous cette appellation large, Narrat peut vous aider à créer différents types de jeux, mais il excelle particulièrement dans les jeux basés sur des histoires à embranchement et les jeux présentant des mécaniques de JDR sur table.

## Éléments d'un jeu Narrat

Examinons une capture d'écran du jeu Narrat test afin de voir quels en sont les éléments. Notez que de vrais jeux peuvent présenter une interface complètement différente, et qu'il s'agit simplement ici de la disposition par défaut. 

L'image suivant est une capture d'écran d'un jeu-test avec quelques éléments génériques représentant les fonctionnalités de base de Narrat.

![Narrat Overview](./narrat-overview/narrat-overview.webp)

::: tip
Cliquez sur un élément de la liste pour vous rendre à la section correspondante.
:::

1. [Panneau visuel](#Panneau-visuel)
2. [Panneau de dialogue](#dialog-panel)
3. [Boutons du panneau visuel](#viewport-buttons)
4. [Statistiques du HUD](#hud-stats)
5. [Sprites](#sprites)
6. [Auto/Skip](#auto-skip)
7. [Choix et bouton Continuer](#choices-and-continue)
8. [Portraits de personnages](#character-portraits)
9. [Système et menu](#system-and-menu)
10. [Menu de déboguage](#debug-menu)

### Panneau visuel

C'est ici que les éléments visuels du jeu sont affichés. Par défaut, il englobe tout l'écran de jeu, tandis que le panneau de dialogue se surperpose à lui. 

Le panneau visuel affiche l'**écran** actuel du jeu. Chaque écran possède un arrière-plan (image ou vidéo), et peut contenir des boutons et des sprites.

Apprenez-en plus sur le panneau visuel avec le [Guide du panneau visuel](../features/viewport.md]

### Panneau de dialogue

C'est ici que l'histoire et les dialogues du jeu sont affichés. La plupart des interactions du joueur se déroulent ici, puisque c'est là que le joueur effectue ses choix et fait avancer l'histoire.

Apprenez-en plus sur le panneau de dialogue avec le [Guide du panneau de dialogue](../features/dialog-panel.md)

![Panneau de dialogue](./narrat-overview/dialog-panel.png)

### Boutons du panneau visuel

Les écrans du panneau visuel peuvent peuvent comporter des boutons, qui peuvent être utilisées pour déclencher des événements quand le joueur clique dessus. Les boutons peuvent ne comporter que du texte ou avoir une image d'arrière-plan.

Apprenez-en plus sur les boutons du panneau visuel avec la [Section boutons du panneau visuel](../features/viewport.md#screens-config)

[Boutons du panneau visuel](./narrat-overview/buttons.png)

### Statistiques du HUD (Heads Up Display)

Un jeu Narrat peut définir diverses "statistiques du HUD", des nombres qui sont mis à jour et affichés de manière particulière sur l'écran. Ceci permet de créer facilement une interface pour des éléments tels qu'une barre de santé, de l'argent, etc.

Apprenez à les utiliser avec la page [Statistiques du HUD](../features/hud-stats.md)

![HUD Stats](./narrat-overview/hud-stats.png)

### Sprites

Les sprites sont similaires aux boutons, mais ils sont créés dynamiquement pendant le jeu par des scripts Narrat. Alors que les boutons sont complètement statiques et liés à un écran spécifique, les sprites sont plus versatiles, et aussi plus complexes. 

Apprenez-en plus avec le [Guide des sprites et textes dynamiques](.//features/dynamic-sprites-and-text-objects.md)

![Sprite](./narrat-overview/sprite.png)

### Auto/Skip

Les jeux Narrat ont des boutons auto et skip, comme il est fréquent dans les visual novels. Le bouton auto fera automatiquement avancer l'histoire (à vitesse normale), tandis que le bouton skip passera jusqu'au prochain choix ou jusqu'à la fin du script en cours.

### Choix et bouton Continuer

La section située en bas du panneau de dialogue est celle où le joueur pourra faire ses choix ou faire progresser l'histoire. La plupart des interactions avec le jeu se déroulent ici.

![Choix](./narrat-overview/choices.png)

### Portraits de personnages

Lorsqu'un personnage parle, il dispose d'un portrait affiché à côté du panneau de dialogue. Vous pouvez avoir différents personnages avec chacun différentes poses pour leurs dialogues, chaque pose associée à une image différente.

Apprenez-en plus avec la page [Personnages et portraits](.//features/characters-and-portraits.md)

![Portraits](./narrat-overview/portrait.png)

### Système et menu

Le bouton système ouvre un menu de paramètres généraux, tandis que le bouton menu ouvre un menu dédié à l'interaction avec certaines fonctionnalités comme l'inventaire, les compétences, les quêtes et les achievements

![Boutons système et menu](./narrat-overview/system-menu.png)

#### Menu système

![Menu système](./narrat-overview/system.png)
Ce menu affiche diverses options système

#### Menu 

![Menu](./narrat-overview/menu.png)
Ce menu permet l'accès à diverses fonctionnalités :

- [Inventaire](../features/inventory.md)
- [Compétences](../features/skills.md)
- [Quêtes](../features/quests.md)
- [Achievements](../features/achievements.md)

### Menu de déboguage

Ce bouton n'apparaît qu'en mode déboguage (il est automatiquement retiré dans les versions assemblées du jeu), et donne accès à divers outils qui vous aident à déboguer votre jeu.

::: tip
Vous serez sans doute aussi intéressés par le [Guide de dépannage](.//troubleshooting/troubleshooting.md) pour tout ce qui concerne le déboguage !
:::
