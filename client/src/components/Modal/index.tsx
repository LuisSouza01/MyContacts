import React, { useEffect, useRef, useState } from 'react';

import Button from '../Button';

import { Overlay, Container, Footer } from './styles';
import ReactPortal from '../ReactPortal';

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
  const [shouldRender, setShouldRender] = useState(visible);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const overlayRefElement = overlayRef.current;

    if (!visible && overlayRefElement) {
      overlayRefElement.addEventListener('animationend', () => {
        handleAnimationEnd();
      });
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={overlayRef}>
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
