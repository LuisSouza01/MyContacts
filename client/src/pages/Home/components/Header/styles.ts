import styled from 'styled-components';

type HeaderProps = {
  justifyContent: string;
}

export const Container = styled.header<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => `${justifyContent}`};

  margin-top: 32px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  padding-bottom: 16px;

  strong {
    color: #222;
    font-size: 24px;
    line-height: 30px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 700;
    line-height: 20px;
    text-decoration: none;

    padding: 8px 16px;
    border-radius: 4px;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};

    transition: all ease-in 0.2s;

    &:hover {
      color: #fff;
      background: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
