import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import useNewContact from './useNewContact';

const NewContact = () => {
  const {
    ContactFormRef,
    handleSubmit,
  } = useNewContact();

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
