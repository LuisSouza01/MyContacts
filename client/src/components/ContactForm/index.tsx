import React, {
  useCallback, useEffect, useState, forwardRef, useImperativeHandle,
} from 'react';

import Button from '../Button';
import FormGroup from '../FormGroup';

import useErrors from '../../hooks/useErrors';

import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';
import CategoriesService from '../../services/CategoriesService';

import {
  Form, Input, Select, ButtonContainer,
} from './styles';
import { NewContactFormData } from '../../pages/NewContact';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import { ContactDomainMapper } from '../../services/mappers/ContactMapper';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, getErrrorMessageByFieldName, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFiledsValues: (contact: ContactDomainMapper) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  const loadCategories = useCallback(async () => {
    try {
      const categoriesList = await CategoriesService.listCategories();

      setCategories(categoriesList);
    } catch {} finally {
      setIsLoadingCategories(false);
    }
  }, [setCategories, setIsLoadingCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });

    setIsSubmitting(false);

    setName('');
    setEmail('');
    setPhone('');
    setCategoryId('');
  }

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
