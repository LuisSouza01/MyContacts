import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: flex-start;

  span {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-word;
  }
`;
