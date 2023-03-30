import { useEffect, useState } from 'react';

import { Container } from './styles';

import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';

type ToastType = {
  type: 'default' | 'success' | 'danger';
  text: string;
}
interface MessageType extends ToastType {
  id: number;
}

const ToastContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text }: ToastType) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage key={message.id} type={message.type} text={message.text} />
      ))}
    </Container>
  );
};

export default ToastContainer;
