import { Link } from 'react-router-dom';

import useHome from './useHome';

import edit from '../../assets/images/icons/Edit.svg';
import trash from '../../assets/images/icons/Trash.svg';
import arrow from '../../assets/images/icons/Arrow.svg';

import Header from './components/Header';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import InputSearch from './components/InputSearch';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';

import {
  ListHeader,
  Card,
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

      {contacts.length > 0 && (
        <InputSearch
          onSearch={handleSearch}
          searchTerm={searchTerm}
        />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
      />

      {hasError && (
        <ErrorStatus
          onTryAgain={handleTryAgain}
        />
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && <EmptyList />}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFound searchTerm={searchTerm} />
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
    </>
  );
};

export default Home;
