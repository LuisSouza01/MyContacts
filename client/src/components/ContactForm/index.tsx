import { forwardRef } from 'react';

import Button from '../Button';
import FormGroup from '../FormGroup';

import { NewContactFormData } from '../../pages/NewContact/useNewContact';

import {
  Form, Input, Select, ButtonContainer,
} from './styles';
import useContactForm from './useContactForm';

export interface Category {
  id: string;
  name: string;
}

type ContactFormProps = {
  buttonLabel: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (formData: NewContactFormData) => Promise<void>;
}

const ContactForm = forwardRef(({ buttonLabel, onSubmit }: ContactFormProps, ref: any) => {
  const {
    handleSubmit,
    getErrrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    categories,
    isFormValid,
    setCategoryId,
  } = useContactForm(onSubmit, ref);

  return (
    <Form onSubmit={(event) => handleSubmit(event)} noValidate>
      <FormGroup error={getErrrorMessageByFieldName('name')}>
        <Input
          type="text"
          value={name}
          placeholder="Nome *"
          error={!!getErrrorMessageByFieldName('name')}
          onChange={(event) => handleNameChange(event)}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrrorMessageByFieldName('email')}>
        <Input
          type="email"
          value={email}
          placeholder="E-mail"
          error={!!getErrrorMessageByFieldName('email')}
          onChange={(event) => handleEmailChange(event)}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="text"
          value={phone}
          placeholder="Telefone"
          maxLength={15}
          onChange={(event) => handlePhoneChange(event)}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Selecione uma categoria</option>

          {categories?.map((category: any) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

export default ContactForm;
