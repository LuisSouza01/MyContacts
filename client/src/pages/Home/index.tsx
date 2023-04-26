import useHome from './useHome';

import Header from './components/Header';
import Loader from '../../components/Loader';
import InputSearch from './components/InputSearch';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';

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
            <ContactsList
              orderBy={orderBy}
              filteredContacts={filteredContacts}
              onDeleteContact={handleDeleteContact}
              onToogleOrderBy={handleToogleOrderBy}
              contactBeingDeleted={contactBeingDeleted}
              isDeleteModalVisible={isDeleteModalVisible}
              onCloseDeleteContact={handleCloseDeleteContact}
              onConfirmDeleteContact={handleConfirmDeleteContact}
            />
          )}
        </>
      )}

    </>
  );
};

export default Home;
