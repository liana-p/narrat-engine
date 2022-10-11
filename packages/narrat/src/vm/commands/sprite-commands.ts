import {
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
      args.parent = parent.id;
    }
    if (typeof parent === 'string') {
      args.parent = parent;
    }
    return screenObjects.createSprite(args);
  },
);

// deleteSpriteCommand
export const deleteSpriteCommand = new CommandPlugin<{
  sprite: ScreenObjectState;
}>('delete_sprite', [{ name: 'sprite', type: 'any' }], async (cmd) => {
  const screenObjects = useScreenObjects();
  return screenObjects.destroyObject(cmd.options.sprite);
});
