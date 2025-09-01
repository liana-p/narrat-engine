import { startApp } from '@/main';

import defaultGameScripts from '@/examples/default/scripts/scripts';
import rpgGame from '@/examples/rpg/scripts';
import emptyGame from '@/examples/empty/scripts';
import godotGame from '@/examples/godot/scripts';
import { AppOptionsInput, NarratScript } from '@/types/app-types';
import { CommandPlugin, NarratPlugin, registerPlugin } from '@/exports/plugins';
import { GodotPlugin } from '@/plugins/godot-plugin';
import demoScripts from '@/examples/demo/scripts';
import { ModuleConfigInput } from '@/config/config-input';

import defaultGameConfigs from '@/examples/default/config';
import demoGameConfigs from '@/examples/demo/config';
import emptyGameConfigs from '@/examples/empty/config';
import godotGameConfigs from '@/examples/godot/config';
import rpgGameConfigs from '@/examples/rpg/config';
import { strings } from '@/examples/default/strings/strings';
import {
  getSkillCheckDifficultyText,
  skillCheckOverrides,
} from '@/utils/skillchecks';
import { useSkills } from '@/stores/skills';
import { getImageUrl, getSkillConfig } from '@/config';
import { timeout } from '@/utils/promises';

// import { setupThemesDemo } from './themes-demo';

const gameScripts: Record<string, NarratScript[]> = {
  default: defaultGameScripts,
  demo: demoScripts,
  rpg: rpgGame,
  empty: emptyGame,
  godot: godotGame,
};

const gameConfigs: Record<string, ModuleConfigInput> = {
  default: defaultGameConfigs,
  demo: demoGameConfigs,
  rpg: rpgGameConfigs,
  empty: emptyGameConfigs,
  godot: godotGameConfigs,
};

// This config is there to enable playing different demo games based on environment variables.
// It is also used to build the different demos.
// There is one path for assets and one for other data files. This allows us to reuse assets in the demo (for git LFS storage limits...)
const argsAssetPath = import.meta.env.VITE_BASE_ASSET_PATH;
const argsDataPath = import.meta.env.VITE_BASE_DATA_PATH;
const demoChoice =
  import.meta.env.VITE_DEMO_BUILD ??
  import.meta.env.VITE_DEMO_GAME ??
  'default';
const assetsPath = typeof argsAssetPath === 'string' ? argsAssetPath : '';
const dataPath = typeof argsDataPath === 'string' ? argsDataPath : '';
let debug = true;
if (import.meta.env.VITE_DEMO_BUILD && !import.meta.env.VITE_DEBUG) {
  debug = false;
}

const scripts = gameScripts[demoChoice];

export interface SkillCheckParams {
  skill: string;
  difficulty: number;
  id: string;
  winsNeeded?: number;
  hideAfterRoll?: boolean;
  repeatable?: boolean;
}

function showCanvas(success: boolean, params: SkillCheckParams): string {
  return `<canvas width="400" height="400" id="skill-check-canvas-${params.id}"></canvas>`;
}

function getPassiveSkillCheckText(
  success: boolean,
  params: SkillCheckParams,
): string {
  const skillStore = useSkills();
  const skillConf = getSkillConfig(params.skill);
  const difficultyText = getSkillCheckDifficultyText(
    params.difficulty,
    skillStore.skills[params.skill].level,
  );
  return showCanvas(success, params);
}

skillCheckOverrides.getPassiveSkillCheckText = getPassiveSkillCheckText;

class CanvasDiceTest extends NarratPlugin {
  customCommands: CommandPlugin<any>[];

  constructor() {
    super();

    this.customCommands = [
      CommandPlugin.FromOptions<{
        id: string;
      }>({
        keyword: 'animate_dice',
        argTypes: [{ name: 'id', type: 'string' }],
        runner: async (ctx) => {
          await timeout(500);
          const { id } = ctx.options;

          const promise = new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => {
              const canvas = document.getElementById(
                `skill-check-canvas-${id}`,
              );
              if (!canvas || !(canvas instanceof HTMLCanvasElement))
                return null;
              const canvasCtx = canvas.getContext('2d');
              if (!canvasCtx) return;
              canvasCtx.fillStyle = 'red';
              canvasCtx.fillRect(0, 0, 400, 400);
              canvasCtx.drawImage(image, 0, 0, 800, 800, 0, 0, 400, 400);
              resolve();
            };
            image.src = getImageUrl('img/dice.png');
          });
          await promise;
          return null;
        },
      }),
    ];
  }
}
const onPageLoad = () => {
  if (demoChoice === 'godot') {
    registerPlugin(
      new GodotPlugin({
        godotGamePath: 'examples/games/godot/godot-game/export/index',
      }),
    );
  }
  registerPlugin(new CanvasDiceTest());
  console.log(strings);
  const options: AppOptionsInput = {
    baseAssetsPath: assetsPath,
    baseDataPath: dataPath,
    configPath: `${dataPath}data/config.yaml`,
    logging: false,
    debug,
    scripts,
    localization: {
      lng: 'en',
      debug,
      resources: {
        en: strings.en,
        fr: strings.fr,
      },
    },
  };
  if (gameConfigs[demoChoice]) {
    delete options.configPath;
    options.config = gameConfigs[demoChoice];
  }
  // setupThemesDemo();
  startApp(options);
};

window.addEventListener('load', onPageLoad);
