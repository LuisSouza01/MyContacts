import sad from '../../assets/images/sad.svg';
import Button from '../../../../components/Button';

import { Container } from './styles';

type ErrorStatusProps = {
  onTryAgain: () => void;
}

const ErrorStatus = ({ onTryAgain }: ErrorStatusProps) => (
  <Container>
    <img src={sad} alt="Sad" />

    <div className="details">
      <span>Ocorreu um erro ao obter os seus contatos!</span>

      <Button type="button" onClick={onTryAgain}>
        Tentar novamente
      </Button>
    </div>
  </Container>
);

export default ErrorStatus;
