import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import { ButtonContainer } from './styles';
import CategoriesService from '../../services/CategoriesService';

const NAME_FIELD = 'name';
const EMAIL_FIELD = 'email';
const PHONE_FIELD = 'phone';

export default function ContactForm({ buttonLabel }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      const categoriesList = await CategoriesService.listCategories();
      setCategories(categoriesList);
    }

    loadCategories();
  }, []);

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
    const { value } = e.target;
    const phoneNumberFormatted = formatPhone(value);

    setPhone(phoneNumberFormatted);
  }

  function handleCategoryChange(e) {
    setCategoryId(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const nameError = getErrorMessageByFieldName(NAME_FIELD);
  const emailError = getErrorMessageByFieldName(EMAIL_FIELD);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormGroup error={nameError}>
        <Input name={NAME_FIELD} type="text" placeholder="Nome *" value={name} onChange={handleNameChange} error={nameError} />
      </FormGroup>

      <FormGroup error={emailError}>
        <Input name={EMAIL_FIELD} type="email" placeholder="E-mail" value={email} onChange={handleEmailChange} error={emailError} />
      </FormGroup>

      <FormGroup>
        <Input name={PHONE_FIELD} type="text" placeholder="Telefone" maxLength={15} value={phone} onChange={handlePhoneChange} />
      </FormGroup>

      <FormGroup>
        <Select value={categoryId} onChange={handleCategoryChange}>
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
