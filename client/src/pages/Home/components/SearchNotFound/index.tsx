import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import { Container } from './styles';

const SearchNotFound = ({ searchTerm }: { searchTerm: string }) => (
  <Container>
    <img src={magnifierQuestion} alt="Magnifier Question" />

    <span>
      Nenhum resultado foi encontrado para
      <strong>
        {searchTerm}
      </strong>
    </span>
  </Container>
);

export default SearchNotFound;
