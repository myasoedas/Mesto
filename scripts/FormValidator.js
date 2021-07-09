export class FormValidator {
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
    this._inputListArray = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _resetForm() {
    this._formElement.reset();
    for (let i = 0; i < this._inputListArray.length; i++) {
      this._hideInputError(this._inputListArray[i]);
    }
  }
  _setEventListeners() {
    this._inputListArray.forEach(inputElement => this._addEventListenerInputElement(inputElement));
    this._toggleButtonState();
  }
  _addEventListenerInputElement(inputElement) {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(this._inputListArray);
    });
  }
  _isInputListValid() {
    if (this._inputListArray.every(
      function(inputListItem) {
        return inputListItem.validity.valid === true;
      })) {
      return true;
    } else {
      return false;
    }
  }
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }
  _toggleButtonState() {
    if (this._isInputListValid()) {
      this._buttonSubmitElement.disabled = false;
    } else {
      this._buttonSubmitElement.disabled = true;
    }
  }
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const spanElementError = inputElement.nextElementSibling;
    spanElementError.textContent = 'успешная валидация';
    spanElementError.classList.remove(this._errorClass);
  }
  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const inputElementErrorMessage = inputElement.validationMessage;
    const spanElementError = inputElement.nextElementSibling;
    spanElementError.textContent = inputElementErrorMessage;
    spanElementError.classList.add(this._errorClass);
  }
}
