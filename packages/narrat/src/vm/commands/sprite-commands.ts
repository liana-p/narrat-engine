import {
  CreateObjectOptions,
  CreateSpriteOptions,
  ScreenObjectState,
  useScreenObjects,
} from '@/stores/screen-objects-store';
import { CommandPlugin } from './command-plugin';

export const createSpriteCommand = new CommandPlugin<{
  image: string;
  x: number;
  y: number;
  parent?: ScreenObjectState | string;
}>(
  'create_sprite',
  [
    { name: 'image', type: 'string' },
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
    { name: 'parent', type: 'any', optional: true },
  ],
  async (cmd) => {
    const screenObjects = useScreenObjects();
    const { x, y, image, parent } = cmd.options;
    const args: CreateSpriteOptions = { x, y, image };
    if (typeof parent === 'object') {
      args.parent = parent;
    }
    if (typeof parent === 'string') {
      args.parent = useScreenObjects().getObject(parent);
    }
    return screenObjects.createSprite(args);
  },
);

export const createObjectCommand = new CommandPlugin<{
  x: number;
  y: number;
  parent?: ScreenObjectState | string;
}>(
  'create_object',
  [
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
    { name: 'parent', type: 'any', optional: true },
  ],
  async (cmd) => {
    const screenObjects = useScreenObjects();
    const { x, y, parent } = cmd.options;
    const args: CreateObjectOptions = { x, y };
    if (typeof parent === 'object') {
      args.parent = parent;
    }
    if (typeof parent === 'string') {
      args.parent = useScreenObjects().getObject(parent);
    }
    return screenObjects.createObject(args);
  },
);

// deleteSpriteCommand
export const deleteSpriteCommand = new CommandPlugin<{
  sprite: ScreenObjectState;
}>('delete_sprite', [{ name: 'sprite', type: 'any' }], async (cmd) => {
  const screenObjects = useScreenObjects();
  return screenObjects.destroyObject(cmd.options.sprite);
});

export const emptySpritesCommand = CommandPlugin.FromOptions<{
  layer?: number;
}>({
  keyword: 'empty_sprites',
  argTypes: [{ name: 'layer', type: 'number', optional: true }],
  runner: async (cmd) => {
    const screenObjects = useScreenObjects();
    const { layer } = cmd.options;
    if (typeof layer === 'number') {
      return screenObjects.emptyLayer(layer);
    }
    return screenObjects.emptyAllLayers();
  },
});
