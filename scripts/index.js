const page = document.querySelector('.page');
const elementsList = page.querySelector('.elements__list');
const elementsItemTemplate = page.querySelector('#template__elements-item').content;
/*const overlayEditCaption = page.querySelector('.overlay_name_edit-caption');*/
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

const popupAddPlace = page.querySelector('.overlay_name_add-place');

const formAddPlace = popupAddPlace.querySelector('.form');
formAddPlace.addEventListener('submit', saveNewPlace);

const fieldNamePlace = popupAddPlace.querySelector('.form__field_name_name-place');
const fieldNameSrcLink = popupAddPlace.querySelector('.form__field_name_src-link');

const fieldName = popupEditProfile.querySelector('.form__field_name_name');
const fieldCaption = popupEditProfile.querySelector('.form__field_name_caption');
const buttonEditProfile = page.querySelector('.profile__button-edit');
const buttonAddPlace = page.querySelector('.profile__button-add');
const elementImage = page.querySelector('.element__image');

buttonAddPlace.addEventListener('click', function (event) {
  openPopupAddPlace();
});

buttonEditProfile.addEventListener('click', function (event) {
  openPopupEditProfile();
});

elementsList.addEventListener('click', function (event) {
  const eventTarget = event.target;
  if (eventTarget.classList.contains('element__image')) {
    openPopupImage(eventTarget);
  }
  if (eventTarget.classList.contains('element__del-element')) {
    deleteCard(eventTarget);
  }
  if (eventTarget.classList.contains('element__like')) {
    setLikeStatus(eventTarget);
  }
});


page.addEventListener('click', function(event) {
  const eventTarget = event.target;
  if (eventTarget.classList.contains('popup__button-close')) {
    closePopup();
  }
});

page.addEventListener('click', function(event) {
  const eventTarget = event.target;
  if (eventTarget.classList.contains('overlay_is-opened')) {
    const overlayIsOpened = page.querySelector('.overlay_is-opened');
    if (overlayIsOpened === overlayAddPlace) {
      resetForm(overlayIsOpened);
    }
    togglePopup(eventTarget);
  }
});



function openPopup(popupClassName) {
  togglePopup(popupClassName);
}

function saveNewPlace(event) {
  event.preventDefault();
  const placeName = fieldNamePlace.value;
  const linkPlaceImage = fieldNameSrcLink.value;
  togglePopup(popupAddPlace);
  addCard(createCard(placeName, linkPlaceImage, placeName));
  // необходимо использовать reset
  fieldNamePlace.value = '';
  fieldNameSrcLink.value = '';
}

function setLikeStatus(eventTarget) {
  eventTarget.classList.toggle('element__like_status_active');
}

function deleteCard(eventTarget) {
  eventTarget.parentElement.parentElement.remove();
}

function openPopupImage(eventTarget) {
  popupImage.src = eventTarget.src;
  popupImage.alt = eventTarget.alt;
  captionPopupImage.textContent = eventTarget.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  togglePopup(overlayPopupImage);
  page.addEventListener('keydown', closePopupFromKeydownEscape);
}

function resetForm(overlayIsOpened) {
  overlayIsOpened.querySelector('.form').reset();
}

function closePopupFromKeydownEscape (event) {
  if (event.key === 'Escape') {
    page.removeEventListener('keydown', closePopupFromKeydownEscape);
    closePopup();
  }
}

function openPopupEditProfile() {
  const profileTitle = page.querySelector('.profile__title');
  const profileText = page.querySelector('.profile__text');
  profileFieldName.value = profileTitle.textContent;
  profileFieldCaption.value = profileText.textContent;
  togglePopup(popupEditProfile);
  page.addEventListener('keydown', closePopupFromKeydownEscape);
  enableValidation(popupEditProfile);
}

function createCard(placeName, placeImageLink, placeImageAlt) {
  const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);
  const elementImage = elementsItem.querySelector('.element__image');
  elementImage.src = placeImageLink;
  elementImage.alt = placeImageAlt;
  elementsItem.querySelector('.element__title').textContent = placeName;
  return elementsItem;
}

function addCard(elementsItem) {
  elementsList.prepend(elementsItem);
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
  page.addEventListener('keydown', closePopupFromKeydownEscape);
  enableValidation(overlayAddPlace);
}

function togglePopup(popup) {
  popup.classList.toggle('overlay_is-opened');
}

function closePopup() {
  const overlayIsOpened = page.querySelector('.overlay_is-opened');
    if (!(overlayIsOpened === null)) {
      /*
      if (overlayIsOpened === overlayAddPlace) {
        resetForm(overlayIsOpened);
      }
      */
      page.removeEventListener('keydown', closePopupFromKeydownEscape);
      togglePopup(overlayIsOpened);
    }
}
