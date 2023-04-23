import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';

import ContactsService from '../../services/ContactsService';
import { ContactDomainMapper } from '../../services/mappers/ContactMapper';

const useHome = () => {
  const [orderBy, setOrderBy] = useState('asc');
  const [contacts, setContacts] = useState<ContactDomainMapper[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<ContactDomainMapper>();

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

  function handleDeleteContact(contact: ContactDomainMapper) {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }

  function handleCloseDeleteContact() {
    setIsDeleteModalVisible(false);
  }

  function handleConfirmDeleteContact() {

  }

  return {
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
  };
};

export default useHome;
