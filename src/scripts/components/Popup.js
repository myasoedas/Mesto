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
import constants from '../constants.js';

export default class Popup {
  constructor({ popupSelector, selectors }) {
    this._popupSelector = popupSelector;
    this._pageSelector = selectors.page;
    this._popupIsOpenedSelector = selectors.overlayIsOpened;
    this._popupButtonCloseSelector = selectors.popupButtonClose;
    this._page = document.querySelector(this._pageSelector);
    this._popup = this._page.querySelector(this._popupSelector);
    this._EscClose = (evt) => {this._handleEscClose(evt)};
    this._closePopupButton = (evt) => {this._closePopupButtonClose(evt)};
    this._closePopup = (evt) => {this._closePopupOverlay(evt)};
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
  closePopup() {    
    this.removeEventListeners();
    this._popupClassListRemove(this._popupIsOpenedSelector);
  }
  _handleEscClose(evt) {
    if (evt.key === constants.escape) {
      this.closePopup();
    }
  }
  _closePopupButtonClose(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains(this._popupButtonCloseSelector)) {
      this.closePopup();
    }
  }
  _closePopupOverlay(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains(this._popupIsOpenedSelector)) {
      this.closePopup();
    }
  }
  _addEventListenerClosePopupFromKeydownEscape() {
    this._page.addEventListener('keydown', this._EscClose);
  }
  _removeEventListenerClosePopupFromKeydownEscape() {
    this._page.removeEventListener('keydown', this._EscClose);
  }
  _addEventListenerClosePopupButtonClose() {
    this._page.addEventListener('click', this._closePopupButton);
  }
  _removeEventListenerClosePopupButtonClose() {
    this._page.removeEventListener('click', this._closePopupButton);
  }
  _addEventListenerClosePopupOverlay() {
    this._page.addEventListener('click', this._closePopup);
  }
  _removeEventListenerClosePopupOverlay() {
    this._page.removeEventListener('click', this._closePopup);
  }
  setEventListeners() {
    this._addEventListenerClosePopupFromKeydownEscape();
    this._addEventListenerClosePopupButtonClose();
    this._addEventListenerClosePopupOverlay();
  }

  removeEventListeners() {
    this._removeEventListenerClosePopupFromKeydownEscape();
    this._removeEventListenerClosePopupButtonClose();
    this._removeEventListenerClosePopupOverlay();
  }
}
