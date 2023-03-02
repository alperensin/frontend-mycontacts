import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import { ButtonContainer } from './styles';

const NAME_FIELD = 'name';
const EMAIL_FIELD = 'email';
const PHONE_FIELD = 'phone';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleNameChange(event) {
    const { value, name: field } = event.target;
    const message = 'Nome é obrigatório.';

    setName(value);

    if (!value) {
      setError({ field, message });
    } else {
      removeError(field);
    }
  }

  function handleEmailChange(event) {
    const { value, name: field } = event.target;
    const message = 'E-mail inválido.';

    setEmail(value);

    if (value && !isEmailValid(value)) {
      setError({ field, message });
    } else {
      removeError(field);
    }
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const nameError = getErrorMessageByFieldName(NAME_FIELD);
  const emailError = getErrorMessageByFieldName(EMAIL_FIELD);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup error={nameError}>
        <Input name={NAME_FIELD} type="text" placeholder="Nome" value={name} onChange={handleNameChange} error={nameError} />
      </FormGroup>

      <FormGroup error={emailError}>
        <Input name={EMAIL_FIELD} type="text" placeholder="E-mail" value={email} onChange={handleEmailChange} error={emailError} />
      </FormGroup>

      <FormGroup>
        <Input name={PHONE_FIELD} type="text" placeholder="Telefone" value={phone} onChange={handlePhoneChange} />
      </FormGroup>

      <FormGroup>
        <Select value={category} onChange={handleCategoryChange}>
          <option value="">Categoria</option>
          <option value="1">Instagram</option>
          <option value="2">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
