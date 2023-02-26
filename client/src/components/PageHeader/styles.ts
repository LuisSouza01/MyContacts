import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 24px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }

    span {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  h1 {
    font-size: 24px;
    line-height: 30px;
  }
`;
