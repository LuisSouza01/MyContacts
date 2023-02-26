import { Link } from 'react-router-dom';

import arrow from '../../assets/images/icons/Arrow.svg';

import { Container } from './styles';

type PageHeaderProps = {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => (
  <Container>
    <Link to="/">
      <img src={arrow} alt="Ícone de uma seta, em roxo" />
      <span>Voltar</span>
    </Link>

    <h1>{title}</h1>
  </Container>
);

export default PageHeader;
