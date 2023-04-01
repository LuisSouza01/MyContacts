import EventManager from '../lib/EventManager';

type ToastType = {
  type: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
}

export const toastEventManager = new EventManager();

export default function toast({ type, text, duration }: ToastType) {
  toastEventManager.emit('addtoast', { type, text, duration });
}
