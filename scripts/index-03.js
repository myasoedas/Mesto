// 1. Вопрос: Как удалять слушатель если используем классы, способ который работал с функциями не работает
// 2. Как правильно по БЭМ давать имена файлам классов

import popupSettings from './popup-settings.js';
import popupImageSettings from './popup-image-settings.js';
import popupAddPlaceSettings from './popup-add-place-settings.js';
import imageData from './initial-сards.js';
import { Popup } from './Popup.js';
import { PopupImage } from './PopupImage.js';
import { PopupAddPlace } from './PopupAddPlace.js';

const popupAddPlace = new PopupAddPlace(popupSettings, popupAddPlaceSettings);
console.log(popupAddPlace._form);
popupAddPlace._openPopup();


