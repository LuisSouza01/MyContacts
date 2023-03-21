import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

const EditContact = () => (
  <>
    <PageHeader title="Editar Contato" />

    <ContactForm buttonLabel="Salvar alterações" onSubmit={async () => console.log('oi')} />
  </>
);

export default EditContact;
