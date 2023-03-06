import { Link } from 'react-router-dom';
import {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';

import edit from '../../assets/images/icons/Edit.svg';
import trash from '../../assets/images/icons/Trash.svg';
import arrow from '../../assets/images/icons/Arrow.svg';

import Loader from '../../components/Loader';

import {
  InputSearchContainer, Header, ListHeader, Card,
} from './styles';

type Contact = {
  id: String;
  name: String;
  phone: String;
  email: String;
  category_id: String;
  category_name: String;
}

const Home = () => {
  const [orderBy, setOrderBy] = useState('asc');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )), [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:3001/contacts?orderBy=${orderBy}`,
        );

        const data = await response.json();

        setContacts(data);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToogleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar contato"
          onChange={handleSearch}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <>
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToogleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Ícone de uma seta, em roxo" />
            </button>
          </ListHeader>

          {filteredContacts.map((contact) => (
            <Card key={Number(contact.phone)}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Ícone de uma caneta em cima de um papel, em azul" />
                </Link>
                <button type="button">
                  <img src={trash} alt="Ícone de uma lixeira, em vermelho" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default Home;
