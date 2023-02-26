import ReactDOM from 'react-dom';

import { Overlay } from './styles';

const Loader = () => {
  const fullScreenRoot = document.getElementById('fullscreen-root');

  if (!fullScreenRoot) {
    return null;
  }

  return (
    ReactDOM.createPortal(
      <Overlay>
        <div className="loader" />
      </Overlay>,
      fullScreenRoot,
    )
  );
};

export default Loader;
