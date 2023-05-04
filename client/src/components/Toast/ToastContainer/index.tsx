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
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState<number[]>([]);

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
    setPendingRemovalMessagesIds(
      (prevState) => [...prevState, id],
    );
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
          isLeaving={pendingRemovalMessagesIds.includes(message.id)}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
