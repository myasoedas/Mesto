function saveNewPlace(event) {
  event.preventDefault();
  const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);
  let fieldNamePlace = popupAddPlace.querySelector('.form__field_name_name-place');
  let fieldNameSrcLink = popupAddPlace.querySelector('.form__field_name_src-link');
  let placeName = fieldNamePlace.value;
  let linkPlaceImage = fieldNameSrcLink.value;
  popupAddPlace.classList.toggle('overlay_is-opened');
  renderCard(elementsItem, elementsList, placeName, linkPlaceImage, placeName);
  placeName = '';
  linkPlaceImage = '';
  fieldNamePlace.value = '';
  fieldNameSrcLink.value = '';
}

function openPopupEditProfile() {
  const profileTitle = page.querySelector('.profile__title').textContent;
  const profileText = page.querySelector('.profile__text').textContent;
  profileFieldName.value = profileTitle;
  profileFieldCaption.value = profileText;
  togglePopup(popupEditProfile);
}

/*функция, которая рендерит карточку*/
function renderCard(elementsItem, elementsList, titlePlace, linkPlaceFoto, altPlaceFoto) {
  elementsItem.querySelector('.element__image').src = linkPlaceFoto;
  elementsItem.querySelector('.element__image').alt = altPlaceFoto;
  elementsItem.querySelector('.element__title').textContent = titlePlace;
  elementsList.prepend(elementsItem);
  const elementImage = elementsItem.querySelector('.element__image');
  elementImage.addEventListener('click', openPopupImage);
  const buttonDelElement = elementsItem.querySelector('.element__del-element');
  buttonDelElement.addEventListener('click', delElement);
  const buttonLike = elementsItem.querySelector('.element__like');
  buttonLike.addEventListener('click', setLikeStatus);
}

function openPopupImage(event) {
  const eventTarget = event.target;
  srcPopupImage.src = eventTarget.src;
  altPopupImage.alt = eventTarget.alt;
  captionPopupImage.textContent = eventTarget.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  togglePopup(popupImage);
}

function closePopup(event) {
  const eventTarget = event.target.closest('.overlay');
  togglePopup(eventTarget);
}

function delElement(event) {
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
  const eventTarget = event.target.closest('.overlay');
  profileTitle.textContent = eventTarget.querySelector('.form__field_name_name').value;
  profileText.textContent = eventTarget.querySelector('.form__field_name_caption').value;
  eventTarget.classList.toggle('overlay_is-opened');
}

function openPopupAddPlace() {
  togglePopup(popupAddPlace);
}

function togglePopup(overlay) {
  overlay.classList.toggle('overlay_is-opened');
}
