# Tooltips

Tooltips are a feature that allows games to show information tooltips when hovering certain keywords.

They are fully configurable and automated. All you need is to create a list of tooltips, and the engine will make them appear automatically.

## How to use tooltips in narrat

To use this feature, the new `tooltips.yaml` config file is needed:

### tooltips.yaml

Tooltips are created and configured in the `tooltips.yaml` file:

```yaml
options:
  width: 350
  keywordsPrefix: '@@'
tooltips:
  - keywords: [bread, breads]
    title: Bread
    description: Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking. Throughout recorded history and around the world, it has been an important part of many cultures' diet. It is one of the oldest human-made foods, having been of significance since the dawn of agriculture, and plays an essential role in both religious rituals and secular culture.
```

Then, in `config.yaml` add the path to the file:

```yaml
tooltips: data/tooltips.yaml
```

### General tooltips config

- `width`: Width of tooltip box in pixels
- `keywordsPrefix`: The prefix to use before words in scripts to make the tooltip appear

### Options for individual tooltips

- `keywords`: A list of all possible keywords to match for showing this tooltip. It's case insensitive.
- `title`: The title of the tooltip popup that will appear
- `description`: The content of the tooltip popup

Then, to use in scripts, for example:

```narrat
main:
  talk player idle "I like @@bread"
```

Having one of the keywords defined in the tooltips with the `keywordsPrefix` before it will make it be detected as a keyword and show the tooltip
