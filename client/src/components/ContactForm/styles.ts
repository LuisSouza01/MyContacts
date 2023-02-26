import styled, { css } from 'styled-components';

type InputProps = {
  error?: boolean;
}

export const Form = styled.form``;

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border-radius: 4px;

  outline: none;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  font-size: 16px;
  appearance: none;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}
`;

export const Select = styled.select`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border-radius: 4px;

  outline: none;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  font-size: 16px;
  appearance: none;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
  }
`;
