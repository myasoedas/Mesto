/*
Создайте класс PopupWithForm, который наследует от Popup.
1. Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
2. Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
3. Перезаписывает родительский метод setEventListeners.
4. Метод setEventListeners класса PopupWithForm должен не только
добавлять обработчик клика иконке закрытия,но и добавлять обработчик сабмита формы.
5. Перезаписывает родительский метод close, так как при закрытии
попапа форма должна ещё и сбрасываться.
6. Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/
import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, selectors, handleSubmitForm } ) {
    super({ popupSelector, selectors });
    this._popupSelector = popupSelector;
    this._formSelector = selectors.formSelector;
    this._formInputSelector = selectors.inputSelector;
    this._popup = this._page.querySelector(this._popupSelector);
    this.form = this._popup.querySelector(this._formSelector);
    this._formInputArray = this.form.querySelectorAll(this._formInputSelector);
    this._formInputValueObject = new Object();
    this._handleSubmitForm = handleSubmitForm;

  }

  _getFormInputValues() {
    this._formInputArray.forEach((element) => this._formInputValueObject[element.name] = element.value);
    return this._formInputValueObject;
  }
  _setEventListenerFormSubmit() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const InputValueObject = this._getFormInputValues();
      this._handleSubmitForm(InputValueObject);
      this.form.reset();
    });
  }
  _removeEventListenerFormSubmit() {
    this.form.removeEventListener('submit', (evt) => {
      this._handleSubmitForm(InputValueObject);});
  }
  setEventListeners() {
    super.setEventListeners();
    this._setEventListenerFormSubmit();
  }

  openPopup() {
    this.setEventListeners();
    this._popupClassListAdd(this._popupIsOpenedSelector);
  }

  closePopup() {
    super.closePopup();
    this.form.reset();
    this._removeEventListenerFormSubmit();
  }

}
