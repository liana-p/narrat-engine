import { CommandPlugin } from '@/vm/commands/command-plugin';
import { NarratPlugin } from './NarratPlugin';
import { Narrat } from '@/utils/construct-narrat';
import { useRenderingStore } from '@/stores/rendering-store';

export interface MessageForGodot {
  type: string;
  payload: any;
}

export interface GodotEngineConfig {
  args: any[];
  canvas?: HTMLCanvasElement;
  canvasResizePolicy: 0 | 1 | 2;
  executable?: string;
  experimentalVK: boolean;
  fileSizes: Record<string, number>;
  focusCanvas: boolean;
  gdextensionLibs: string[];
}

const defaultGodotConfig: GodotEngineConfig = {
  args: [],
  canvasResizePolicy: 0,
  executable: '',
  experimentalVK: false,
  fileSizes: { 'index.pck': 54160, 'index.wasm': 52315256 },
  focusCanvas: false,
  gdextensionLibs: [],
};
export interface GodotPluginOptions {
  godotGamePath?: string;
  engineConfigOverrides?: Partial<GodotEngineConfig>;
}

export type GodotEngine = any;
export type GodotEngineConstructor = new (
  config: GodotEngineConfig,
) => GodotEngine;
function godotReadyCallback() {
  window.godotReady = true;
  if (window.narratReadyCallback) {
    window.narratReadyCallback();
  }
  console.log('godot ready');
}
window.godotReadyCallback = godotReadyCallback;
export class GodotPlugin extends NarratPlugin {
  customCommands: CommandPlugin<any>[] = [];
  canvas!: HTMLCanvasElement;
  app!: HTMLElement;
  messageQueue: MessageForGodot[] = [];
  narrat!: Narrat;
  narratReady: boolean = false;
  engineConfig: GodotEngineConfig;
  engine: GodotEngine;

  constructor(config: GodotPluginOptions) {
    super();
    const engineConfig: GodotEngineConfig = {
      ...defaultGodotConfig,
      ...(config.engineConfigOverrides ?? {}),
    };
    if (config.godotGamePath) {
      engineConfig.executable = config.godotGamePath;
    }
    this.engineConfig = engineConfig;
    this.customCommands = [
      CommandPlugin.FromOptions<{}>({
        keyword: 'godot_pause',
        argTypes: [],
        runner: async (cmd) => {
          this.addMessageForGodot({
            type: 'pause',
            payload: {},
          });
        },
      }),
      CommandPlugin.FromOptions<{}>({
        keyword: 'godot_resume',
        argTypes: [],
        runner: async (cmd) => {
          this.addMessageForGodot({
            type: 'resume',
            payload: {},
          });
        },
      }),
    ];
  }

  onAppMounted() {
    const app = document.querySelector('#narrat-app-container') as HTMLElement;
    if (!app) {
      console.error('no app');
      return;
    }
    this.narrat = window.narrat;
    const canvas = document.createElement('canvas');
    this.app = app;
    this.canvas = canvas;
    canvas.id = 'godot-canvas';
    canvas.style.position = 'absolute';
    canvas.style.zIndex = '0';
    app.appendChild(canvas);

    // Note: This is a not great hack because godot is listening for keyboard events in the canvas, and because narrat is in front of it, it never receives them
    // Basically re-dispatching events but giving them a fake property so that we know to ignore our own events..
    window.addEventListener('keydown', (e: any) => {
      if (e.fakeEvent) return;
      const event = new KeyboardEvent(e.type, e);
      (event as any).fakeEvent = true;
      this.canvas.dispatchEvent(event);
    });
    window.addEventListener('keyup', (e: any) => {
      if (e.fakeEvent) return;
      const event = new KeyboardEvent(e.type, e);
      (event as any).fakeEvent = true;
      this.canvas.dispatchEvent(event);
    });
    const engine = new window.Engine(this.engineConfig);
    engine.startGame();
    this.resizeCanvas();
    window.godot = this;
    this.narratReady = true;
    if (window.narratReadyCallback) {
      window.narratReadyCallback();
    }
  }

  getCanvas() {
    return document.querySelector('#godot-canvas') as HTMLCanvasElement;
  }

  addMessageForGodot(message: MessageForGodot) {
    this.messageQueue.unshift(message);
    if (window.godotCallback) {
      window.godotCallback(message);
    }
  }

  grabNextMessage(): MessageForGodot | undefined {
    return this.messageQueue.pop();
  }

  async run(label: string, ...args: string[]) {
    const result = await this.narrat.run(label, ...args);
    const message = {
      type: 'run_end',
      payload: {
        label,
        args,
        result,
      },
    };
    this.addMessageForGodot(message);
  }

  isJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  resizeCanvas() {
    const rendering = useRenderingStore();
    const width = rendering.gameWidth;
    const height = rendering.gameHeight;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    window.requestAnimationFrame(() => this.resizeCanvas());
  }
}

declare global {
  export interface Window {
    godot: GodotPlugin;
    Engine: GodotEngineConstructor;
    godotReady: boolean;
    godotReadyCallback: typeof godotReadyCallback;
    narratReadyCallback: () => void;
    godotCallback: (...args: any[]) => void;
  }
}
