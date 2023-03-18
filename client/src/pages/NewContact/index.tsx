import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

export interface NewContactFormData {
  name: string;
  email: string
  phone: string;
  categoryId: string;
}

const NewContact = () => {
  async function handleSubmit(formData: NewContactFormData) {
    try {
      const response = await ContactsService.createContact(formData);

      console.log(response);
    } catch {
      // eslint-disable-next-line no-alert
      alert('Ocorreu um erro ao cadastrar o contato');
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
