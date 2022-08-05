import { useScreens } from '@/stores/screens-store';
import { useSprites } from '@/stores/sprites-store';
import { commandRuntimeError } from './command-helpers';
import { CommandPlugin } from './command-plugin';

export const createSpriteCommand = new CommandPlugin<{
  image: string;
  x: number;
  y: number;
}>(
  'create_sprite',
  [
    { name: 'image', type: 'string' },
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
  ],
  async (cmd) => {
    const sprites = useSprites();
    return sprites.createSprite(
      cmd.options.image,
      cmd.options.x,
      cmd.options.y,
    );
  },
);

// deleteSpriteCommand
export const deleteSpriteCommand = new CommandPlugin<{
  sprite: any;
}>('delete_sprite', [{ name: 'sprite', type: 'any' }], async (cmd) => {
  const sprites = useSprites();
  return sprites.deleteSprite(cmd.options.sprite);
});
