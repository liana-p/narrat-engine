---
description: Un jeu narrat a besoin de divers fichiers de config pour fonctionner
---

::: warning
Le fonctionnement des fichiers de config a changé pour leur ajouter une fonctionnalité de [live reloading](/features/config-hot-reloading.md). la documentation pourrait donc ne pas être totalement à jour. 

Le changement le plus important est que les fichiers de config sont dans le dossier `src/config` plutôt que dans `public/data`. Le fichier principal `config.yaml` est désormais `common.yaml`, et les sections de `config.yaml` spécifiant le chemin d'accès autres fichiers de config peuvent être supprimées.

Le reste n'a pas changé.
:::

# Fichiers de config

Les fichiers de config sont écrits en [yaml](https://fileinfo.com/extension/yaml) par défaut, bien que vous puissiez aussi utiliser du json (ce qui n'est pas recommandé).

## Introduction

Un jeu narrat nécessite quelques fichiers de config pour fonctionner. Par exemple, `common.yaml` est là où la plupart des réglages sont configurés, et `characters.yaml` est là où sont définis les divers personnages pouvant s'exprimer dans le jeu. En plus de cela, il y a des fichiers pour des fonctionnalités particulières (comme `items.yaml` ou `skills.yaml`).

Il existe des fichiers de config disponibles, et un jeu narrat vient d'office avec des fichiers prédéfinis. 

[example-config.md](/examples/example-config.md)

## Modifier la config

Par défaut, les fichiers de config doivent se trouver dans `src/config`. Si vous souhaitez changer cet emplacement, modifiez `src/index.ts` en conséquence.

Le fichier `index.ts` dans `src/config` est celui qui importe et unifie tous les fichiers de config, vous aurez donc toujours besoin de le mettre à jour quand vous ajoutez, supprimez ou déplacez ces derniers.

Le fichier `config.yaml` est un fichier [yaml](https://fileinfo.com/extension/yaml) qui devrait déjà contenir tout ce qui est nécessaire à l'utilisation d'un template, mais certaines propriétés optionnelles peuvent être ignorées. Pour un exemple, consultez la [page de config d'exemple](/examples/example-config.md). Vous voudrez peut-être aussi consulter d'autres fichiers yaml dans les jeux d'exemple.

## Autres fichiers de config

Fréquemment, des sections de `config.yaml` référencent d'autres fichiers `yaml`. Le but est de diviser la config en blocs plus faciles à manipuler permettant de modifier uniquement le fichier régissant une fonctionnalité (comme `skills.yaml` ou `items.yaml`).

La section Fonctionnalités et guides de cette documentation peut fournir d'autres informations concernant l'utilisation de chaque option.

:::tip
Le [dossier d'exemples](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games) présente les configs d'un certain nombre de jeu d'exemples qui peuvent vous aider à découvrir les options disponibles.
:::

## Validation

**Les fichiers de config sont validés par le moteur**. Cela veut dire qu'au lancement du jeu, le moteur montrera des messages d'erreur détaillant toute valeur manquante ou erronnée dans les fichiers de config. **Cela garantit que votre config est toujours correcte**.

## Options de config

Il y a beaucoup d'options disponibles dans la config. Celles-ci ne sont pas toujours documentées, mais **la documentation pour une fonctionnalité spécifique détaille ou explique souvent les options de config associées**. 

:::details <strong>Identifier des options de config depuis la source (utilisation avancée)</strong>

**Plus d'utilisation avancée :** pour voir la définition exacte des fichiers de config et de leurs options, consulter le [dossier de config dans le code du moteur](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/src/config). C'est ici que sont définies toutes les options de config au format json. Ces fichiers sont plus difficiles à lire, mais il s'agit de la source qui spécifie les options possible au niveau du code, et ce sera probablement la référence la plus à jour à votre disposition.

Ainsi :

```ts
export const ObjectiveDataSchema = Type.Object({
  description: Type.String(),
  hidden: Type.Optional(Type.Boolean()),
});
export const QuestDataSchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
  objectives: Type.Record(Type.String(), ObjectiveDataSchema),
});
```

Cette config de quête signifie qu'une quêtre possède les propriétés suivantes :

- `title` : une valeur `string` obligatoire
- `description` : une valeur `string` obligatoire
- `objectives` : une liste clé-valeur d'objectifs définie dans `ObjectiveDataSchema`

Ensuite, la config des objectifs présente :

- `description` : une valeur `string` obligatoire
- `hidden` : une valeur booléenne **optionnelle**

:::

## Fonctionnement de la config

Le moteur procède ainsi pour charger la config : 

- Chaque section de config possède une **config par défaut**. Cette config par défaut fournit des valeurs par défaut aux options qui n'ont pas nécessairement besoin d'être changées.
- Le moteur charge **les fichiers de config du jeu**. Ceux-ci viennent du jeu à proprement parler.
- **Chaque config par défaut est fusionnée avec la config du jeu** pour que cette dernière applique les modifications effectuées.

## Config des personnages

En plus de `common.yaml`, il existe un fichier `characters.yaml` contenant la config de tous les personnages dans le jeu.

Voir plus d'info sur la page [Guide des personnages et portraits](/features/characters-and-portraits.md)

### Autres fichiers de config 

Il y a des fichiers de config disponibles à la modification pour la plupart des fonctionnalités de Narrat. La meilleure manière d'apprendre à les manipuler est de consulter les jeux exemples et de voir comment ils sont utilisés.

- [Jeux test dans le repo Narrat](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/examples/games)
- [Jeux exemples dans le repo narrat-examples](https://github.com/liana-p/narrat-examples)