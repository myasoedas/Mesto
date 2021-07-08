import { Popup } from './Popup.js';
export class PopupImage extends Popup {
  constructor(popupSettings, popupImageSettings, imageData) {
    super (popupSettings);
    this._overlaySelector = popupImageSettings.overlay;
    this._popupImageSelector = popupImageSettings.popupImage;
    this._popupCaptionSelector = popupImageSettings.popupCaption;
    this._overlay = document.querySelector('.' + this._popupImageSelector);
    this._popupImage = this._overlay.querySelector('.' + this._popupImageSelector);
    this._popupCaption = this._overlay.querySelector('.' + this._popupCaptionSelector);
    this._popupImageTitle = imageData.title;
    this._popupImageAlt = imageData.alt;
    this._popupImageSrc = imageData.src;
  }

  _openPopup() {
    this._popupImage.src = this._popupImageSrc;
    this._popupImage.alt =this._popupImageAlt;
    this._popupCaption.textContent = this._popupImageTitle;
    super._openPopup();
  }    



}
