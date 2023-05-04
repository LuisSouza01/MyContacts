import { useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

type ToastMessageProps = {
  text: string;
  type?: 'default' | 'success' | 'danger';
  duration?: number;
  // eslint-disable-next-line no-unused-vars
  onRemoveMessage(id: number): void;
  id: number;
  isLeaving: boolean;
}

const ToastMessage = ({
  text,
  type,
  duration,
  onRemoveMessage,
  id,
  isLeaving,
}: ToastMessageProps) => {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onRemoveMessage(id);
    }, duration);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [id, onRemoveMessage, duration]);

  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container
      className={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
    >
      {type === 'danger' && <img src={xCircleIcon} alt="xCircleIcon" />}
      {type === 'success' && <img src={checkCircleIcon} alt="checkCircleIcon" />}

      <strong>{text}</strong>
    </Container>
  );
};

ToastMessage.defaultProps = {
  type: 'default',
  duration: 7000,
};

export default ToastMessage;
