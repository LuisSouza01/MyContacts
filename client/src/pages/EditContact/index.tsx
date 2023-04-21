import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import { NewContactFormData } from '../NewContact';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import { ContactDomainMapper } from '../../services/mappers/ContactMapper';

const EditContact = () => {
  const navigate = useNavigate();
  const ContactFormRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [contactName, setContactName] = useState('');

  const { id } = useParams();
  const isMounted = useIsMounted();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact: ContactDomainMapper = await ContactsService.getContactById(id as string);

        safeAsyncAction(() => {
          setContactName(contact.name);
          ContactFormRef.current.setFiledsValues(contact);

          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          navigate('/');

          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        });
      }
    }

    loadContact();
  }, [id, navigate, isMounted, safeAsyncAction]);

  async function handleSubmit(formData: NewContactFormData) {
    try {
      const contact = await ContactsService.updateContact(id ?? '', formData);

      setContactName(contact.name);

      toast({
        type: 'success',
        text: 'Contato atualizado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao atualizado o contato',
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        ref={ContactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditContact;
