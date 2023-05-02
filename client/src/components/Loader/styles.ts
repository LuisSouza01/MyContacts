import styled, { keyframes, css } from 'styled-components';

type OverlayProps = {
  isLeaving: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const Overlay = styled.div<OverlayProps>`
  width: 100%;
  height: 100%;
  background: rgba(246, 245, 252, 0.7);

  top: 0;
  left: 0;
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${fadeOut} 0.3s forwards;
  `}
`;
