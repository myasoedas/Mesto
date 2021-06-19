function enableValidation(formSettings) {
  const formElementArray = document.querySelectorAll(formSettings.formSelector);
  const buttonSubmitElementArray = document.querySelectorAll(formSettings.submitButtonSelector);
  for (let i = 0; i < formElementArray.length; i++){
    setEventListeners(formElementArray[i], buttonSubmitElementArray[i]);
  }
}

function setEventListeners(formElement, buttonSubmitElement) {
  const inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(buttonSubmitElement, inputList);
    })
  })
  toggleButtonState(buttonSubmitElement, inputList);
}

function isInputListValid(inputList) {
  if (inputList.every(function(inputListItem){ return inputListItem.validity.valid === true; })) {
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
  if (isInputListValid(inputList)) {
    buttonSubmitElement.disabled = false;
  } else {
    buttonSubmitElement.disabled = true;
  }
}

function hideInputError(formElement, inputElement) {
  inputElement.classList.remove(formSettings.inputErrorClass);
  const spanElementError = inputElement.nextElementSibling;
  spanElementError.textContent = 'успешная валидация';
  spanElementError.classList.remove(formSettings.errorClass);
}

function showInputError(formElement, inputElement) {
  inputElement.classList.add(formSettings.inputErrorClass);
  const inputElementErrorMessage = inputElement.validationMessage;
  const spanElementError = inputElement.nextElementSibling;
  spanElementError.textContent = inputElementErrorMessage;
  spanElementError.classList.add(formSettings.errorClass);
}



