import { TypedEmitter } from './typed-emitter';

export interface GameloopEvents {
  preUpdate: () => void;
  update: () => void;
  postUpdate: () => void;
}

export class Gameloop extends TypedEmitter<GameloopEvents> {
  setup() {
    const update = () => {
      // console.log('============== gameloop');
      this.emit('preUpdate');
      this.emit('update');
      this.emit('postUpdate');
      // window.setTimeout(update, 4000);
      requestAnimationFrame(update);
    };
    update();
  }
}

export const gameloop = new Gameloop();
