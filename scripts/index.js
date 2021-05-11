const page = document.querySelector('.page');
const elementsList = page.querySelector('.elements__list');

const elementsItemTemplate = page.querySelector('#template__elements-item').content;

const popupImage = page.querySelector('.overlay_name_display-image');
let srcPopupImage = popupImage.querySelector('.popup__image');
let altPopupImage = popupImage.querySelector('.popup__image');
let captionPopupImage = popupImage.querySelector('.popup__caption');
const buttonClosePopupImage = popupImage.querySelector('.popup__button-close');
buttonClosePopupImage.addEventListener('click', closePopup);

const popupEditProfile = page.querySelector('.overlay_name_edit-caption');
const profileFieldName = popupEditProfile.querySelector('.form__field_name_name');
const profileFieldCaption = popupEditProfile.querySelector('.form__field_name_caption');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__button-close');
const formEditProfile = popupEditProfile.querySelector('.form');

buttonClosePopupEditProfile.addEventListener('click', closePopup);
formEditProfile.addEventListener('submit', saveFormEditProfile);

let profileTitle = page.querySelector('.profile__title');
let profileText = page.querySelector('.profile__text');

arrCardsCaption.forEach((item) => {
  const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);
  renderCard(elementsItem, elementsList, item.titlePlace, item.linkPlaceFoto, item.altPlaceFoto);
});

//форма редактирования профиля
const buttonEditProfile = page.querySelector('.profile__button-edit');
buttonEditProfile.addEventListener('click', openPopupEditProfile);

popupAddPlace = page.querySelector('.overlay_name_add-place');
const buttonAddPlace = page.querySelector('.profile__button-add');
buttonAddPlace.addEventListener('click', openPopupAddPlace);
const buttonClosePopupAddPlace = popupAddPlace.querySelector('.popup__button-close');
buttonClosePopupAddPlace.addEventListener('click', closePopup);
const formAddPlace = popupAddPlace.querySelector('.form');
formAddPlace.addEventListener('submit', saveNewPlace);
