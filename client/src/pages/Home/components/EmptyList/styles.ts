import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;
  flex-direction: column;

  p {
    margin-top: 8px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};;
    }
  }
`;
