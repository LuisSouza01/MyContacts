import emptyBox from '../../../../assets/images/empty-box.svg';

import { Container } from './styles';

const EmptyList = () => (
  <Container>
    <img src={emptyBox} alt="Empty Box" />

    <p>
      Você ainda não tem nenhum contato cadastrado!
      Clique no botão
      <strong> &apos;Novo contato&apos; </strong>
      à cima para cadastrar o seu
      primeiro!
    </p>
  </Container>
);

export default EmptyList;
