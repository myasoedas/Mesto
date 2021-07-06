import formSettings from './form-settings.js';
import FormValidator from './validate.js';
import Card from './card.js';
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

const validateFormEditProfile = new FormValidator(formEditProfile, formSettings);
validateFormEditProfile.enableValidation();
const validateFormAddPlace = new FormValidator(formAddPlace, formSettings);
validateFormAddPlace.enableValidation();


initialCards.forEach((element) => {
  const card = new Card(element, initialCssClasses);
  const elementsItem = card.createCard();
  addEventListenerОpenPopupImage(elementsItem);
  addElement(initialCssClasses.elementsList, elementsItem);
});

addEventListenerButtonEditProfile();
addEventListenerFormEditProfile();

buttonAddPlace.addEventListener('click', function (event) {
  openPopup(popupAddPlace);
});

formAddPlace.addEventListener('submit', saveNewPlace);

function saveNewPlace(event) {
  event.preventDefault();
  const placeName = fieldNamePlace.value;
  const linkPlaceImage = fieldNameSrcLink.value;
  closePopup();
  const element = {
    titleImage: placeName,
    linkImage: linkPlaceImage,
    titleAlt: placeName
  }
  const card = new Card(element, initialCssClasses);
  const elementsItem = card.createCard();
  addEventListenerОpenPopupImage(elementsItem);
  addElement(initialCssClasses.elementsList, elementsItem);
  resetForm(popupAddPlace);
  toggleButton(popupAddPlace);
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
function addEventListenerОpenPopupImage(element) {
  element.querySelector(initialCssClasses.elementImage).addEventListener('click', openPopupImage);
}
function openPopupImage(event) {
  const eventTarget = event.target;
  popupImage.src = eventTarget.src;
  popupImage.alt = eventTarget.alt;
  captionPopupImage.textContent = eventTarget.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  openPopup(overlayPopupImage);
}
function openPopup(popup) {
  addEventListenerClosePopupFromKeydownEscape(page);
  addEventListenerClosePopupButtonClose(page);
  addEventListenerClosePopupOverlay(page);
  popup.classList.toggle(initialCssClasses.overlayIsOpened);
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
    profileFieldName.value = profileTitle.textContent;
    profileFieldCaption.value = profileText.textContent;
    toggleButton(popupEditProfile);
    openPopup(popupEditProfile);
  });
}
function toggleButton(popup) {
  const buttonSubmitElement = popup.querySelector(formSettings.submitButtonSelector);
  const inputList = Array.from(popup.querySelectorAll(formSettings.inputSelector));
  validate.toggleButtonState(buttonSubmitElement, inputList);
}
function toggleOverlayIsOpened() {
  getOverlayIsOpened().classList.toggle(initialCssClasses.overlayIsOpened);
}
function resetForm(overlayIsOpened) {
  if (!(overlayIsOpened.querySelector(formSettings.formSelector) === null)) {
    overlayIsOpened.querySelector(formSettings.formSelector).reset();
    const formElement = overlayIsOpened.querySelector(formSettings.formSelector);
    const inputElementArray = overlayIsOpened.querySelectorAll(formSettings.inputSelector);
  }
}
function closePopup(validate) {
  const overlayIsOpened = page.querySelector('.'+ initialCssClasses.overlayIsOpened);
  if (!(getOverlayIsOpened() === null)) {
    toggleOverlayIsOpened();
    removeEventListenerClosePopupButtonClose(page);
    removeEventListenerClosePopupOverlay(page);
    removeEventListenerCloseFromKeydownEscape(page);
    resetForm(overlayIsOpened);
  }
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
