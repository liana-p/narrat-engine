---
title: Utiliser des polices d'écriture personnalisées avec Narrat
description: Comment ajouter des polices d'écriture à votre jeu Narrat
---

# Utiliser des polices d'écriture personnalisées avec Narrat 

Vous voulez probablement utiliser des polices d'écriture spécifiques dans vos jeux. C'est chose facile avec Narrat, car le moteur est basé sur des technologies web et peut être [modifié avec du CSS](./personnaliser-l'interface.md).

Pour utiliser ces polices, vous aurez besoin de charger une police de caractères web. ([voir ci-dessous](#à-propos-des-polices-web)). Pour les polices pré-incluses de base, vous pouvez utiliser les polices par défaut disponibles dans le CSS.

# Comment utiliser une police d'écriture dans son CSS

En général, utiliser une police dans son CSS requiert de la spécifier dans une classe CSS (dans `src/css/main.css`):

```
body {
  font-family: `Ma-police`;
}
```

::: warning
Vous ne pouvez pas simplement utiliser n'importe quelle police installée sur votre PC ! Il vous faut déclarer des <u>polices web</u> pour pouvoir les utiliser dans votre jeu. Voir plus bas !
:::

## À propos des polices web

La première chose à savoir est la suivante : un site web utiliser des [polices web](https://design.tutsplus.com/tutorials/web-fonts-in-60-seconds--cms-29695), différentes des polices de caractères classiques.
Sur votre PC, vous pouvez installer des polices, mais sur le web, les polices doivent fonctionner quelle que soit la machine qui les affichent ; on les charge donc depuis internet.

Par conséquent, pour utiliser une police personnalisée dans votre jeu Narrat, vous devez lui faire charger une police web.

::: tip
Certaines [polices par défaut](https://www.w3schools.com/csSref/css_websafe_fonts.php) sont considérées comme sûres pour un usage sur le web.
:::

## Comment déclarer une police web dans un jeu Narrat

Puisqu'un jeu Narrat est une simple page web, vous pouvez installer une police web de la même façon que vous le feriez pour n'importe quel site web. Cela requiert en général de copier-coller un morceau de HTML et de CSS pour s'assurer que la police est chargée et prête à l'emploi.

Dans notre cas, voici comment procéder. Admettons que vous avez le fichier d'une police prête à être utilisée. Vous devez simplement ajouter une directive [`@font-face`](https://www.w3schools.com/css/css3_fonts.asp) dans votre CSS.

Dans notre exemple, je vais utiliser la police [Agdasima](https://fonts.google.com/specimen/Agdasima) depuis Google Fonts.

### Trouver une police web et ajouter son fichier à votre jeu

Placez la police que vous voulez utiliser dans le dossier `public` pour qu'elle soit accessible. Dans notre cas, elle sera dans le dossier `public/fonts/Agdasima`.

### Charger la police dans votre CSS

Dans votre fichier `src/css/main.css`, ajoutez la directive `font-face` suivante pour chaque variante de votre police (dans mon cas, une `regular` et une `bold`).


```css
/* Police "Regular"  */
@font-face {
  font-family: 'Agdasima';
  font-style: normal;
  font-weight: normal;
  src: url('./fonts/Agdasima/Agdasima-Regular.ttf') format('woff2');
}
/* Police "Bold" */
@font-face {
  font-family: 'Agdasima';
  font-style: normal;
  font-weight: bold;
  src: url('./fonts/Agdasima/Agdasima-Bold.ttf') format('woff2');
}
```

### Utiliser la police dans votre jeu

Si vous désirez forcer l'usage de votre police au lieu de celle par défaut, vous pouvez changer la variable `--font-family` utilisée par Narrat.

```css
#narrat-app {
  /* Customise CSS variables here. They will override the existing narrat ones. You can also add your own variables */
  /* Personnalisez ici les variables CSS. Elles seront appliquées en lieu et place de celles existantes. Vous pouvez également ajouter vos propres variables. */
  --bg-color: #131720;
  --text-color: #d9e1f2;
  --primary: hsl(255, 30%, 55%);
  --focus: hsl(210, 90%, 50%);
  --secondary: #42b983;
  --font-family: 'Agdasima', sans-serif; // [!code ++]
}
```

Si vous désirez utiliser la police à un endroit spécifique, vous pouvez le faire de la même façon qu'avec n'importe quelle autre police dans votre CSS. Par exemple, l'appliquer à la classe CSS `.nrt-title` changera la police de la plupart des titres et des en-têtes modaux.

```css
.nrt-title {
  font-family: 'Agdasima';
}
```

## Trouver des polices à utiliser

Il existe un excellent guide vidéo qui traite de la recherche de polices pour votre jeu et des questions de licences associées :

<iframe width="560" height="315" src="https://www.youtube.com/embed/xCXvWBDLXmE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
