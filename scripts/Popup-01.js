export class Popup {
  constructor(popupSettings) {
    this._pageSelector = popupSettings.page;
    this._overlaySelector = popupSettings.overlay; //!!!для каждого попапа указаывать своё значение
    this._overlayIsOpenedSelector = popupSettings.overlayIsOpened;
    this._popupSelector = popupSettings.popup;
    this._popupButtonCloseSelector = popupSettings.popupButtonClose;
    this._popupIsOpen = false;
    this._page = document.querySelector('.' + this._pageSelector);
    this._overlay = this._page.querySelector('.' + this._overlaySelector);
    this._popup = this._overlay.querySelector('.' + this._popupSelector);
    this._popupButtonClose = this._popup.querySelector('.' + this._popupButtonCloseSelector);
  }

  _addEventListenerClosePopupFromKeydownEscape() {
    this._page.addEventListener('keydown', this._closePopupFromKeydownEscape);
  }
  _removeEventListenerClosePopupFromKeydownEscape() {
    this._page.removeEventListener('keydown', this._closePopupFromKeydownEscape);
  }
  _closePopupFromKeydownEscape(evt) {
    if (evt.key === 'Escape') {
      this._closePopup();
    }
  }
  _addEventListenerClosePopupButtonClose() {
    this._popupButtonClose.addEventListener('click', this._closePopup);
  }
  _removeEventListenerClosePopupButtonClose() {
    this._popupButtonClose.removeEventListener('click', this._closePopup);
  }

  _addEventListenerClosePopupOverlay() {
    this._page.addEventListener('click', this._closePopupOverlay);
  }
  _removeEventListenerClosePopupOverlay() {
    this._page.removeEventListener('click', this._closePopupOverlay);
  }
  _closePopupOverlay(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains(this._overlayIsOpenedSelector)) {
      this._closePopup();
    }
  }
  _closePopup() {
    if (this._popupIsOpen === true) {
      this._toggleOverlayIsOpenedSelector();
      this._popupIsOpen = false;
      this._removeEventListenerClosePopupButtonClose(page);
      this._removeEventListenerClosePopupOverlay(page);
      this._removeEventListenerCloseFromKeydownEscape(page);
      //resetForm(overlayIsOpened);
    }
  }
  _toggleOverlayIsOpenedSelector() {
    this._overlay.classList.toggle(this._overlayIsOpenedSelector);
  }
  _openPopup() {
    this._addEventListenerClosePopupFromKeydownEscape();
    this._addEventListenerClosePopupButtonClose();
    this._addEventListenerClosePopupOverlay();
    this._toggleOverlayIsOpenedSelector();
    this._popupIsOpen = true;
  }
}
