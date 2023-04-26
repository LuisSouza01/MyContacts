import useHome from './useHome';

import Header from './components/Header';
import Loader from '../../components/Loader';
import EmptyList from './components/EmptyList';
import InputSearch from './components/InputSearch';
import ErrorStatus from './components/ErrorStatus';
import ContactsList from './components/ContactsList';
import SearchNotFound from './components/SearchNotFound';

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

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);
  const isSearch = !hasError && (filteredContacts.length > 0);

  return (
    <>
      <Loader isLoading={isLoading} />

      {hasContacts && (
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

      {isListEmpty && <EmptyList />}

      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {isSearch && (
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
  );
};

export default Home;
