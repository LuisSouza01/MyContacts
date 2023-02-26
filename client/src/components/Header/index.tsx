import { Container } from './styles';

import logo from '../../assets/images/Logo.svg';

const Header = () => (
  <Container>
    <img src={logo} alt="Logo nas cores preto e azul, escrito MyContacts" />
  </Container>
);

export default Header;
