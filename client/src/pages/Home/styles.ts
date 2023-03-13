import styled from 'styled-components';

type HeaderProps = {
  hasError: boolean;
}

type ListHeaderProps = {
  orderBy: String;
}

export const InputSearchContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;

  input {
    width: 100%;
    height: 50px;

    outline: 0;
    border: none;
    padding: 0 16px;

    background: #fff;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;

export const Header = styled.header<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ hasError }) => (hasError ? 'flex-end' : 'space-between')};

  margin-top: 32px;
  margin-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
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

export const ListHeader = styled.header<ListHeaderProps>`
  margin-top: 24px;

  margin-bottom: 8px;

  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    span {
      font-weight: 700;
      margin-right: 8px;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: transform 0.2s ease-in;
    }
  }
`;

export const Card = styled.div`
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  .info {
    display: flex;
    flex-direction: column;

    .contact-name {
      display: flex;
      align-items: center;

      small {
        padding: 4px;
        font-weight: 700;
        border-radius: 4px;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.primary.main};
        background: ${({ theme }) => theme.colors.primary.lighter};
        margin-left: 8px;
      }
    }

    span {
      font-size: 14px;
      line-height: 18px;
      margin-top: 4px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      border: none;
      background: transparent;
      margin-left: 8px;
    }
  }
`;

export const ErrroContainer = styled.div`
  margin-top: 16px;

  display: flex;
  align-items: center;

  .details {
    margin-left: 24px;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: 8px;
    }
  }
`;
