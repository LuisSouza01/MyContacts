/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

type ToastMessageProps = {
  text: string;
  type?: 'default' | 'success' | 'danger';
  duration?: number;
  onRemoveMessage(id: number): void;
  id: number;
  isLeaving: boolean;
  onAnimationEnd(id: number): void;
}

const ToastMessage = ({
  text,
  type,
  duration,
  onRemoveMessage,
  id,
  isLeaving,
  onAnimationEnd,
}: ToastMessageProps) => {
  const animatedElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(id);
    }

    const elementRef = animatedElementRef.current;

    if (isLeaving) {
      elementRef?.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      elementRef?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [id, isLeaving, onAnimationEnd]);

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
      ref={animatedElementRef}
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
