/*
Создайте класс PopupWithImage, который наследует от Popup.
1. Этот класс должен перезаписывать родительский метод open.
2. В методе open класса PopupWithImage нужно вставлять в попап картинку с
src изображения и подписью к картинке.
*/
import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor({ popupSelector, selectors }) {
    super({ popupSelector, selectors });
    this._popupSelector = popupSelector;
    this._popupImageSelector = selectors.popupImage;
    this._popupCaptionSelector = selectors.popupCaption;
    this._popup = this._page.querySelector(this._popupSelector);
    this.popupImage = this._popup.querySelector(this._popupImageSelector);
    this.popupCaption = this._popup.querySelector(this._popupCaptionSelector);
  }

}
