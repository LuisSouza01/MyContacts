import React, { ButtonHTMLAttributes } from 'react';

import Spinner from '../Spinner';

import { ButtonComponent } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = ({
  children, danger, isLoading, disabled, ...rest
}: ButtonProps) => (
  <ButtonComponent {...rest} danger={danger} disabled={disabled || isLoading}>
    {isLoading ? <Spinner /> : children}
  </ButtonComponent>
);

Button.defaultProps = {
  danger: false,
  isLoading: false,
};

export default Button;
