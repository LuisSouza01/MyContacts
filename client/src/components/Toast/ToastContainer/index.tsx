import { useEffect, useState, useCallback } from 'react';

import { Container } from './styles';

import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';

type ToastType = {
  type: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
}
interface MessageType extends ToastType {
  id: number;
}

const ToastContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: ToastType) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          id={message.id}
          type={message.type}
          text={message.text}
          duration={message.duration}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
