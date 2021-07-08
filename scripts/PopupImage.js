import { Popup } from './Popup.js';
export class PopupImage extends Popup {
  constructor(popupSettings, popupImageSettings, imageData) {
    super (popupSettings);
    this._overlaySelector = popupImageSettings.overlay;
    this._popupImageSelector = popupImageSettings.popupImage;
    this._popupCaptionSelector = popupImageSettings.popupCaption;
    this._overlay = document.querySelector('.' + this._overlaySelector);
    this._popupImage = this._overlay.querySelector('.' + this._popupImageSelector);
    this._popupCaption = this._overlay.querySelector('.' + this._popupCaptionSelector);
    this._popupButtonClose = this._overlay.querySelector('.' + this._popupButtonCloseSelector);
    this._imageTitle = imageData.titleImage;
    this._imageAlt = imageData.titleAlt;
    this._imageSrc = imageData.linkImage;

  }
  _setPopupImageData(){
    this._popupImage.src = this._imageSrc;
    this._popupImage.alt = this._imageAlt;
    this._popupCaption.textContent = this._imageTitle;
  }
  _resetPopupImageData(){
    this._popupImage.src = ' ';
    this._popupImage.alt = ' ';
    this._popupCaption.textContent = ' ';
  }
  _openPopup() {
    this._setPopupImageData();
    super._openPopup();
  }
  _closePopup() {
    this._resetPopupImageData();
    super._closePopup();
  }

}
