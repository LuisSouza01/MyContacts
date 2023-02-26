import ReactDOM from 'react-dom';

import Button from '../Button';

import { Overlay, Container, Footer } from './styles';

type ModalProps = {
  danger?: boolean,
}

const Modal = ({ danger }: ModalProps) => {
  const fullScreenRoot = document.getElementById('fullscreen-root');

  if (!fullScreenRoot) {
    return null;
  }

  return (
    ReactDOM.createPortal(
      <Overlay>
        <Container danger={danger}>
          <h1>Título do modal</h1>

          <p>Corpo do modal</p>

          <Footer>
            <button
              type="button"
              className="cancel-button"
            >
              Cancelar
            </button>

            <Button danger>Deletar</Button>
          </Footer>
        </Container>
      </Overlay>,
      fullScreenRoot,
    )
  );
};

Modal.defaultProps = {
  danger: false,
};

export default Modal;
