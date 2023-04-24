/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import { Container } from './styles';

type HeaderPros = {
  hasError: boolean;
  quantityOfContacts: number;
  quantityOfFilteredContacts: number;
}

const Header = ({ hasError, quantityOfContacts, quantityOfFilteredContacts }: HeaderPros) => {
  const alignment = hasError
    ? 'flex-end'
    : (
      quantityOfContacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && quantityOfContacts > 0) && (
        <strong>
          {quantityOfFilteredContacts}
          {quantityOfFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  );
};

export default Header;
