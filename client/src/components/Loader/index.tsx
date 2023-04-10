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

  let container = document.getElementById('fullscreen-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'fullscreen-root');

    document.body.appendChild(container);
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
