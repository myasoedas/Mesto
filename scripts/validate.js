
function enableValidation() {
  //найти все формы на странице
  const formList = Array.from(page.querySelectorAll('.form'));

  //установить слушатель для каждой формы
  formList.forEach(formElement => {
    setEventListeners(formElement);
  })
}

function setEventListeners(formElement) {
  //найти все input
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));

  //найти все button submit
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
    })
  })
}

function checkInputValidity(formElement, inputElement) {
  //проверить input на валидность
  //если input валидный - скрыть ошибку,
  //если input не валидный - показать ошибку
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
  }
}

function hideInputError(formElement, inputElement) {
  inputElement.classList.remove('form__field_type_error');
  const spanElementError = inputElement.nextElementSibling;
  spanElementError.textContent = 'успешная валидация';
  spanElementError.classList.remove('form__field-error_active');
}

function showInputError(formElement, inputElement) {
  inputElement.classList.add('form__field_type_error');
  const inputElementErrorMessage = inputElement.validationMessage;
  const spanElementError = inputElement.nextElementSibling;
  spanElementError.textContent = inputElementErrorMessage;
  spanElementError.classList.add('form__field-error_active');
}



