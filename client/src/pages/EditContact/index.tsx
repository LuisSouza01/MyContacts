import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import { NewContactFormData } from '../NewContact';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

const EditContact = () => {
  const navigate = useNavigate();
  const ContactFormRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id as string);

        ContactFormRef.current.setFiledsValues(contact);

        setIsLoading(false);
      } catch {
        navigate('/');

        toast({
          type: 'danger',
          text: 'Contato não encontrado',
        });
      }
    }

    loadContact();
  }, [id, navigate]);

  async function handleSubmit(formData: NewContactFormData) {
    console.log(formData);
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title="Editar Contato"
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
