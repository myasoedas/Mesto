import { Popup } from './Popup.js';
import { Card } from './Card.js';
import initialCssClasses from './initial-css-classes.js';
export class PopupAddPlace extends Popup {
  constructor(popupSettings, popupAddPlaceSettings) {
    super (popupSettings);
    this._overlaySelector = popupAddPlaceSettings.overlaySelector;
    this._formSelector = popupAddPlaceSettings.formSelector;
    this._formTitleSelector = popupAddPlaceSettings.formTitleSelector;
    this._formInputPlaceNameTitleSelector = popupAddPlaceSettings.formInputPlaceNameTitleSelector;
    this._formSpanErrorSelector = popupAddPlaceSettings.formSpanErrorSelector;
    this._formInputPlaceNameSrcSelector = popupAddPlaceSettings.formInputPlaceNameSrcSelector;
    this._formButtonSaveSelector = popupAddPlaceSettings.formButtonSaveSelector;
    this._overlay = this._page.querySelector('.' + this._overlaySelector);
    this._popupButtonClose = this._overlay.querySelector('.' + this._popupButtonCloseSelector);
    this._form = this._overlay.querySelector('.' + this._formSelector);
    this._formInputPlaceNameTitle = this._form.querySelector('.' + this._formInputPlaceNameTitleSelector);
    this._formInputPlaceNameSrc = this._form.querySelector('.' + this._formInputPlaceNameSrcSelector);
  }

  _openPopup() {
    super._openPopup();
  }
  _addEventListenerFormAddPlace() {
    this._form.addEventListener('submit', (event) => this._saveNewPlace(event));
  }
  _saveNewPlace(event) {
    event.preventDefault(); //отключаем стандартное событие submit при нажатии кнопки
    const placeName = this._formInputPlaceNameTitle.value;
    const linkPlaceImage = this._formInputPlaceNameSrc.value;
    const cardData = {
      titleImage: placeName,
      linkImage: linkPlaceImage,
      titleAlt: placeName
    }
    closePopup();

    const card = new Card(cardData, initialCssClasses);
    const elementsItem = card.createCard();
    addEventListenerОpenPopupImage(elementsItem);
    addElement(initialCssClasses.elementsList, elementsItem);
    resetForm(popupAddPlace);
    //toggleButton(popupAddPlace);

  }


}
