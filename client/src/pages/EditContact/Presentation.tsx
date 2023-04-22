/* eslint-disable no-unused-vars */
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import { NewContactFormData } from '../NewContact';

type PresentationProps = {
  isLoading: boolean;
  contactName: string;
  contactFormRef: any;
  onSubmit: (formData: NewContactFormData) => Promise<void>;
}

const Presentation = ({
  isLoading,
  contactName,
  contactFormRef,
  onSubmit,
}: PresentationProps) => (
  <>
    <Loader isLoading={isLoading} />

    <PageHeader
      title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
    />

    <ContactForm
      ref={contactFormRef}
      buttonLabel="Salvar alterações"
      onSubmit={onSubmit}
    />
  </>
);

export default Presentation;
