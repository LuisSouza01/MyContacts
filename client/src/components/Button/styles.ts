import styled, { css } from 'styled-components';

type ButtonComponentProps = {
  danger?: boolean;
}

export const ButtonComponent = styled.button<ButtonComponentProps>`
  height: 52px;
  padding: 0 16px;
  border-radius: 4px;

  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  background: ${({ theme }) => theme.colors.primary.main};

  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: background 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    cursor: default;
    background: #ccc;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
      background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}
`;
