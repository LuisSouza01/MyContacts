import styled, { keyframes } from 'styled-components';

type ContainerProps = {
  danger?: boolean
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

export const Overlay = styled.div`
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.6);

  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${fadeIn} 0.3s;
`;

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 450px;
  background: #fff;

  padding: 24px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  > h1 {
    font-size: 22px;
    color: ${({ theme, danger }) => (
    danger ? theme.colors.danger.main
      : theme.colors.gray[900]
  )}
  }

  .modal-body {
    margin-top: 32px;
  }

  animation: ${scaleIn} 0.3s;
`;

export const Footer = styled.footer`
  margin-top: 32px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    border: none;
    background: transparent;

    font-size: 16px;
    margin-right: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
