import { useEffect, useImperativeHandle, useState } from 'react';
import CategoriesService from '../../services/CategoriesService';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

const NAME_FIELD = 'name';
const EMAIL_FIELD = 'email';

export default function useContactForm(onSubmit, ref) {
  const [categories, setCategories] = useSafeAsyncState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone ?? ''));
        setCategoryId(contact.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
    }),
    [],
  );

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories(null, controller.signal);
        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories]);

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
  }

  const nameError = getErrorMessageByFieldName(NAME_FIELD);
  const emailError = getErrorMessageByFieldName(EMAIL_FIELD);

  return {
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
  };
}
