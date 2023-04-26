import styled from 'styled-components';

type ListHeaderProps = {
  orderBy: string;
}

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

export const SearchNotFoundCointaer = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: flex-start;

  span {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-word;
  }
`;
