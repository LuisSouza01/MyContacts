import { useEffect } from 'react';

import { Container } from './styles';

import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

type ToastType = {
  type: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
}

export interface MessageType extends ToastType {
  id: number;
}

const ToastContainer = () => {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList();

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
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          id={message.id}
          type={message.type}
          text={message.text}
          duration={message.duration}
          onRemoveMessage={handleRemoveItem}
          animatedRef={animatedRef}
          isLeaving={isLeaving}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
