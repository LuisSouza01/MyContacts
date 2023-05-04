import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }

  to {
    opacity: 0;
    transform: translateY(100px);

  }
`;

type ContainerProps = {
  isLeaving: boolean;
}

export const Container = styled.div<ContainerProps>`
  cursor: pointer;
  padding: 16px 32px;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${messageIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${messageOut} 0.2s;`}

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
