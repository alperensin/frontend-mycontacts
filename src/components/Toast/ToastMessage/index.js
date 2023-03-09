import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Container } from './styles';

import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';

export default function ToastMessage({
  message, onRemoveMessage,
}) {
  const icon = useMemo(() => {
    switch (message.type) {
      case 'danger':
        return xCircleIcon;
      case 'success':
        return checkCircleIcon;
      case 'default':
      default:
        return null;
    }
  }, [message.type]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container type={message.type} onClick={handleRemoveToast} tabIndex={0} role="button">
      {(icon !== null) && <img src={icon} alt={`${message.type} icon`} />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
