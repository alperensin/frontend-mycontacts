import {
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';
import useContactForm from './useContactForm';
import { ButtonContainer } from './styles';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    name,
    email,
    phone,
    categoryId,
    categories,
    nameError,
    emailError,
    isSubmitting,
    isFormValid,
    isLoadingCategories,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleCategoryChange,
  } = useContactForm(onSubmit, ref);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormGroup error={nameError}>
        <Input name="name" type="text" placeholder="Nome *" value={name} onChange={handleNameChange} error={nameError} disabled={isSubmitting} />
      </FormGroup>

      <FormGroup error={emailError}>
        <Input name="email" type="email" placeholder="E-mail" value={email} onChange={handleEmailChange} error={emailError} disabled={isSubmitting} />
      </FormGroup>

      <FormGroup>
        <Input name="phone" type="text" placeholder="Telefone" maxLength={15} value={phone} onChange={handlePhoneChange} disabled={isSubmitting} />
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
