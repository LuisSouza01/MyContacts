export default class EventManager {
  listeners: any;

  constructor() {
    this.listeners = {};
  }

  // eslint-disable-next-line no-unused-vars
  on(event: string, listener: (payload: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  emit(event: string, payload: any) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener: any) => {
      listener(payload);
    });
  }
}

const toastEventManager = new EventManager();

toastEventManager.on('addtoast', (payload: any) => {
  console.log('addtoast', payload);
});

console.log({ toastEventManager });
