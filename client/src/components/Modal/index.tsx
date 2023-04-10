import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button';

import { Overlay, Container, Footer } from './styles';

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
  let fullScreenRoot = document.getElementById('fullscreen-root');

  if (!fullScreenRoot) {
    fullScreenRoot = document.createElement('div');
    fullScreenRoot.setAttribute('id', 'fullscreen-root');

    document.body.appendChild(fullScreenRoot);
  }

  if (!visible) {
    return null;
  }

  return (
    ReactDOM.createPortal(
      <Overlay>
        <Container danger={danger}>
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
      </Overlay>,
      fullScreenRoot,
    )
  );
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};

export default Modal;
