export default class {
  constructor(formElement, formSettings) {
    this._formSelector = formSettings.formSelector;
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass;
    this._formFieldName = formSettings.formFieldName;
    this._formFieldCaption = formSettings.formFieldCaption;
    this._formFieldPlace = formSettings.formFieldPlace;
    this._formFieldSrcLink = formSettings.formFieldSrcLink;
    this._formElement = formElement;
    this._buttonSubmitElement = this._formElement.querySelector(this._submitButtonSelector);
    //this._formElementArray = document.querySelectorAll(this._formSelector);
    //this._buttonSubmitElementArray = document.querySelectorAll(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners(this._formElement, this._buttonSubmitElement);
  }


  _setEventListeners(formElement, buttonSubmitElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this.toggleButtonState(buttonSubmitElement, inputList);
      })
    })
    this.toggleButtonState(buttonSubmitElement, inputList);
  }
  _isInputListValid(inputList) {
    if (inputList.every(function(inputListItem){ return inputListItem.validity.valid === true; })) {
      return true;
    } else {
      return false;
    }
  }
  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
      this.hideInputError(formElement, inputElement);
    } else {
      this._showInputError(formElement, inputElement);
    }
  }
  toggleButtonState(buttonSubmitElement, inputList) {
    //добавляю стили для кнопки с помощью псевдокласса :disabled
    //в файле form__button-save.css
    //псевдокласс автоматически применяет стили если кнопка переходит в состояние disabled
    //в связи с этим применять отдельный класс излишне
    if (this._isInputListValid(inputList)) {
      buttonSubmitElement.disabled = false;
    } else {
      buttonSubmitElement.disabled = true;
    }
  }
  hideInputError(formElement, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const spanElementError = inputElement.nextElementSibling;
    spanElementError.textContent = 'успешная валидация';
    spanElementError.classList.remove(this._errorClass);
  }
  _showInputError(formElement, inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const inputElementErrorMessage = inputElement.validationMessage;
    const spanElementError = inputElement.nextElementSibling;
    spanElementError.textContent = inputElementErrorMessage;
    spanElementError.classList.add(this._errorClass);
  }
}
