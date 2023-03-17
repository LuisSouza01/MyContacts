import React from 'react';

import { Container } from './styles';

type FormGroupProps = {
  children: React.ReactNode;
  error?: string | null;
  isLoading?: boolean;
}

const FormGroup = ({ children, error, isLoading }: FormGroupProps) => (
  <Container>
    <div className="form-item">
      {children}

      {isLoading && (
        <div className="loader" />
      )}
    </div>

    {error && <small>{error}</small>}
  </Container>
);

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};

export default FormGroup;
