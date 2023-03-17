import React, { useCallback, useEffect, useState } from 'react';

import Button from '../Button';
import FormGroup from '../FormGroup';

import useErrors from '../../hooks/useErrors';

import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';
import CategoriesService from '../../services/CategoriesService';

import {
  Form, Input, Select, ButtonContainer,
} from './styles';

export interface Category {
  id: string;
  name: string;
}

type ContactFormProps = {
  buttonLabel: string;
}

const ContactForm = ({ buttonLabel }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>();
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const {
    setError, removeError, getErrrorMessageByFieldName, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  const loadCategories = useCallback(async () => {
    try {
      const categoriesList = await CategoriesService.listCategories();

      setCategories(categoriesList);
    } catch {} finally {
      setIsLoadingCategories(false);
    }
  }, []);

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        />
      </FormGroup>

      <FormGroup error={getErrrorMessageByFieldName('email')}>
        <Input
          type="email"
          value={email}
          placeholder="E-mail"
          error={!!getErrrorMessageByFieldName('email')}
          onChange={(event) => handleEmailChange(event)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="text"
          value={phone}
          placeholder="Telefone"
          maxLength={15}
          onChange={(event) => handlePhoneChange(event)}
        />
      </FormGroup>

      <FormGroup isLoading>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Selecione uma categoria</option>

          {categories?.map((category) => (
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
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
};

export default ContactForm;
