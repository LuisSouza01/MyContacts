import { Overlay } from './styles';

import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';

type LoaderProps = {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
};

export default Loader;
