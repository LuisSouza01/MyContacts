import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

type ToastMessageProps = {
  text: string;
  type?: 'default' | 'success' | 'danger';
}

const ToastMessage = ({ text, type }: ToastMessageProps) => (
  <Container className={type}>
    {type === 'danger' && <img src={xCircleIcon} alt="xCircleIcon" />}
    {type === 'success' && <img src={checkCircleIcon} alt="checkCircleIcon" />}

    <strong>{text}</strong>
  </Container>
);

ToastMessage.defaultProps = {
  type: 'default',
};

export default ToastMessage;
