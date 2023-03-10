import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({
  children, type, disabled, isLoading, danger, onClick,
}) {
  return (
    <StyledButton onClick={onClick} danger={danger} type={type} disabled={disabled || isLoading}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  isLoading: false,
  type: 'button',
  disabled: false,
  danger: false,
  onClick: undefined,
};
