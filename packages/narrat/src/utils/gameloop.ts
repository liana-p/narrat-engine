import { TypedEmitter } from './typed-emitter';

export interface GameloopEvents {
  preUpdate: () => void;
  update: () => void;
  postUpdate: () => void;
}

export class Gameloop extends TypedEmitter<GameloopEvents> {
  setup() {
    const update = () => {
      this.emit('preUpdate');
      this.emit('update');
      this.emit('postUpdate');
      requestAnimationFrame(update);
    };
    update();
  }
}

export const gameloop = new Gameloop();
