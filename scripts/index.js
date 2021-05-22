//конфиг
const page = document.querySelector('.page');
const classOverlayIsOpened = '.overlay_is-opened';
const textOverlayIsOpened = classOverlayIsOpened.slice(1);
const classButtonClose = '.popup__button-close';
const textButtonClose = classButtonClose.slice(1);

const overlayEditProfile = page.querySelector('.overlay_name_edit-profile');
const overlayAddPlace = page.querySelector('.overlay_name_add-place');
const overlayDisplayImage = page.querySelector('.overlay_name_display-image');

const buttonOpenPopupEditProfile = page.querySelector('.profile__button-open-popup-edit-profile');
const buttonOpenPopupAddPlace = page.querySelector('.profile__button-open-popup-add-place');

const userImage = page.querySelector('.profile__image');
const srcUserImage = userImage.src;
const altUserImage = userImage.alt;
const userNameElement = page.querySelector('.profile__title');
const userName = userNameElement.textContent;
const userCaptionElement = page.querySelector('.profile__text');
const userCaption = userCaptionElement.textContent;
const popupImage = page.querySelector('.popup__image');
const popupImageCaption = page.querySelector('.popup__caption');
const inputUserName = page.querySelector('.form__input_name_user-name');
const inputUserCaption = page.querySelector('.form__input_name_user-caption');

buttonOpenPopupEditProfile.addEventListener('click', openPopup);
buttonOpenPopupAddPlace.addEventListener('click', openPopup);
userImage.addEventListener('click', openPopup)

function openPopup(event) {
  const eventTarget = event.target;
  switch (eventTarget) {
    case buttonOpenPopupEditProfile:
      createPopupEditProfile(userName, userCaption);
      addClassForOpenPopup(overlayEditProfile);
      break;
    case buttonOpenPopupAddPlace:
      addClassForOpenPopup(overlayAddPlace);
      break;
    case userImage:
      createPopupImage(srcUserImage, `${userName} - ${userCaption}`, `${userName} - ${userCaption}`);
      addClassForOpenPopup(overlayDisplayImage);
  }
  const overlayIsOpened = page.querySelector(classOverlayIsOpened);
  const buttonClose = overlayIsOpened.querySelector(classButtonClose);
  overlayIsOpened.addEventListener('click', closePopup);
  buttonClose.addEventListener('click', closePopup);
  page.addEventListener('keydown', closePopupEscape);
}



function createPopupEditProfile(userName, userCaption) {
  inputUserName.value = userName;
  inputUserCaption.value = userCaption;
}

function createPopupImage(src, alt, caption) {
  popupImage.src = src;
  popupImage.alt = alt;
  popupImageCaption.textContent = caption;

}

function closePopup(event) {
  const overlayIsOpened = page.querySelector(classOverlayIsOpened);
  if (!(overlayIsOpened === null)) {
    removeClassForOpenPopup(overlayIsOpened);
  }
}

function closePopupEscape(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

function addClassForOpenPopup(element) {
  element.classList.add(textOverlayIsOpened);
}

function removeClassForOpenPopup(element) {
  element.classList.remove(textOverlayIsOpened);
}
