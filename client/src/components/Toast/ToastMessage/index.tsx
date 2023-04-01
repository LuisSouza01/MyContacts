import { useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

type ToastMessageProps = {
  text: string;
  type?: 'default' | 'success' | 'danger';
  // eslint-disable-next-line no-unused-vars
  onRemoveMessage(id: number): void;
  id: number;
}

const ToastMessage = ({
  text, type, onRemoveMessage, id,
}: ToastMessageProps) => {
  useEffect(() => {
    setTimeout(() => {
      onRemoveMessage(id);
    }, 7000);
  }, [id, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container
      className={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {type === 'danger' && <img src={xCircleIcon} alt="xCircleIcon" />}
      {type === 'success' && <img src={checkCircleIcon} alt="checkCircleIcon" />}

      <strong>{text}</strong>
    </Container>
  );
};

ToastMessage.defaultProps = {
  type: 'default',
};

export default ToastMessage;
