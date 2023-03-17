import ReactDOM from 'react-dom';

import { Overlay } from './styles';

import Spinner from '../Spinner';

type LoaderProps = {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) {
    return null;
  }

  const fullScreenRoot = document.getElementById('fullscreen-root');

  if (!fullScreenRoot) {
    return null;
  }

  return (
    ReactDOM.createPortal(
      <Overlay>
        <Spinner size={90} />
      </Overlay>,
      fullScreenRoot,
    )
  );
};

export default Loader;
