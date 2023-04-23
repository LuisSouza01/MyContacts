/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import useHome from './useHome';

import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import edit from '../../assets/images/icons/Edit.svg';
import trash from '../../assets/images/icons/Trash.svg';
import arrow from '../../assets/images/icons/Arrow.svg';

import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

import {
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundCointaer,
} from './styles';

const Home = () => {
  const {
    isLoading,
    contactBeingDeleted,
    handleDeleteContact,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    contacts,
    searchTerm,
    handleSearch,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToogleOrderBy,
    handleCloseDeleteContact,
  } = useHome();

  return (
    <>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteContact}
        onConfirm={handleConfirmDeleteContact}
        visible={isDeleteModalVisible}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

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

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundCointaer>
              <img src={magnifierQuestion} alt="Magnifier Question" />

              <span>
                Nenhum resultado foi encontrado para
                <strong>
                  &nbsp;
                  {searchTerm}
                </strong>
              </span>
            </SearchNotFoundCointaer>
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
                <Card key={contact.id}>
                  <div className="info">
                    <div className="contact-name">
                      <strong>{contact.name}</strong>
                      {contact.category.name && (
                        <small>{contact.category.name}</small>
                      )}
                    </div>

                    <span>{contact.email}</span>
                    <span>{contact.phone}</span>
                  </div>

                  <div className="actions">
                    <Link to={`/edit/${contact.id}`}>
                      <img src={edit} alt="Ícone de uma caneta em cima de um papel, em azul" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteContact(contact)}
                    >
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
