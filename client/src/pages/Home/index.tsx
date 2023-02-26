import { Link } from 'react-router-dom';

import edit from '../../assets/images/icons/Edit.svg';
import trash from '../../assets/images/icons/Trash.svg';
import arrow from '../../assets/images/icons/Arrow.svg';

import {
  InputSearchContainer, Header, ListContainer, Card,
} from './styles';

const Home = () => (
  <>
    <InputSearchContainer>
      <input type="text" placeholder="Pesquisar contato" />
    </InputSearchContainer>

    <Header>
      <strong>3 contatos</strong>
      <Link to="/new">Novo contato</Link>
    </Header>

    <ListContainer>
      <header>
        <button type="button">
          <span>Nome</span>
          <img src={arrow} alt="Ícone de uma seta, em roxo" />
        </button>
      </header>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Luis Souza</strong>
            <small>Levva</small>
          </div>

          <span>luis.souza@levva.io</span>
          <span>(41) 99805-7276</span>
        </div>

        <div className="actions">
          <Link to="/edit/123">
            <img src={edit} alt="Ícone de uma caneta em cima de um papel, em azul" />
          </Link>
          <button type="button">
            <img src={trash} alt="Ícone de uma lixeira, em vermelho" />
          </button>
        </div>
      </Card>
    </ListContainer>
  </>
);

export default Home;
