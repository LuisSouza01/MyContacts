import React from 'react';

import Button from '../Button';

import { Overlay, Container, Footer } from './styles';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

type ModalProps = {
  danger?: boolean,
  title: string,
  children: React.ReactNode,
  cancelLabel?: string,
  confirmLabel?: string
  onCancel: () => void,
  onConfirm: () => void
  visible: boolean
}

const Modal = ({
  danger, title, children, cancelLabel, confirmLabel, onCancel, onConfirm, visible,
}: ModalProps) => {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container isLeaving={!visible} danger={danger}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>

            <Button
              danger
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};

export default Modal;
