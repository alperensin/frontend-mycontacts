import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({
  type = 'button',
  disabled = false,
  isLoading = false,
  danger = false,
  children,
  onClick,
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
