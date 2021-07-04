import formSettings from './form-settings.js';
import Card from './card.js';
import initialCards from './initial-сards.js';
import initialCssClasses from './initial-css-classes.js';

const page = document.querySelector(initialCssClasses.page);
const overlayPopupImage = page.querySelector(initialCssClasses.overlayPopupImage);
const popupImage = overlayPopupImage.querySelector(initialCssClasses.popupImage);
const captionPopupImage = overlayPopupImage.querySelector(initialCssClasses.popupCaption);

initialCards.forEach((element) => {
  const card = new Card(element, initialCssClasses);
  const elementsItem = card.createCard();
  addEventListenerОpenPopupImage(elementsItem);
  addElement(initialCssClasses.elementsList, elementsItem);
});

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
function toggleOverlayIsOpened() {
  getOverlayIsOpened().classList.toggle(initialCssClasses.overlayIsOpened);
}
function closePopup() {
  if (!(getOverlayIsOpened() === null)) {
    toggleOverlayIsOpened();
    removeEventListenerClosePopupButtonClose(page);
    removeEventListenerClosePopupOverlay(page);
    removeEventListenerCloseFromKeydownEscape(page);
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
