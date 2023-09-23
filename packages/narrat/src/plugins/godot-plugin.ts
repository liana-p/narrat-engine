import { useRenderingStore, Narrat } from '@/lib';
import { NarratPlugin } from './NarratPlugin';

export interface MessageForGodot {
  type: string;
  payload: any;
}

export class GodotPlugin extends NarratPlugin {
  canvas!: HTMLCanvasElement;
  app!: HTMLElement;
  messageQueue: MessageForGodot[] = [];
  narrat!: Narrat;
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
    const Engine = (window as any).Engine;
    const engine = new Engine({
      args: [],
      canvas,
      canvasResizePolicy: 0,
      executable: 'examples/games/godot/godot-game/export/index',
      experimentalVK: false,
      fileSizes: { 'index.pck': 593104, 'index.wasm': 52315256 },
      focusCanvas: true,
      gdextensionLibs: [],
    });
    engine.startGame();
    this.resizeCanvas();
  }

  addMessageForGodot(message: MessageForGodot) {
    this.messageQueue.unshift(message);
  }

  grabNextMessage(): MessageForGodot | undefined {
    return this.messageQueue.pop();
  }

  async run(label: string, ...args: string[]) {
    const result = await this.narrat.run(label, ...args);
    if (typeof result === 'string' && this.isJson(result)) {
      const message = JSON.parse(result);
      this.addMessageForGodot({
        type: 'object',
        payload: message,
      });
    } else {
      this.addMessageForGodot({
        type: 'value',
        payload: result,
      });
    }
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
