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
  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container className={type} onClick={handleRemoveToast}>
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
