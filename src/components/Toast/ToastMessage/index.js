import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Container } from './styles';

import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';

export default function ToastMessage({ text, type }) {
  const icon = useMemo(() => {
    switch (type) {
      case 'danger':
        return xCircleIcon;
      case 'success':
        return checkCircleIcon;
      case 'default':
      default:
        return null;
    }
  }, [type]);

  return (
    <Container type={type}>
      {(icon !== null) && <img src={icon} alt={`${type} icon`} />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
