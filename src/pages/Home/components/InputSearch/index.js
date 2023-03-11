import PropTypes from 'prop-types';
import { Container } from './styles';

export default function InputSearch({ value, onChange, isVisible }) {
  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      <input value={value} onChange={onChange} type="text" placeholder="Pesquise pelo nome..." />
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
};

InputSearch.defaultProps = {
  isVisible: false,
};
