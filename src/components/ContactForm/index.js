import {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
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

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone);
        setCategoryId(contact.category_id);
      },
    }),
    [],
  );

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
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

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
    setName('');
    setEmail('');
    setPhone('');
    setCategoryId('');
  }

  const nameError = getErrorMessageByFieldName(NAME_FIELD);
  const emailError = getErrorMessageByFieldName(EMAIL_FIELD);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormGroup error={nameError}>
        <Input name={NAME_FIELD} type="text" placeholder="Nome *" value={name} onChange={handleNameChange} error={nameError} disabled={isSubmitting} />
      </FormGroup>

      <FormGroup error={emailError}>
        <Input name={EMAIL_FIELD} type="email" placeholder="E-mail" value={email} onChange={handleEmailChange} error={emailError} disabled={isSubmitting} />
      </FormGroup>

      <FormGroup>
        <Input name={PHONE_FIELD} type="text" placeholder="Telefone" maxLength={15} value={phone} onChange={handlePhoneChange} disabled={isSubmitting} />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={handleCategoryChange}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
