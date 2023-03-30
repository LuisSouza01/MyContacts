import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  padding: 16px 32px;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }

  &.default {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }

  &.danger {
    background-color: ${({ theme }) => theme.colors.danger.main};
  }

  &.success {
    background-color: ${({ theme }) => theme.colors.success.main};
  }
`;
