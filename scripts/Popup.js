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
    this._popupButtonClose = this._overlay.querySelector('.' + this._popupButtonCloseSelector);
  }

  _addOverlayIsOpenedSelector() {
    this._overlay.classList.add(this._overlayIsOpenedSelector);
  }
  _removeOverlayIsOpenedSelector() {
    this._overlay.classList.remove(this._overlayIsOpenedSelector);
  }
  _openPopup() {
    this._addEventListenerClosePopupButtonClose();
    this._addEventListenerClosePopupOverlay();
    this._addEventListenerClosePopupFromKeydownEscape();
    this._addOverlayIsOpenedSelector();
    this._popupIsOpen = true;
  }
  _closePopup() {
    this._removeOverlayIsOpenedSelector();
    this._popupIsOpen = false;
  }
  _closePopupFromButtonClose(evt){
    const eventTarget = evt.target;
    if (eventTarget.classList.contains(this._popupButtonCloseSelector)) {
      this._closePopup();
    }
  }
  _closePopupOverlay(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains(this._overlayIsOpenedSelector)) {
      this._closePopup();
    }
  }
  _closePopupFromKeydownEscape(evt) {
    if (evt.key === 'Escape') {
      this._closePopup();
    }
  }
  _addEventListenerClosePopupButtonClose() {
    this._popupButtonClose.addEventListener('click', (event) => this._closePopupFromButtonClose(event));
  }
  _addEventListenerClosePopupOverlay() {
    this._overlay.addEventListener('click', (event) => this._closePopupOverlay(event));
  }
  _addEventListenerClosePopupFromKeydownEscape() {
    this._page.addEventListener('keydown', (event) => this._closePopupFromKeydownEscape(event));
  }

}


