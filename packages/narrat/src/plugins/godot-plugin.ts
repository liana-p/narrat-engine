import { useRenderingStore, Narrat, CommandPlugin } from '@/lib';
import { NarratPlugin } from './NarratPlugin';

export interface MessageForGodot {
  type: string;
  payload: any;
}

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

  constructor() {
    super();
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
    const app = document.querySelector('#app-container') as HTMLElement;
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
    window.addEventListener('keydown', (e) => {
      if (e.fakeEvent) return;
      const event = new KeyboardEvent(e.type, e);
      event.fakeEvent = true;
      this.canvas.dispatchEvent(event);
    });
    window.addEventListener('keyup', (e) => {
      if (e.fakeEvent) return;
      const event = new KeyboardEvent(e.type, e);
      event.fakeEvent = true;
      this.canvas.dispatchEvent(event);
    });
    canvas.addEventListener('keydown', () => {
      console.log('canvas keydown');
    });
    const Engine = (window as any).Engine;
    const engine = new Engine({
      args: [],
      canvas,
      canvasResizePolicy: 0,
      executable: 'examples/games/godot/godot-game/export/index',
      experimentalVK: false,
      fileSizes: { 'index.pck': 54160, 'index.wasm': 52315256 },
      focusCanvas: false,
      gdextensionLibs: [],
    });
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
    godotReady: boolean;
    godotReadyCallback: typeof godotReadyCallback;
    narratReadyCallback: () => void;
    godotCallback: (...args: any[]) => void;
  }
}
