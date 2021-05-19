const page = document.querySelector('.page');
const elementsList = page.querySelector('.elements__list');
const elementsItemTemplate = page.querySelector('#template__elements-item').content;
const overlayEditCaption = page.querySelector('.overlay_name_edit-caption');
const overlayAddPlace = page.querySelector('.overlay_name_add-place');
const overlayPopupImage = page.querySelector('.overlay_name_display-image');
const popupImage = overlayPopupImage.querySelector('.popup__image');
const captionPopupImage = overlayPopupImage.querySelector('.popup__caption');
const popupEditProfile = page.querySelector('.overlay_name_edit-caption');
const profileFieldName = popupEditProfile.querySelector('.form__field_name_name');
const profileFieldCaption = popupEditProfile.querySelector('.form__field_name_caption');
const formEditProfile = popupEditProfile.querySelector('.form');

formEditProfile.addEventListener('submit', saveFormEditProfile);

const profileTitle = page.querySelector('.profile__title');
const profileText = page.querySelector('.profile__text');

initialCards.forEach((item) => {
  addCard(createCard(item.titlePlace, item.linkPlaceFoto, item.altPlaceFoto));
});

popupAddPlace = page.querySelector('.overlay_name_add-place');
const buttonAddPlace = page.querySelector('.profile__button-add');
buttonAddPlace.addEventListener('click', openPopupAddPlace);

const formAddPlace = popupAddPlace.querySelector('.form');
formAddPlace.addEventListener('submit', saveNewPlace);
let fieldNamePlace = popupAddPlace.querySelector('.form__field_name_name-place');
let fieldNameSrcLink = popupAddPlace.querySelector('.form__field_name_src-link');

const fieldName = popupEditProfile.querySelector('.form__field_name_name');
const fieldCaption = popupEditProfile.querySelector('.form__field_name_caption');

page.addEventListener('keydown', closePopupFromKeydownEscape);

page.addEventListener('click', function(event) {
  eventTarget = event.target;
  if (eventTarget.classList.contains('popup__button-close')) {
    closePopup();
  }
  if (eventTarget.classList.contains('overlay_is-opened')) {
    togglePopup(eventTarget);
  }
  if (eventTarget.classList.contains('profile__button-edit')) {
    openPopupEditProfile();
  }

});

function closePopupFromKeydownEscape (event) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

function saveNewPlace(event) {
  event.preventDefault();
  const placeName = fieldNamePlace.value;
  const linkPlaceImage = fieldNameSrcLink.value;
  togglePopup(popupAddPlace);
  addCard(createCard(placeName, linkPlaceImage, placeName));
  fieldNamePlace.value = '';
  fieldNameSrcLink.value = '';
}

function openPopupEditProfile() {
  const profileTitle = page.querySelector('.profile__title');
  const profileText = page.querySelector('.profile__text');
  profileFieldName.value = profileTitle.textContent;
  profileFieldCaption.value = profileText.textContent;
  togglePopup(popupEditProfile);
}

function createCard(placeName, placeImageLink, placeImageAlt) {
  const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);
  const elementImage = elementsItem.querySelector('.element__image');
  elementImage.src = placeImageLink;
  elementImage.alt = placeImageAlt;
  elementsItem.querySelector('.element__title').textContent = placeName;
  elementImage.addEventListener('click', openPopupImage);
  const buttonDelElement = elementsItem.querySelector('.element__del-element');
  buttonDelElement.addEventListener('click', deleteCard);
  const buttonLike = elementsItem.querySelector('.element__like');
  buttonLike.addEventListener('click', setLikeStatus);
  return elementsItem;
}

function addCard(elementsItem) {
  elementsList.prepend(elementsItem);
}

function openPopupImage(event) {
  const eventTarget = event.target;
  popupImage.src = eventTarget.src;
  popupImage.alt = eventTarget.alt;
  captionPopupImage.textContent = eventTarget.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  togglePopup(overlayPopupImage);
}

function deleteCard(event) {
  const eventTarget = event.target;
  const eventTargetParent = eventTarget.parentElement.parentElement;
  eventTargetParent.remove();
}

function setLikeStatus(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle('element__like_status_active');
}

function saveFormEditProfile(event) {
  event.preventDefault();
  const popupEditProfile = page.querySelector('.overlay_name_edit-caption');
  profileTitle.textContent = fieldName.value;
  profileText.textContent = fieldCaption.value;
  togglePopup(popupEditProfile);
}

function openPopupAddPlace() {
  togglePopup(popupAddPlace);
}

function togglePopup(popup) {
  popup.classList.toggle('overlay_is-opened');
}

function closePopup() {
  const overlayIsOpened = page.querySelector('.overlay_is-opened');
    if (!(overlayIsOpened === null)) {
      togglePopup(overlayIsOpened);
    }
}
