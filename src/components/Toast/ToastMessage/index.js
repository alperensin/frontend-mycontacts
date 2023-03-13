import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';

export default function ToastMessage({
  message, onRemoveMessage, isLeaving, onAnimationEnd,
}) {
  const animatedElementRef = useRef();

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

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }

    const elementRef = animatedElementRef.current;

    if (isLeaving) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      elementRef.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isLeaving, onAnimationEnd, message]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container ref={animatedElementRef} isLeaving={isLeaving} type={message.type} onClick={handleRemoveToast} tabIndex={0} role="button">
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
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};
