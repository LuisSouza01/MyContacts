import React, { ButtonHTMLAttributes } from 'react';

import { ButtonComponent } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
  children: React.ReactNode;
}

const Button = ({ children, danger, ...rest }: ButtonProps) => (
  <ButtonComponent {...rest} danger={danger}>
    {children}
  </ButtonComponent>
);

Button.defaultProps = {
  danger: false,
};

export default Button;
