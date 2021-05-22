/*
const hideInputError = (formElement, inputElement) => {
  inputElement.classList.remove('form__field_type_error');
};

const showInputError = (formElement, inputElement) => {
  inputElement.classList.add('form__field_type_error');
};

const checkInputValidity = (formElement, inputElement) => {
  console.log(inputElement.validity.valid);
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputArray = Array.from(formElement.querySelectorAll('.form__field'));
  inputArray.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
    });

  });

};

const enableValidation = () => {
  const formArray = Array.from(page.querySelectorAll('.form'));
  formArray.forEach(formElement => {
    setEventListeners(formElement);
  });

};
*/
