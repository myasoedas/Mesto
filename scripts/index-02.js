import formSettings from './form-settings.js';
import popupSettings from './popup-settings.js';
import popupImageSettings from './popup-image-settings.js';
import { PopupImage } from './PopupImage.js'; //не работает так как не видит класс Popup
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import initialCards from './initial-сards.js';
import initialCssClasses from './initial-css-classes.js';

const imageData = {
  title: 'Байкал',
  alt: 'Байкал',
  src: 'https://avatars.mds.yandex.net/get-altay/4324851/2a000001781b385d17850611bc5bc9b46e31/XXL'
}
//console.log(popupImage._openPopup());
const popupImage = callbackNewPopupImage(popupSettings, popupImageSettings, imageData);
console.log(popupImage);
callbackOpenPopupImage(popupImage);

function callbackOpenPopupImage(popupImage) {
  return popupImage._openPopup();
}


function callbackNewPopupImage(popupSettings, popupImageSettings, imageData) {
  return new PopupImage(popupSettings, popupImageSettings, imageData);
}

