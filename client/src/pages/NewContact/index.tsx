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
  async function handleSubmit(formData: NewContactFormData) {
    try {
      await ContactsService.createContact(formData);

      toast({
        type: 'success',
        text: 'Contato criado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato',
      });
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default NewContact;
