import { debounce } from './debounce';
import { TypedEmitter } from './typed-emitter';

export interface InputEvents {
  keydown: (event: KeyboardEvent) => void;
  debouncedKeydown: (event: KeyboardEvent) => void;
}

export class InputsListener extends TypedEmitter<InputEvents> {
  setup(debug: boolean = false) {
    const debounceTime = debug ? 10 : 10;
    const eventName = debug ? 'keydown' : 'keyup';
    const debouncedKeydown = debounce(
      (e: KeyboardEvent) => {
        inputEvents.emit('debouncedKeydown', e);
      },
      debounceTime,
      {
        isImmediate: true,
        maxWait: debounceTime,
      },
    );
    window.addEventListener('keydown', (e) => {
      inputEvents.emit('keydown', e);
    });
    window.addEventListener(eventName, (e) => {
      debouncedKeydown(e);
    });
  }
}
export const inputEvents = new InputsListener();
