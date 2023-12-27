import { useScenes } from '@/stores/scenes-store';
import { CommandPlugin } from './command-plugin';

export const changeSceneCommand = CommandPlugin.FromOptions<{
  scene: string;
  rest?: any[];
}>({
  keyword: 'change_scene',
  argTypes: [
    { name: 'scene', type: 'string' },
    { name: 'rest', type: 'rest', optional: true },
  ],
  runner: async (cmd) => {
    const { scene } = cmd.options;
    await useScenes().changeScene(scene, restToOptions(cmd.args.slice(1)));
  },
});

export function restToOptions(rest: any[]) {
  const options: Record<string, any> = {};
  let i = 0;
  while (i < rest.length) {
    if (i + 1 >= rest.length) {
      break;
    }
    const key = rest[i];
    const value = rest[i + 1];
    options[key] = value;
    i += 2;
  }
  return options;
}
