---
description: Narrat games can be localized (translated) to different languages.
---

# Localization

Narrat supports localization using [i18next](https://www.i18next.com/), an established internationalization framework. This allows games to be translated into multiple languages, making it accessible to a wider audience.

All user-facing strings in the engine can be localized, as well as text within the game scripts, quests, items, achievements, etc.

::: tip
Consult the [i18next documentation](https://www.i18next.com/overview/getting-started) for tips and more info on how it works.
:::

## Using localization

From narrat 4.0.0, localization is available and the narrat template comes with default sample localization files. Here are the relevant files:

### Localization Config

**Localization config**: in `src/config/localization.yaml` is the config localization file. This file simply lists the available languages and the default language.

Example:

::: code-group

```yaml [config/localization.yaml]
defaultLanguage: en # This should be the ID of the default language
languages:
  en:
    id: en # This is the language ID, used internally
    name: English # This is the user-facing name of the language when changing language
    languageCode: en # This is the language code identifying the language in i18next
  fr:
    id: fr
    name: Français
    languageCode: fr
```

```ts [config/index.ts]
import achievements from './achievements.yaml';
import animations from './animations.yaml';
// ... other imports
import localization from './localizatiton.yaml'; // [!code focus]

import { ModuleConfigInput } from '@/config/config-input';

const defaultGameConfigs: ModuleConfigInput = {
  achievements,
  animations,
  // ... other configs
  localization, // [!code focus]
};
export default defaultGameConfigs;
```

:::

### Localization Files

You have full control over the localization pipeline. When calling `startApp` from Narrat, there is now a `localization` parameter, which is an object containing the `i18next` configuration, including the `resources` object that contains the translations for each language.

For example, the narrat template does this by default:

::: code-group

```typescript [src/index.ts]
// other imports
import { strings } from './strings/strings'; // [!code focus]

// rest of code

window.addEventListener('load', () => {
  if (useSteam) {
    registerPlugin(new SteamPlugin());
  }
  startApp({
    debug,
    logging: false,
    scripts,
    config,
    localization: { // [!code focus]
      debug, // [!code focus]
      lng: 'fr', // [!code focus]
      resources: { // [!code focus]
        en: strings.en, // [!code focus]
        fr: strings.fr, // [!code focus]
      }, // [!code focus]
    }, // [!code focus]
  });
});
```

```typescript [src/strings/strings.ts]
// Imports strings from YAML files. You can easily add more languages by adding more imports here and adding them to the `strings` object.
import en from './strings_en.yaml';
import fr from './strings_fr.yaml';

export const strings = {
  en: en.code,
  fr: fr.code,
};
```

```yaml [src/strings/strings_fr.yaml]
translation:
  # Built-in engine strings are all under the `narrat` key
  narrat:
    settings:
      language: Langue
      settings: Paramètres
    inputs:
      movement: Choisir
      confirm: Confirmer
      cancel: Annuler
      left: Gauche
      right: Droite
  # ... other engine strings, look at the full file to see more
  # Game strings, which can be whatever you want to localize your game:
  # ===========================
  # Game Config Localization
  # ===========================

  # Note that those keys are up to you. You can create keys, or you can use the text itself as a key.
  items:
    categories:
      food: Nourriture
      books: Livres
    bread:
      name: Bread
      description: Un pain de campagne.
    book:
      name: Livre Sinistre
      description: 'Un livre sinistre'
  # Example of localizing achievements from raw text without using keys (see achievements.yaml for the names)
  # janken:
  Janken: Pierre-papier-ciseaux
  Win at Rock paper scissors Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt.: Gagner au pierre-papier-ciseaux Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt.
  # won the game:
  Won the game: A gagné le jeu
  Get this achievement by being a true ultimate pro gamer: Obtenez ce succès en étant un véritable pro gamer ultime.
  # find book:
  Bookworm: Rat de bibliothèque
  Find the book in the hidden room: Trouvez le livre dans la salle cachée
  # chapter 1:
  Chapter 1: Chapitre 1
  Finish chapter 1: Terminer le chapitre 1
  # chapter 2:
  Chapter 2: Chapitre 2
  Finish chapter 2: Terminer le chapitre 2
  # secret achievement:
  Secret boss found: Boss secret trouvé
  Beat the secret boss: Battez le boss secret
  # Same for quests, could use either raw text or string keys if you want
  Quest Category 1: Catégorie de quête 1
  quests:
    categories:
      category_2: Catégorie de quête 2
    bread_shopping:
      title: Shopping à la boulangerie
      description: Le chat vous demande de lui acheter du pain.
      objectives:
        bread:
          description: Acheter du pain pour le chat.
        delivery:
          description: Livrer le pain au chat.
  # Translating skills without string keys as another example.
  # This has the advantage of not needing to fill the english localization file (defaults to the raw text which is already in english)
  Agility: Agilité
  How good you are at moving around.: Votre capacité à vous déplacer
  Haggling: Négociation
  Get good prices on items: Obtenez de bons prix sur les objets

  # ===========================
  # Game Text Localization
  # ===========================
  Let's test localization!: Testons la localisation !
  Welcome %{name}!: Bienvenue %{name} !
  Your health is %{health}.: Votre santé est de %{health}.
```

:::

The template is setup to load strings from yaml files, but if for whatever reason you want to load them differently (to integrate with translation management systems, for example), you can freely edit this code to pass whatever you want to the `localization` parameter.

The way the template loads those yaml files is just to help you get started localizing a game more easily.

::: info
It is worth noting that Narrat adds a few important parameters to your localization config, and it also merges your localization values with the default Narrat localization values (engine strings).
:::

::: danger
Note that translation keys can be nested, and the first level of nesting in the yaml files is `translation`, as `i18next` expects a resource object with a `translation` key. So your translations will be at least one level of indentation deep.
:::

## Localizing the game

There are two major philosophies for localizing text. You can either use string keys, or you can use the raw text itself as the key. There are arguments for both approaches, and you can use either or a mix of both.

I generally recommend using string keys where possible because string keys allow for context. There are cases where the same word or sentence in one language might be localized differently in other languages depending on context. If you localize with the raw text, your localization system will not be able to account for that.

On the other hand, using string keys in your actual narrat scripts can be cumbersome and makes the scripts less readable, so it is much more pleasant to use the raw text as the localization key in your dialogue scripts.

You always have the option of using string keys in specific lines of dialogue where you need a context-specific version of a string, and using raw text in the rest of your scripts.

### Examples

The quests in the default example show how you can use a mix of string keys and raw text in your localization:

::: code-group

```yaml [quests.yaml]
categories:
  - id: default
    title: Quest Category 1 # Title is raw text
  - id: other
    title: qusts.categories.category_2 # Title is a string key

quests:
  breadShopping: # This entire quest uses string keys
    title: quests.bread_shopping.title
    description: quests.bread_shopping.description
    objectives:
      bread:
        description: quests.bread_shopping.objectives.bread.description
      delivery:
        hidden: true
        description: quests.bread_shopping.objectives.delivery.description
```

```yaml [strings_fr.yaml]
Quest Category 1: Catégorie de quête 1 # This is localizing the raw text
quests:
  categories:
    category_2: Catégorie de quête 2 # This is using a string
  bread_shopping:
    title: Shopping à la boulangerie
    description: Le chat vous demande de lui acheter du pain.
    objectives:
      bread:
        description: Acheter du pain pour le chat.
      delivery:
        description: Livrer le pain au chat.
```

:::

One advantage of using the raw text as the key is that you can skip writing your english localization file (or whatever your main language is), as `i18next` will default to the raw text if no localization is found for the current language. This can be a good time saver.

::: tip
All built-in engine strings use string keys in the form of `narrat.<key>`, to avoid risking conflicts with your own game strings. See the default string files for what can be localized, or look at `src/data/default-strings.ts` for the full list of built-in strings.
:::

### Variable interpolation

The syntax for interpolating variables in strings is the same as in narrat scripts, which is `%{$variable}`.

When Narrat is about to localize a line of game dialog, it sends the same state object to `i18next` as the one that's used to access variables in narrat scripts. This allows the same paths to work in the localization template as in the scripts.

#### Example

The `test_localization` script in the default example shows some examples of variable interpolation with localization:

::: code-group

```narrat [narrat/src/examples/default/scripts/test_localization.narrat]
test_localization:
  unlock_achievement chapter_1
  "Let's test localization!"
  var name Liana
  var health 100
  "Welcome %{$name}!"
  "Your health is %{$health}."
  set data.player.name Liana
  // Raw text version
  "Player name is %{$data.player.name}."
  // String key version: The variable interpolation is done directly in the localization string.
  "test_localization.print_player_name"
```

```yaml [strings_fr.yaml]
Let's test localization!: Testons la localisation !
Welcome %{name}!: Bienvenue %{name} !
Your health is %{health}.: Votre santé est de %{health}.
# Raw text version
Player name is %{$data.player.name}.: Le nom du joueur est %{data.player.name}.
test_localization:
  # String key version
  print_player_name: 'Le nom du joueur est %{data.player.name}.'
```

:::

This example mostly uses raw text so the english text doesn't need to be added to string files, but for example the last line uses a string key, so the english version of that line would be needed in strings_en.yaml.

::: tip
You might notice that some of those lines in narrat script use a `$` prefix before the variable and some don't. This used to be required as part of narrat syntax, but now that the localization system is here it is unnecessary and optional. There is a regex which will remove the `$` prefix before processing it, hence why you don't see it (and shouldn't use it) in the localization file itself.
:::
