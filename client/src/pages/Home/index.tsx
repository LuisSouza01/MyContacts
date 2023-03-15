/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';

import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import edit from '../../assets/images/icons/Edit.svg';
import trash from '../../assets/images/icons/Trash.svg';
import arrow from '../../assets/images/icons/Arrow.svg';

import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';

import {
  InputSearchContainer, Header, ListHeader, Card, ErrorContainer, EmptyListContainer,
} from './styles';
import Button from '../../components/Button';

export interface Contact {
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
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToogleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato"
            onChange={handleSearch}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">
            <span>Ocorreu um erro ao obter os seus contatos!</span>

            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão
                <strong> &apos;Novo contato&apos; </strong>
                à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

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
      )}
    </>
  );
};

export default Home;
