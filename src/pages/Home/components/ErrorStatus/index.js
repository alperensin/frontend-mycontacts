import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import { Container } from './styles';

import sad from '../../../../assets/images/sad.svg';

export default function ErrorStatus({ onTryAgain, isVisible }) {
  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      <img src={sad} alt="Sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>Tentar novamente</Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
};

ErrorStatus.defaultProps = {
  isVisible: false,
};
