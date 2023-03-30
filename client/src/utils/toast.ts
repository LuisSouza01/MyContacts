import EventManager from '../lib/EventManager';

type ToastType = {
  type: 'default' | 'success' | 'danger';
  text: string;
}

export const toastEventManager = new EventManager();

export default function toast({ type, text }: ToastType) {
  toastEventManager.emit('addtoast', { type, text });
}
