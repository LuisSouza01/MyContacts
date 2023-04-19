import { useRef } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export interface NewContactFormData {
  name: string;
  email: string
  phone: string;
  categoryId: string;
}

const NewContact = () => {
  const ContactFormRef = useRef<any>(null);

  async function handleSubmit(contact: NewContactFormData) {
    try {
      await ContactsService.createContact(contact);

      ContactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contato criado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato',
        duration: 3000,
      });
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        ref={ContactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default NewContact;
