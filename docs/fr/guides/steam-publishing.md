---
description: Si vous avez développé un jeu Narrat, vous voudrez peut-être le publier sur Steam. Cette page explique comment procéder.
---

# Publier sur Steam (Intégration Steamworks)

## Intégration Steamworks de Narrat

Narrat dispose maintenant d'une intégration [Steamworks](https://partner.steamgames.com/) par défaut dans son template. Elle devrait permettre à n'importe quel jeu Narrat de tourner sur Steam avec une intégration basique (autrement dit, l'overlay Steam est fonctionnel).

Voir la page [Build et Export](/guides/building-and-exporting) pour acquérir les notions élémentaires liées à l'assemblage/build et à l'export des jeux Narrat.

## Comment réaliser un build pour Steam

L'ajout de l'intégration est récent, quelques étapes manuelles sont donc nécessaires pour mettre celle-ci en place. À des fins de praticité, cela peut être amené à changer dans le futur.

### Première mise en place

1. Créer un jeu sur la base du template narrat le plus récent (Si vous mettez à jour un jeu existant, la façon la plus simple de procéder est probablement de copier les fichiers de configuration, de scripts et d'assets graphiques et les coller dans une nouvelle installation du template narrat le plus récent)
2. Modifier `steam_appid.txt` à la racine du dossier et entrer l'identifiant steam app. Celui par défaut (`480`) peut être utilisé pendant le développement, puisqu'il s'agit de la version de test pour Steam.
3. Dans `electron-main.js`, vers le haut du fichier, réglez `useSteam` sur `true`
4. dans `src/index.ts`, vers le haut du fichier, réglez `useSteam` sur `true`

## Lancer au sein de Steam et assembler un package pour Steam

Steam doit être lancé pour qu'un jeu utilisant Steamworks puisse fonctionner correctement, and vous devez posséder l'application correspondant à l'identifiant Steam app en cours d'utilisation.

Pour exécuter directement l'app, entrez `pnpm run electron` (après avoir assemblé un build du jeu) ou `pnpm desktop` (afin d'assembler le jeu puis de lancer electron automatiquement). Cette manipulation devrait permettre à l'overlay Steam de fonctionner.

Pour assembler un package du jeu avant publication, exécutez `pnpm run package`. Le jeu assemblé sera présent dans le dossier `out`.

## Ajouter le jeu à Steam

Avec le jeu assemblé dans le dossier `out`, vous pouvez vous rendre dans Steam, choisir `Ajouter un jeu non Steam`, puis naviguer jusqu'au répertoire contenant `narrat-template.exe` à l'intérieur des sous-dossiers contenus dans le dossier `out`, et enfin ajouter cet exécutable à Steam. Il devient alors possible de lancer le jeu via Steam.

Pour publier en propre le jeu sur Steam, consulter la documentation relative au statut de partenaire et à la publication d'une application. Si les conditions de publication sont remplies, l'application exportée dans le dossier `out` est compatible Steam.

## Limitations

- Actuellement, le système n'assemble les jeux que pour Windows 64 bit. Pour changer cela, il faut modifier la portion du script `package` dans `package.json` qui copie `steam_appid.txt` afin qu'elle vise le bon dossier (qui dépend de l'architecture pour laquelle vous désirez assembler un build).
- Il n'existe actuellement pas d'implémentation dans Narrat des fonctionnalités spécifiques à Steam (achievements et autres). Vous pouvez écrire un plugin pour les fonctionnalités avancées dont vous pourriez avoir besoin, la [librairie Steamworks.js](https://github.com/ceifa/steamworks.js) devant répondre à la plupart des besoins. Pour plus d'informations sur la façon dont Steam a été integré à Narrat, voir [ce blog post](https://www.liana.one/integrate-electron-steam-api-steamworks)
