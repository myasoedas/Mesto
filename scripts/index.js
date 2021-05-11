//Добавить 6 карточек мест на страницу
const elementsList = document.querySelector('.elements__list'); //Вынес переменную elementsList из функции renderInitialCards() по замечанию код Ревьювера
const page = document.querySelector('.page'); //Вынес переменную page из функций, где она объявляется внутри функции в глобальную область по требованию код ревьювера
const templatePopupEditProfile = page.querySelector('#popup-edit-profile').content;
const popupEditProfile = templatePopupEditProfile.querySelector('.overlay').cloneNode(true);
const profileFieldName = popupEditProfile.querySelector('.form__field_name_name');
const profileFieldCaption = popupEditProfile.querySelector('.form__field_name_caption');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__button-close');
const formEditProfile = popupEditProfile.querySelector('.form');
buttonClosePopupEditProfile.addEventListener('click', closePopup);
formEditProfile.addEventListener('submit', saveFormEditProfile);


renderInitialCards();

function renderInitialCards() {
  const elementsItemTemplate = document.querySelector('#template__elements-item').content;
  arrCardsCaption.forEach((item) => {
    const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);
    elementsItem.querySelector('.element__image').src = item.linkPlaceFoto;
    elementsItem.querySelector('.element__image').alt = item.altPlaceFoto;
    elementsItem.querySelector('.element__title').textContent = item.titlePlace;
    elementsList.append(elementsItem);
    const elementImage = document.querySelector('.element__image');
    elementImage.addEventListener('click', openPopupImage);
  });
}

//При нажатии на кнопку удалить карточку - карточка должна удаляться
const buttonsDelElement = document.querySelectorAll('.element__del-element');

buttonsDelElement.forEach((item) => {
  item.addEventListener('click', delElement);
});

function delElement(event) {
  const eventTarget = event.target;
  const eventTargetParent = eventTarget.parentElement.parentElement;
  eventTargetParent.remove();
}

//При нажатии на сердечко в карточке оно должно заполняться черым цветом, при повторном нажатии становиться прозрачным
const buttonsLike = document.querySelectorAll('.element__like');
buttonsLike.forEach((item) => {
  item.addEventListener('click', setLikeStatus);
});

function setLikeStatus(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle('element__like_status_active');
}

//форма редактирования профиля с защитой от межсайтового скриптинга
const buttonEditProfile = document.querySelector('.profile__button-edit');
buttonEditProfile.addEventListener('click', openPopupEditProfile);

function openPopupEditProfile() {

  const profileTitle = page.querySelector('.profile__title').textContent;
  const profileText = page.querySelector('.profile__text').textContent;

  profileFieldName.value = profileTitle;
  profileFieldCaption.value = profileText;
  page.append(popupEditProfile);
  popupEditProfile.classList.toggle('overlay_is-opened');
}

function saveFormEditProfile(event) {
  event.preventDefault();
  const eventTarget = event.target.closest('.overlay');
  page.querySelector('.profile__title').textContent = eventTarget.querySelector('.form__field_name_name').value;
  page.querySelector('.profile__text').textContent = eventTarget.querySelector('.form__field_name_caption').value;
  eventTarget.classList.toggle('overlay_is-opened');
  eventTarget.remove();
}

/*Универсальня функция для закрытия попапа*/
function closePopup(event) {
  const eventTarget = event.target.closest('.overlay');
  eventTarget.classList.toggle('overlay_is-opened');
  eventTarget.remove();
}

/*const elementsImage = document.querySelectorAll('.element__image');
elementsImage.forEach((item) => {
  item.addEventListener('click', openPopupImage);
});*/

function openPopupImage(event) {
  const eventTarget = event.target;
  const templatePopupImage = document.querySelector('#popup-image').content;
  const popupImage = templatePopupImage.querySelector('.overlay').cloneNode(true);
  popupImage.querySelector('.popup__image').src = eventTarget.src;
  popupImage.querySelector('.popup__image').alt = eventTarget.alt;
  popupImage.querySelector('.popup__caption').textContent = eventTarget.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  page.append(popupImage);
  popupImage.classList.toggle('overlay_is-opened');
  const buttonClosePopupImage = popupImage.querySelector('.popup__button-close');
  buttonClosePopupImage.addEventListener('click', closePopup);
}

const buttonAddPlace = document.querySelector('.profile__button-add');
buttonAddPlace.addEventListener('click', openPopupAddPlace);

function openPopupAddPlace() {
  const templatePopupAddPlace = page.querySelector('#popup-add-element').content;
  popupAddPlace = templatePopupAddPlace.querySelector('.overlay').cloneNode(true);
  page.append(popupAddPlace);
  popupAddPlace.classList.toggle('overlay_is-opened');
  const buttonClosePopupAddPlace = popupAddPlace.querySelector('.popup__button-close');
  buttonClosePopupAddPlace.addEventListener('click', closePopup);
  const formAddPlace = popupAddPlace.querySelector('.form');
  formAddPlace.addEventListener('submit', saveNewPlace);
}

function saveNewPlace(event) {
  event.preventDefault();
  const elementsList = document.querySelector('.elements__list');
  const eventTarget = event.target;
  const popupAddPlace = eventTarget.parentElement.parentElement;
  const placeName = eventTarget.firstElementChild.nextElementSibling.value;
  const linkPlaceImage = eventTarget.firstElementChild.nextElementSibling.nextElementSibling.value;
  const templateNewPlace = document.querySelector('#template__elements-item').content;
  const newPlace = templateNewPlace.querySelector('.elements__item').cloneNode(true);
  newPlace.firstElementChild.firstElementChild.src = linkPlaceImage;
  newPlace.firstElementChild.firstElementChild.alt = placeName;
  newPlace.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent = placeName;
  popupAddPlace.classList.toggle('overlay_is-opened');
  elementsList.prepend(newPlace);
  popupAddPlace.remove();
  const buttonDelElement = newPlace.firstElementChild.firstElementChild.nextElementSibling;
  buttonDelElement.addEventListener('click', delElement);
  const buttonLike = newPlace.firstElementChild.lastElementChild.lastElementChild;
  buttonLike.addEventListener('click', setLikeStatus);
  const elementImage = newPlace.firstElementChild.firstElementChild;
  elementImage.addEventListener('click', openPopupImage);
}
