export interface InputEvents {
  keydown: (event: KeyboardEvent) => void;
}

export type EventsList<List> = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof List]: (...args: any[]) => void;
};

export type EventsMap<List extends EventsList<List>> = {
  [key in keyof List]: Set<List[key]>;
};

export class TypedEmitter<List extends EventsList<List>> {
  listeners: EventsMap<List> = {} as EventsMap<List>;
  on<Event extends keyof List>(
    event: Event,
    listener: List[Event],
  ): List[Event] {
    if (!this.listeners[event]) {
      this.addEventToMap(event);
    }
    this.listeners[event].add(listener);
    return listener;
  }

  off<Event extends keyof List>(
    event: Event,
    listener: List[Event],
  ): List[Event] {
    if (this.listeners[event]) {
      this.listeners[event].delete(listener);
    }
    return listener;
  }

  once<Event extends keyof List>(
    event: Event,
    listener: List[Event],
  ): List[Event] {
    const onceListener: List[Event] = ((...args: any[]) => {
      this.off(event, onceListener);
      listener(...args);
    }) as any;
    return this.on(event, onceListener);
  }

  emit<Event extends keyof List>(event: Event, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(...args));
    }
  }

  clear() {
    Object.keys(this.listeners).forEach((event) => {
      delete (this.listeners as any)[event];
    });
  }

  private addEventToMap<Event extends keyof List>(event: Event) {
    this.listeners[event] = new Set<List[Event]>();
  }
}
