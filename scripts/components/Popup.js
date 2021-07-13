/*
Класс Popup, отвечает за открытие и закрытие попапа
1. Принимает в конструктор единственный параметр — селектор попапа
2. Содержит публичные методы open и close, которые отвечают за открытие
и закрытие попапа.
3. Содержит приватный метод _handleEscClose, который содержит логику
закрытия попапа клавишей Esc.
4. Содержит публичный метод setEventListeners, который добавляет
слушатель клика иконке закрытия попапа. Модальное окно также закрывается
при клике на затемнённую область вокруг формы.
*/
export default class Popup {
  constructor({ popupSelector, selectors }) {
    this._popupSelector = popupSelector;
    this._pageSelector = selectors.page;
    this._popupIsOpenedSelector = selectors.overlayIsOpened;
    this._popupButtonCloseSelector = selectors.popupButtonClose;
    this._page = document.querySelector(this._pageSelector);
    this._popup = this._page.querySelector(this._popupSelector);
  }

  openPopup() {
    this.setEventListeners();
    this._popupClassListAdd(this._popupIsOpenedSelector);
  }
  _popupClassListToggle(selector) {
    this._popup.classList.toggle(selector);
  }
  _popupClassListAdd(selector) {
    this._popup.classList.add(selector);
  }
  _popupClassListRemove(selector) {
    this._popup.classList.remove(selector);
  }
  _closePopup() {
    this._popupClassListRemove(this._popupIsOpenedSelector);
    //this.removeEventListeners();
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._closePopup();
    }
  }
  _closePopupButtonClose(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains(this._popupButtonCloseSelector)) {
      this._closePopup();
    }
  }
  _closePopupOverlay(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains(this._popupIsOpenedSelector)) {
      this._closePopup();
    }
  }
  _addEventListenerClosePopupFromKeydownEscape() {
    this._page.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
  _addEventListenerClosePopupButtonClose() {
    this._page.addEventListener('click', (evt) => this._closePopupButtonClose(evt));
  }
  _addEventListenerClosePopupOverlay() {
    this._page.addEventListener('click', (evt) => this._closePopupOverlay(evt));
  }
  setEventListeners() {
    this._addEventListenerClosePopupFromKeydownEscape();
    this._addEventListenerClosePopupButtonClose();
    this._addEventListenerClosePopupOverlay();
  }
  /*_removeEventListenerClosePopupButtonClose() {
    this._page.removeEventListener('click', (evt) => this._closePopupButtonClose(evt));
  }
  _removeEventListenerClosePopupOverlay() {
    this._page.removeEventListener('click', (evt) => this._closePopupOverlay(evt));
  }
  _removeEventListenerCloseFromKeydownEscape() {
    this._page.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
  removeEventListeners() {
    this._removeEventListenerCloseFromKeydownEscape();
    this._removeEventListenerClosePopupButtonClose();
    this._removeEventListenerClosePopupOverlay();
  }*/
}
