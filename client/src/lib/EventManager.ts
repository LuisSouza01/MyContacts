type PayloadType = {
  type: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
}

export default class EventManager {
  listeners: Map<string, Array<any>>;

  constructor() {
    this.listeners = new Map();
  }

  // eslint-disable-next-line no-unused-vars
  on(event: string, listener: (payload: PayloadType) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: PayloadType) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)?.forEach((listener: any) => {
      listener(payload);
    });
  }

  // eslint-disable-next-line no-unused-vars
  removeListener(event: string, listenerToRemove: (payload: PayloadType) => void) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter(
      (listener: any) => listener !== listenerToRemove,
    );

    this.listeners.set(event, filteredListeners);
  }
}
