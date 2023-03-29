export default class EventManager {
  listeners: Map<string, Array<any>>;

  constructor() {
    this.listeners = new Map();
  }

  // eslint-disable-next-line no-unused-vars
  on(event: string, listener: (payload: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: any) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)?.forEach((listener: any) => {
      listener(payload);
    });
  }

  removeListener(event: string, listenerToRemove: string) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter(
      (listener: string) => listener !== listenerToRemove,
    );

    this.listeners.set(event, filteredListeners);
  }
}

const toastEventManager = new EventManager();

toastEventManager.on('addtoast', (payload: any) => {
  console.log('addtoast', payload);
});
