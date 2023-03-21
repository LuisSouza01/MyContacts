import { Container } from './styles';

import ToastMessage from '../ToastMessage';

const ToastContainer = () => (
  <Container>
    <ToastMessage text="Default toast" />
    <ToastMessage text="Error toast" type="danger" />
    <ToastMessage text="Success toast" type="success" />
  </Container>
);

export default ToastContainer;
