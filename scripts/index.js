import formSettings from './form-settings.js';
import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import initialCards from './initial-сards.js';
import initialCssClasses from './initial-css-classes.js';

const page = document.querySelector(initialCssClasses.page);
const overlayPopupImage = page.querySelector(initialCssClasses.overlayPopupImage);
const popupImage = overlayPopupImage.querySelector(initialCssClasses.popupImage);
const captionPopupImage = overlayPopupImage.querySelector(initialCssClasses.popupCaption);
const profileTitle = page.querySelector(initialCssClasses.profileTitle);
const profileText = page.querySelector(initialCssClasses.profileText);
const buttonEditProfile = page.querySelector(initialCssClasses.profileButtonEdit);
const popupEditProfile = page.querySelector(initialCssClasses.overlayNameEditCaption);
const profileFieldName = popupEditProfile.querySelector(formSettings.formFieldName);
const profileFieldCaption = popupEditProfile.querySelector(formSettings.formFieldCaption);
const formEditProfile = popupEditProfile.querySelector(formSettings.formSelector);
const popupAddPlace = page.querySelector(initialCssClasses.overlayNameAddPlace);
const buttonAddPlace = page.querySelector(initialCssClasses.profileButtonAdd);
const formAddPlace = popupAddPlace.querySelector(formSettings.formSelector);
const fieldNamePlace = popupAddPlace.querySelector(formSettings.formFieldPlace);
const fieldNameSrcLink = popupAddPlace.querySelector(formSettings.formFieldSrcLink);

const validateFormAddPlace = new FormValidator(formAddPlace, formSettings);
const validateFormEditProfile = new FormValidator(formEditProfile, formSettings);
validateFormAddPlace.enableValidation();
validateFormEditProfile.enableValidation();

initialCards.forEach((element) => {
  const card = newCard(element, initialCssClasses);
  const elementsItem = card.createCard();
  addElement(initialCssClasses.elementsList, elementsItem);
});

addEventListenerButtonEditProfile();
addEventListenerFormEditProfile();

buttonAddPlace.addEventListener('click', function (event) {
  validateFormAddPlace.resetForm();
  validateFormAddPlace.toggleButtonState();
  openPopup(popupAddPlace);
});

formAddPlace.addEventListener('submit', saveNewPlace);
//
function saveNewPlace(event) {
  event.preventDefault();
  const placeName = fieldNamePlace.value;
  const linkPlaceImage = fieldNameSrcLink.value;
  closePopup();
  const element = {
    imageTitle: placeName,
    imageSrc: linkPlaceImage,
    imageAltTitle: placeName
  }
  const card = newCard(element, initialCssClasses);
  const elementsItem = card.createCard();
  addElement(initialCssClasses.elementsList, elementsItem);
}
function newCard(element, initialCssClasses) {
  const card = new Card({data: element, cardSelectors: initialCssClasses}, handleCardClick);
  return card;
}
function addEventListenerFormEditProfile() {
  formEditProfile.addEventListener('submit', saveFormEditProfile);
}
function saveFormEditProfile(event) {
  event.preventDefault();
  profileTitle.textContent = profileFieldName.value;
  profileText.textContent = profileFieldCaption.value;
  closePopup();
}
function handleCardClick(imageTitle, imageAltTitle, imageSrc) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAltTitle;
  captionPopupImage.textContent = imageTitle;
  openPopup(overlayPopupImage);
}
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
}
function getElement(selektor) {
  const element = document.querySelector(selektor);
  return element;
}
function addElement(selektor, elementToAdd) {
  getElement(selektor).prepend(elementToAdd);
}
function getOverlayIsOpened() {
  const overlayIsOpened = page.querySelector(`.${initialCssClasses.overlayIsOpened}`);
  return overlayIsOpened;
}
function addEventListenerButtonEditProfile() {
  buttonEditProfile.addEventListener('click', function (event) {
    validateFormEditProfile.resetForm();
    validateFormEditProfile.toggleButtonState();
    profileFieldName.value = profileTitle.textContent;
    profileFieldCaption.value = profileText.textContent;
    openPopup(popupEditProfile);
  });
}
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
