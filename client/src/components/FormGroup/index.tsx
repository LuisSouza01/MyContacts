import React from 'react';

import { Container } from './styles';

type FormGroupProps = {
  children: React.ReactNode;
  error?: string | null
}

const FormGroup = ({ children, error }: FormGroupProps) => (
  <Container>
    {children}
    {error && <small>{error}</small>}
  </Container>
);

FormGroup.defaultProps = {
  error: null,
};

export default FormGroup;
