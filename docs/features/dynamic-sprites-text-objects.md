---
title: Dynamic sprites, text and objects in viewport
description: Narrat games can have dynamic sprites and text created by scripts during the game which appear in the viewport.
---

# Screen Objects

Screen objects are dynamic sprites and texts which are not defined in the config but instead created dynamically in sprite.

This enables games to place custom interactive elements on the screen programmatically, without requiring every possible element to have been configured previously.

## How it works

While screens and buttons are static (defined in the config once and can't change), screen objects (sprites and texts) are created dynamically and can be updated.

::: info
Screen objects are rendered as HTML divs, similarly to buttons, but narrat scripting has no way to make them smoothly move for "action" 2D gameplay. If you want to do some 2D game programming with real-time or complex graphics, you should consider using a 2D game engine like in the [narrat-2d](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat-2d) plugin.
:::

In any narrat script, you can create a sprite:

```narrat
main:
  set data.my_sprite (create_sprite img/sprites/my_sprite.png 150 150) // Creates a sprite using my_sprite.png at position 150, 150
  set data.my_text (create_object 50 50 $data.my_sprite) // Creates a screen object at position 50,50, as a child of the sprite. Position is relative to the parent
  set data.my_text.text "Hello world!" // Give a text to the object
  jump move_sprite

move_sprite:
  choice:
  "Where should I move the sprite?":
    "Left":
      add data.my_sprite.x -100
    "Right":
      add data.my_sprite.x 100
    "Up":
      add data.my_sprite.y -100
    "Down":
      add data.my_sprite.y 100
```

## Examples

::: tip
The [RPG example](https://github.com/liana-p/narrat-engine/tree/main/packages/narrat/src/examples/rpg/scripts) uses sprites.

The [Spoon Survival](https://github.com/liana-p/narrat-examples/tree/main/spoon-survival) example game also uses sprites.
:::

## Scene graph

Screen objects are rendered in a scene graph, where elements can have children, and every element has a parent (except the top-level ones).

Whenever creating a screen object, passing another screen object as the last parameter will make it the parent, as in the example above.

## Options

Screen objects are just [objects](../scripting/language-syntax.md#objects) that contain properties that define how they should be displayed.

You can simply set properties of the variable that the `create_sprite` or `create_object` function returned to modify the object, like in the example above.

Available properties to change (all of them are optional, the only mandatory ones are the ones passed to `create_sprite` or `create_object`, as above):

- `name`: A name, not really used yet but useful to tell sprites apart for debugging
- `x`: The x position of the object in pixels
- `y`: The y position of the object in pixels
- `anchor`: An object with x and y properties for the anchor of the object between 0 and 1. 0 means rendered from left corner, 1 means from right corner. An anchor of 0.5,0.5 would be rendering from the center
  - `x`: The x anchor of the object
  - `y`: The y anchor of the object
- `width`: The width of the object in pixels. **Note: For sprites this will be set automatically to the size of the image**
- `height`: The height of the object in pixels. **Note: For sprites this will be set automatically to the size of the image**
- `opacity`: Opacity between 0 and 1
- `scale`: The width and height of the object will be multiplied by this number if present
- `layer`: Which viewport layer to render the sprite on. If on layer 1, the sprite will render in front of the screen on layer 1, but behind the screen in layer 2. **Note: If a layer has no active screen, sprites won't be rendered there. If needed you can create [empty placeholder screens](../features/viewport.md#empty-screens) so that sprites on a layer are rendered**.
- `cssClass`: An optional CSS class name to give to the sprite. This allows you to apply custom CSS styling to any sprites
- `onClick`: A label to run when the sprite is clicked. Example: `set data.mySprite.onClick my_label`, or if you want to pass arguments: `set data.mySprite.onClick "my_label my_argument"` (make sure to keep the quotes, otherwise the `set` command will throw an error as it expects a single argument under the form of a string).

## Difference between sprite and object

Sprites are screen objects that also render an image. Normal screen objects contain nothing by default and are just an empty div.

Adding a text to a screen object adds a text inside the div.

## Note on images preloading

Any **images used in sprites won't be preloaded by default**, because the engine doesn't know about them.

If you need to preload them, add them to the list of images in the `config.yaml`:

```yaml
images:
  mySprite: img/sprites/my-sprite.png
```

Then you can directly refer to the name of the image instead of using its full path in your code:

```narrat
main:
  set data.my_sprite (create_sprite mySprite 150 150) // Creates a sprite using my_sprite.png at position 150, 150
```
