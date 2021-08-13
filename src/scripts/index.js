import '../pages/index.css';
import Api from './components/Api.js';
import Section from './components/Section.js';
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithFormSubmit from './components/PopupWithFormSubmit.js';
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
const profilePromise = api.getProfile();
const profileData = [];
const userInfo = new UserInfo({
  userNameSelector: initialCssClasses.profileTitle,
  userCaptionSelector: initialCssClasses.profileText,
  userImageSelector: initialCssClasses.profileImage,
}, profileData);

Promise.all([cardsPromise, profilePromise])
.then(([cardsArr,profile]) => {
  userInfo.setUserInfo(profile);
  userInfo.setUserImage(profile);
  cardsArr.reverse().forEach(item => {
    let likeButtonState = false;
    item.likes.forEach(like => {
      if (like._id === profile._id) {
        return likeButtonState = true;
      }
    });
    const card = {
      placeName: item.name,
      placeAlt: item.name,
      placeSrc: item.link,
      placeCreatedAt: item.createdAt,
      placeOwner: item.owner,
      placeLikes: item.likes,
      placeId: item._id,
      deleteButtonState: (item.owner._id === profile._id),
      likeButtonState: likeButtonState
    };
    cards.push(card);
  });
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

const popupDeleteCard = new PopupWithFormSubmit({
  popupSelector: initialCssClasses.overlayNameDeleteCard,
  selectors: initialCssClasses,
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

function findSubmitButton(popupSelector, submitButtonSelector) {
  return document.querySelector(popupSelector).querySelector(submitButtonSelector);
}

function createNewCard(formInputValueObject) {
  findSubmitButton(initialCssClasses.overlayNameAddPlace, initialCssClasses.submitButtonSelector).textContent = 'Сохранение...';
  const result = api.addCard(formInputValueObject);
  result.then(res => {
    const cardData = {
      placeName: res.name,
      placeAlt: res.name,
      placeSrc: res.link,
      placeCreatedAt: res.createdAt,
      placeOwner: res.owner,
      placeLikes: res.likes,
      placeId: res._id,
      deleteButtonState: true,
      likeButtonState: false
    }
    const card = newCard(cardData, initialCssClasses);
    const elementsItem = card.createCard();
    cardsSection.addItem(elementsItem);
    findSubmitButton(initialCssClasses.overlayNameAddPlace, initialCssClasses.submitButtonSelector).textContent = 'Сохранить';
    popupFormAddPlace.closePopup();
  })
  .catch((err) => {
    findSubmitButton(initialCssClasses.overlayNameAddPlace,
    initialCssClasses.submitButtonSelector).textContent = 'Ошибка';
    console.log(err);
  });
}

function deleteCard(card) {
  findSubmitButton(initialCssClasses.overlayNameDeleteCard,
  initialCssClasses.submitButtonSelector).textContent = 'Удаление...';
  const resultDelCard = api.delCard(card.getCardId());
  resultDelCard.then(res => {
    card.removeCard();
    findSubmitButton(initialCssClasses.overlayNameDeleteCard,
    initialCssClasses.submitButtonSelector).textContent = 'Удалить';
    popupDeleteCard.closePopup();
  })
  .catch((err) => {
    findSubmitButton(initialCssClasses.overlayNameDeleteCard,
    initialCssClasses.submitButtonSelector).textContent = 'Ошибка';
    console.log(err);
  });
}

function editProfile(formInputValueObject) {
  findSubmitButton(initialCssClasses.overlayNameEditCaption,
    initialCssClasses.submitButtonSelector).textContent = 'Сохранение...';
  const resultEditProfileInfo = api.editProfileInfo(formInputValueObject);
  resultEditProfileInfo.then(res => {
    const userData = {
      about: res.about,
      name: res.name
    }
    userInfo.setUserInfo(userData);
    findSubmitButton(initialCssClasses.overlayNameEditCaption,
    initialCssClasses.submitButtonSelector).textContent = 'Сохранить';
    popupFormEditProfile.closePopup();
  })
  .catch((err) => {
    findSubmitButton(initialCssClasses.overlayNameEditCaption,
    initialCssClasses.submitButtonSelector).textContent = 'Ошибка';
    console.log(err);
  });
}

function editAvatar(formInputValueObject) {
  findSubmitButton(initialCssClasses.overlayNameEditAvatar,
    initialCssClasses.submitButtonSelector).textContent = 'Сохранение...';
  const resultEditProfileAvatar = api.editProfileAvatar(formInputValueObject);
  resultEditProfileAvatar.then(res => {
    const userData = {
      avatar: res.avatar
    }
    userInfo.setUserImage(userData);
    findSubmitButton(initialCssClasses.overlayNameEditAvatar,
      initialCssClasses.submitButtonSelector).textContent = 'Сохранить';
      popupFormEditProfileAvatar.closePopup();
  })
  .catch((err) => {
    findSubmitButton(initialCssClasses.overlayNameEditAvatar,
      initialCssClasses.submitButtonSelector).textContent = 'Ошибка';
    console.log(err);
  });
}

function newCard(element, initialCssClasses) {
  const card = new Card({data: element, cardSelectors: initialCssClasses},
  handleCardClick, handleDeleteButtonClick, handleLikeButtonClick);
  return card;
}

function handleCardClick(placeName, placeAlt, placeSrc) {
  popupImage.popupImage.src = placeSrc;
  popupImage.popupImage.alt = placeAlt;
  popupImage.popupCaption.textContent = placeName;
  popupImage.openPopup();
}
//
function handleDeleteButtonClick(targetCard) {
  popupDeleteCard.setSubmitAction(() => {
    deleteCard(targetCard);
    targetCard.removeListeners();
  });
  popupDeleteCard.openPopup();
}

function handleLikeButtonClick(card) {
  if( card.getLikeButtonState() ) {
    const resultDelLike = api.delLike(card.getCardId());
    resultDelLike.then(resultCard => {
      card.delLike();
      card.showLikes(resultCard.likes);
    })
    .catch((err) => {
      console.log(err);
    })
  }  else {
    const resultSetLike = api.setLike(card.getCardId());
    resultSetLike.then(resultCard => {
      card.setLike();
      card.showLikes(resultCard.likes);
    })
    .catch((err) => {
      console.log(err);
    })
  }
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
    popupFormEditProfileAvatar.openPopup();
  });
}
