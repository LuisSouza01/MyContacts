import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';

import ContactsService from '../../services/ContactsService';
import { ContactDomainMapper } from '../../services/mappers/ContactMapper';
import toast from '../../utils/toast';

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
    } catch {
      setHasError(true);
      setContacts([]);
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

  async function handleConfirmDeleteContact() {
    try {
      setIsLoading(true);

      await ContactsService.deleteContact(contactBeingDeleted!.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted!.id,
      ));

      handleCloseDeleteContact();

      toast({ type: 'success', text: 'Contato deletado com sucesso.' });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro deletando o contato',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
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
