import { useEffect, useState } from 'react';

import { Container } from './styles';

import ToastMessage from '../ToastMessage';

type MessageType = {
  id: number;
  type: 'default' | 'success' | 'danger';
  text: string;
}

const ToastContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    function handleAddToast(event: any) {
      const { type, text } = event.detail;

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
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
