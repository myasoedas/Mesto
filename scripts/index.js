import formSettings from './form-settings.js';
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import initialCards from './initial-сards.js';
import initialCssClasses from './initial-css-classes.js';

const page = document.querySelector(initialCssClasses.page);
const profileTitle = page.querySelector(initialCssClasses.profileTitle);
const profileText = page.querySelector(initialCssClasses.profileText);
const buttonEditProfile = page.querySelector(initialCssClasses.profileButtonEdit);
const buttonAddPlace = page.querySelector(initialCssClasses.profileButtonAdd);

const popupImage = new PopupWithImage({
  popupSelector: initialCssClasses.overlayPopupImage,
  selectors: initialCssClasses});

const popupFormAddPlace = new PopupWithForm({
  popupSelector: initialCssClasses.overlayNameAddPlace,
  selectors: initialCssClasses,
  handleSubmitForm: createNewCard
});


const popupFormEditProfile = new PopupWithForm({
  popupSelector: initialCssClasses.overlayNameEditCaption,
  selectors: initialCssClasses,
  handleSubmitForm: editProfile});


const validateFormAddPlace = new FormValidator(popupFormAddPlace.form, initialCssClasses);
const validateFormEditProfile = new FormValidator(popupFormEditProfile.form, initialCssClasses);
validateFormAddPlace.enableValidation();
validateFormEditProfile.enableValidation();

initialCards.forEach((element) => {
  const card = newCard(element, initialCssClasses);
  const elementsItem = card.createCard();
  addElement(initialCssClasses.elementsList, elementsItem);
});

addEventListenerButtonEditProfile();

buttonAddPlace.addEventListener('click', function (event) {

  validateFormAddPlace.resetForm();
  validateFormAddPlace.toggleButtonState();
  popupFormAddPlace.openPopup();
});

function createNewCard(formInputValueObject) {
  const card = newCard(formInputValueObject, initialCssClasses);
  const elementsItem = card.createCard();
  this.closePopup();
  addElement(initialCssClasses.elementsList, elementsItem);
}

function editProfile(formInputValueObject) {
  profileTitle.textContent = formInputValueObject.userName;
  profileText.textContent = formInputValueObject.userCaption;
  this.closePopup();
}

/*
function saveNewPlace(event) {
  event.preventDefault();
  const placeName = fieldNamePlace.value;
  const linkPlaceImage = fieldNameSrcLink.value;
  closePopup();
  const element = {
    placeName: placeName,
    placeSrc: linkPlaceImage,
    placeAlt: placeName
  }
  const card = newCard(element, initialCssClasses);
  const elementsItem = card.createCard();
  addElement(initialCssClasses.elementsList, elementsItem);
}*/

/*function handleSubmitForm(event, formInputValueObject) {
  event.preventDefault();
  return formInputValueObject;
}*/

function newCard(element, initialCssClasses) {
  const card = new Card({data: element, cardSelectors: initialCssClasses}, handleCardClick);
  return card;
}
/*
function addEventListenerFormEditProfile() {
  formEditProfile.addEventListener('submit', saveFormEditProfile);
}*/
/*
function saveFormEditProfile(event) {
  event.preventDefault();
  profileTitle.textContent = profileFieldName.value;
  profileText.textContent = profileFieldCaption.value;
  closePopup();
}*/

function handleCardClick(placeName, placeAlt, placeSrc) {
  popupImage.popupImage.src = placeSrc;
  popupImage.popupImage.alt = placeAlt;
  popupImage.popupCaption.textContent = placeName;
  popupImage.openPopup();
}



/*
function openPopup(popup) {
  addEventListeners(page);
  popup.classList.toggle(initialCssClasses.overlayIsOpened);
}

function addEventListeners(page) {
  addEventListenerClosePopupFromKeydownEscape(page);
  addEventListenerClosePopupButtonClose(page);
  addEventListenerClosePopupOverlay(page);
}

function closePopupFromKeydownEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function closePopupOverlay(evt) {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains(initialCssClasses.overlayIsOpened)) {
    closePopup();
  }
}

function closePopupButtonClose(evt) {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains(initialCssClasses.popupButtonClose)) {
    closePopup();
  }
}*/
function getElement(selektor) {
  const element = document.querySelector(selektor);
  return element;
}
function addElement(selektor, elementToAdd) {
  getElement(selektor).prepend(elementToAdd);
}
/*
function getOverlayIsOpened() {
  const overlayIsOpened = page.querySelector(`.${initialCssClasses.overlayIsOpened}`);
  return overlayIsOpened;
}
*/
function addEventListenerButtonEditProfile() {
  buttonEditProfile.addEventListener('click', function (event) {
    console.log("Нажата кнопка: buttonEditProfile");
    validateFormEditProfile.resetForm();
    validateFormEditProfile.toggleButtonState();
    popupFormEditProfile.form.querySelector(initialCssClasses.formFieldName).value = profileTitle.textContent;
    //profileFieldName.value = profileTitle.textContent;
    popupFormEditProfile.form.querySelector(initialCssClasses.formFieldCaption).value = profileText.textContent;
    //profileFieldCaption.value = profileText.textContent;
    popupFormEditProfile.openPopup();
    //openPopup(popupEditProfile);
  });
}

/*
function toggleOverlayIsOpened() {
  getOverlayIsOpened().classList.toggle(initialCssClasses.overlayIsOpened);
}

function closePopup() {
  if (!(getOverlayIsOpened() === null)) {
    toggleOverlayIsOpened();
    removeEventListeners(page);
  }
}

function removeEventListeners(page) {
  removeEventListenerClosePopupButtonClose(page);
  removeEventListenerClosePopupOverlay(page);
  removeEventListenerCloseFromKeydownEscape(page);
}

function addEventListenerClosePopupFromKeydownEscape(element) {
  element.addEventListener('keydown', closePopupFromKeydownEscape);
}

function addEventListenerClosePopupButtonClose(element) {
  element.addEventListener('click', closePopupButtonClose);
}

function addEventListenerClosePopupOverlay(element) {
  element.addEventListener('click', closePopupOverlay);
}

function removeEventListenerClosePopupButtonClose(element) {
  element.removeEventListener('click', closePopupButtonClose);
}

function removeEventListenerClosePopupOverlay(element) {
  element.removeEventListener('click', closePopupOverlay);
}

function removeEventListenerCloseFromKeydownEscape(element) {
  element.removeEventListener('keydown', closePopupFromKeydownEscape);
}
*/
