import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import edit from '../../assets/images/icons/Edit.svg';
import trash from '../../assets/images/icons/Trash.svg';
import arrow from '../../assets/images/icons/Arrow.svg';

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

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, [orderBy]);

  function handleToogleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  return (
    <>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {contacts.length > 0 && (
        <>
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToogleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Ícone de uma seta, em roxo" />
            </button>
          </ListHeader>

          {contacts.map((contact) => (
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
