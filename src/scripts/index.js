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

//объект хранит id карточки на которой была нажата кнопка удаления и её evt
const cardId = {
  cardId: null,
  evt: null,
  likeButtonState: null
};

let numberOfLikes = 0; //переменная для подсчета количества лайков для карточки

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
//console.log(cardsPromise);

const profilePromise = api.getProfile();
//console.log(profilePromise);
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
  cardsArr.reverse().forEach(item => {
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

const popupDeleteCard = new PopupWithForm({
  popupSelector: initialCssClasses.overlayNameDeleteCard,
  selectors: initialCssClasses,
  handleSubmitForm: deleteCard
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

function handleResponse(response) {
  if (response.ok) {
      return response.json()
  } else {
      console.log("Ошибка: " + response.statusText);
      return Promise.reject("Ошибка: " + response.status + ":" + response.statusText);
  }
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
  })
  .catch((err) => {
    findSubmitButton(initialCssClasses.overlayNameAddPlace, initialCssClasses.submitButtonSelector).textContent = 'Ошибка';    
    console.log(err);
  })
  .finally(() => {
    console.log('finally'); 
    findSubmitButton(initialCssClasses.overlayNameAddPlace, initialCssClasses.submitButtonSelector).textContent = 'Сохранено';    
  });    
}

function deleteCard() {
  const eventTarget = cardId.evt.target;
  eventTarget.parentElement.parentElement.remove();
  api.delCard(cardId.cardId);
  this.closePopup();
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
  const card = new Card({data: element, cardSelectors: initialCssClasses}, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick);
  return card;
}

function handleCardClick(placeName, placeAlt, placeSrc) {
  popupImage.popupImage.src = placeSrc;
  popupImage.popupImage.alt = placeAlt;
  popupImage.popupCaption.textContent = placeName;
  popupImage.openPopup();
}

function handleDeleteButtonClick(placeId, evt) {
  cardId.cardId = placeId;
  cardId.evt = evt;
  popupDeleteCard.openPopup();
}

function handleLikeButtonClick(placeId, evt) {
  evt.target.classList.toggle(initialCssClasses.elementLikeStatusActive);
  api.setLike(placeId);
  /*const elementLikeStatusActive = evt.target;
  console.log(evt.target.querySelector(initialCssClasses.elementLikeStatusActive));
  if (evt.target.querySelector(initialCssClasses.elementLikeStatusActive)) {
    api.delLike(placeId);
    const cardsPromise = api.getCards();
    Promise.all([cardsPromise])
    .then(values => {
      cardsArr = values[0];
      cardsArr.forEach(item => {
        if (item._id === placeId) {
          return numberOfLikes = item.likes.length;
        }
      });
      console.log('numberOfLikes: ' + numberOfLikes);
      if (numberOfLikes > 0) {
        evt.target.querySelector(initialCssClasses.elementLikeCounter).textContent = numberOfLikes;
      }
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    api.setLike(placeId);
    const cardsPromise = api.getCards();
    Promise.all([cardsPromise])
    .then(values => {
      cardsArr = values[0];
      cardsArr.forEach(item => {
        if (item._id === placeId) {
          return numberOfLikes = item.likes.length;
        }
      });
      console.log('numberOfLikes: ' + numberOfLikes);
      if (numberOfLikes > 0) {
        evt.target.querySelector(initialCssClasses.elementLikeCounter).textContent = numberOfLikes;
      }
    })
    .catch(err => {
      console.log(err);
    });
  }*/

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
