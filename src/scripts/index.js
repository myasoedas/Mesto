import '../pages/index.css';
import Api from './components/Api.js';
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
const profileImageContainer = page.querySelector(initialCssClasses.profileImageContainer);
const buttonAddPlace = page.querySelector(initialCssClasses.profileButtonAdd);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  authorization: '366940f8-1afd-40c8-8095-e44dfdf9116b',
  contentTip: 'application/json',
});

const cards = []; // создаем пустой массив карточек
const cardsSection = new Section({items: cards, renderer: rendererCard}, initialCssClasses.elementsList);
const cardsPromise = api.getCards();
console.log(cardsPromise);

const profilePromise = api.getProfile();
const profileData = [];
const userInfo = new UserInfo({
  userNameSelector: initialCssClasses.profileTitle,
  userCaptionSelector: initialCssClasses.profileText,
  userImageSelector: initialCssClasses.profileImage,
}, profileData);

let cardsArr = [];
let profile = {};

Promise.all([cardsPromise, profilePromise])
.then(values => {
  cardsArr = values[0];
  profile = values[1];
  userInfo.setUserInfo(profile);
  userInfo.setUserImage(profile);
  console.log(userInfo);
  cardsArr.forEach(item => {
    const card = {
      placeName: item.name,
      placeAlt: item.name,
      placeSrc: item.link,
      placeCreatedAt: item.createdAt,
      placeOwner: item.owner,
      placeLikes: item.likes,
      placeId: item._id,
      deleteButtonState: (item.owner._id === profile._id),
    };
    cards.push(card);
  });
  console.log(cards);
  cardsSection.setItems(cards);
  const elements = cardsSection.rendererItems();
  elements.forEach((element) => {
    cardsSection.addItem(element);
  });

})
.catch(err => {
  console.log(err);
});

const popupImage = new PopupWithImage({
  popupSelector: initialCssClasses.overlayPopupImage,
  selectors: initialCssClasses});

const popupEditAvatar = new PopupWithForm({
  popupSelector: initialCssClasses.overlayNameEditAvatar,
  selectors: initialCssClasses,
  handleSubmitForm: editAvatar
});

const popupFormAddPlace = new PopupWithForm({
  popupSelector: initialCssClasses.overlayNameAddPlace,
  selectors: initialCssClasses,
  handleSubmitForm: createNewCard
});

const popupFormEditProfile = new PopupWithForm({
  popupSelector: initialCssClasses.overlayNameEditCaption,
  selectors: initialCssClasses,
  handleSubmitForm: editProfile
});

const popupFormEditProfileAvatar = new PopupWithForm({
  popupSelector: initialCssClasses.overlayNameEditAvatar,
  selectors: initialCssClasses,
  handleSubmitForm: editAvatar
});

const validateFormAddPlace = new FormValidator(popupFormAddPlace.form, initialCssClasses);
const validateFormEditProfile = new FormValidator(popupFormEditProfile.form, initialCssClasses);
const validateFormEditProfileAvatar = new FormValidator(popupFormEditProfileAvatar.form, initialCssClasses);
validateFormAddPlace.enableValidation();
validateFormEditProfile.enableValidation();
validateFormEditProfileAvatar.enableValidation();

addEventListenerButtonEditProfile();
addEventListenerProfileImageContainer();

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
  const cardData = {
    placeName: formInputValueObject.placeName,
    placeAlt: formInputValueObject.placeName,
    placeSrc: formInputValueObject.placeSrc,
    placeCreatedAt: '',
    placeOwner: {},
    placeLikes: [],
    placeId: '',
    deleteButtonState: true,
    likeButtonState: false
  }
  const card = newCard(cardData, initialCssClasses);
  const elementsItem = card.createCard();
  this.closePopup();
  cardsSection.addItem(elementsItem);
  api.addCard(formInputValueObject);
}

function editProfile(formInputValueObject) {
  userInfo.setUserInfo(formInputValueObject);
  api.editProfileInfo(formInputValueObject);
}

function editAvatar(formInputValueObject) {
  userInfo.setUserImage(formInputValueObject);
  api.editProfileAvatar(formInputValueObject);

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
    popupFormEditProfile.form.querySelector(initialCssClasses.formFieldName).value = profileInfo.name;
    popupFormEditProfile.form.querySelector(initialCssClasses.formFieldCaption).value = profileInfo.about;
    popupFormEditProfile.openPopup();
  });
}

function addEventListenerProfileImageContainer() {
  profileImageContainer.addEventListener('click', function (event) {
    validateFormEditProfileAvatar.resetForm();
    validateFormEditProfileAvatar.toggleButtonState();
    const profileInfo = userInfo.getUserInfo();
    popupFormEditProfileAvatar.form.querySelector(initialCssClasses.formFieldAvatarSrc).value = profileInfo.avatar;
    popupFormEditProfileAvatar.openPopup();
  });
}
