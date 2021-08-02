import '../pages/index.css';
import Section from './components/Section.js';
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import initialCards from './initial-сards.js';
import initialCssClasses from './initial-css-classes.js';

const page = document.querySelector(initialCssClasses.page);
const buttonEditProfile = page.querySelector(initialCssClasses.profileButtonEdit);
const buttonAddPlace = page.querySelector(initialCssClasses.profileButtonAdd);
const cardsSection = new Section({items: initialCards, renderer: rendererCard}, initialCssClasses.elementsList);
const elements = cardsSection.rendererItems();
elements.forEach((element) => {
  cardsSection.addItem(element);
});

const userInfo = new UserInfo({
  userNameSelector: initialCssClasses.profileTitle,
  userCaptionSelector: initialCssClasses.profileText
});

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

addEventListenerButtonEditProfile();

buttonAddPlace.addEventListener('click', function (event) {
  validateFormAddPlace.resetForm();
  validateFormAddPlace.toggleButtonState();
  popupFormAddPlace.openPopup();
});

function getElement(selektor) {
  const element = document.querySelector(selektor);
  return element;
}

function addElement(selektor, elementToAdd) {
  getElement(selektor).prepend(elementToAdd);
}

function rendererCard(element) {
  const card = newCard(element, initialCssClasses);
  const elementsItem = card.createCard();
  return elementsItem;
}

function createNewCard(formInputValueObject) {
  const card = newCard(formInputValueObject, initialCssClasses);
  const elementsItem = card.createCard();
  this.closePopup();
  cardsSection.addItem(elementsItem);
}

function editProfile(formInputValueObject) {
  userInfo.setUserInfo(formInputValueObject);
}

function newCard(element, initialCssClasses) {
  const card = new Card({data: element, cardSelectors: initialCssClasses}, handleCardClick);
  return card;
}

function handleCardClick(placeName, placeAlt, placeSrc) {
  popupImage.popupImage.src = placeSrc;
  popupImage.popupImage.alt = placeAlt;
  popupImage.popupCaption.textContent = placeName;
  popupImage.openPopup();
}

function addEventListenerButtonEditProfile() {
  buttonEditProfile.addEventListener('click', function (event) {
    validateFormEditProfile.resetForm();
    validateFormEditProfile.toggleButtonState();
    const profileInfo = userInfo.getUserInfo();
    popupFormEditProfile.form.querySelector(initialCssClasses.formFieldName).value = profileInfo.userName;
    popupFormEditProfile.form.querySelector(initialCssClasses.formFieldCaption).value = profileInfo.userCaption;
    popupFormEditProfile.openPopup();
  });
}
