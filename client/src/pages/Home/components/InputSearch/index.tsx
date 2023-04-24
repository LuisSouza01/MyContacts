/* eslint-disable no-unused-vars */
import { ChangeEvent } from 'react';
import { Container } from './styles';

type InputSearchProps = {
  searchTerm: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch = ({ searchTerm, onSearch }: InputSearchProps) => (
  <Container>
    <input
      value={searchTerm}
      type="text"
      placeholder="Pesquisar contato"
      onChange={onSearch}
    />
  </Container>
);

export default InputSearch;
