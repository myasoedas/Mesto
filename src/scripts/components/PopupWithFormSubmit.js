import Popup from './Popup.js';
export default class PopupWithFormSubmit extends Popup {
  constructor({ popupSelector, selectors } ) {
    super({ popupSelector, selectors });
    this._popupSelector = popupSelector;
    this._formSelector = selectors.formSelector;
    this._popup = this._page.querySelector(this._popupSelector);
    this.form = this._popup.querySelector(this._formSelector);
    this._handleSubmitForm = null;
    this._setListenerFormSubmit = (evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
    };
  }
  // Функция, которая принимает стрелочную функцию в которой передается описание функции
  // которая примет как аргумент переданный экземпляр класса Card
  setSubmitAction(action) {
    this._handleSubmitForm = action;
  }


  _setEventListenerFormSubmit() {
    this.form.addEventListener('submit', this._setListenerFormSubmit);
  }
  _removeEventListenerFormSubmit() {
    this.form.removeEventListener('submit', this._setListenerFormSubmit);
  }
  setEventListeners() {
    super.setEventListeners();
    this._setEventListenerFormSubmit();
  }
  removeEventListeners() {
    super.removeEventListeners();
    this._removeEventListenerFormSubmit();
  }
  openPopup() {
    this.setEventListeners();
    this._popupClassListAdd(this._popupIsOpenedSelector);
  }
  closePopup() {
    this.form.reset();
    this.removeEventListeners();
    super.closePopup();
  }
}
