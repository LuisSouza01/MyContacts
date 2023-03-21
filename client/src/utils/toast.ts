type ToastType = {
  type: 'default' | 'success' | 'danger';
  text: string;
}

export default function toast({ type, text }: ToastType) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  });

  document.dispatchEvent(event);
}
