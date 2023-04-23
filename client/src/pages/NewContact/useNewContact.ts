import { useRef } from 'react';

import toast from '../../utils/toast';
import ContactsService from '../../services/ContactsService';

export interface NewContactFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}

const useNewContact = () => {
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

  return {
    ContactFormRef,
    handleSubmit,
  };
};

export default useNewContact;
