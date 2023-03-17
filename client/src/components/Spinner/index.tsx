import { StyleSpinner } from './styles';

type SpinnerProps = {
  size?: number;
}

const Spinner = ({ size }: SpinnerProps) => <StyleSpinner size={size} />;

Spinner.defaultProps = {
  size: 32,
};

export default Spinner;
