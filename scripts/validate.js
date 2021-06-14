
function enableValidation(overlayPopupForm) {
  const formElement = overlayPopupForm.querySelector('.form');
  const buttonSubmitElement = overlayPopupForm.querySelector('.form__button-save');
  setEventListeners(formElement, buttonSubmitElement);
}

function setEventListeners(formElement, buttonSubmitElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(buttonSubmitElement, inputList);
    })
  })
  toggleButtonState(buttonSubmitElement, inputList);
}

function inputListValid(inputList) {
  if (inputList[0].validity.valid && inputList[1].validity.valid ) {
    return true;
  } else {
    return false;
  }
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
  }
}

function toggleButtonState(buttonSubmitElement, inputList) {
  //добавляю стили для кнопки с помощью псевдокласса :disabled
  //в файле form__button-save.css
  //псевдокласс автоматически применяет стили если кнопка переходит в состояние disabled
  //в связи с этим применять отдельный класс излишне
  if (inputListValid(inputList)) {
    buttonSubmitElement.disabled = false;
  } else {
    buttonSubmitElement.disabled = true;
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



