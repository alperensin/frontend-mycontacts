import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';
import isEmailValid from '../../utils/isEmailValid';
import { ButtonContainer } from './styles';

const NAME_FIELD = 'name';
const EMAIL_FIELD = 'email';
const PHONE_FIELD = 'phone';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(event) {
    setName(event.target.value);

    const fieldName = event.target.name;
    const message = 'Nome é obrigatório.';

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: fieldName, message },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    const fieldName = event.target.name;
    const message = 'E-mail inválido.';

    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === fieldName);

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: fieldName, message },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
    }
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find(({ field }) => field === fieldName)?.message;
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
