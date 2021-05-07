
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');
const buttonsDelElement = document.querySelectorAll('.element__del-element');
const buttonsLike = document.querySelectorAll('.element__like');
const buttonAdd = document.querySelector('.profile__button-add');
const formSave = document.querySelector('.form');

const elementImages = document.querySelectorAll('.element__image'); /*Псевдомассив картинок от карточки места*/

const title = document.querySelector('.profile__title');
const text = document.querySelector('.profile__text');

const fieldName = document.querySelector('.form__field_name_name');
const fieldCaption = document.querySelector('.form__field_name_caption');

const overlayEditCaption = document.querySelector('.overlay_name_edit-caption');
const overlayAddPlace = document.querySelector('.overlay_name_add-place');
const overlayCloseUpImage = document.querySelector('.overlay_name_close-up-image');
const overlay = document.querySelector('.overlay');

elementImages.forEach((item) => {
  item.addEventListener('click', function(event) {
    console.log(event.target);
    const elementImage = event.target;
    console.log(elementImage.src);
    const elementTitle = elementImage.nextElementSibling.nextElementSibling.firstElementChild;
    console.log(elementTitle.textContent);

  });
});

/*подключить слушатели к кнопкам*/
buttonEdit.addEventListener('click', openPopup); /*при нажатии на кнопку button-edit - выполнить функцию openPopup()*/
buttonClose.addEventListener('click', closePopup); /*при нажатии на кнопку button-close - выполнить функцию closePopup()*/

/*подключить слушатель для всех кнопок del на странице*/
buttonsDelElement.forEach((item) => {
  item.addEventListener('click', delElement);
});

buttonsLike.forEach((item) => {
  item.addEventListener('click', setLikeStatus);
});

formSave.addEventListener('submit', saveForm); /*при нажатии на кнопку button-save - отправить данные формы, выполнить функцию saveForm()*/
buttonAdd.addEventListener('click', openPopupAddPlace); /*при нажатии на кнопку открывается форма добавлени янового места*/

/*включить: visibility: visible; в блоке overlay*/
function overlayToggle() {
  overlay.classList.toggle('overlay_is-opened');
}

/*Открыть popup и записать в поля формы name и caption - текстовые значения из блока profile*/
function openPopup() {
  fieldName.value = title.textContent;
  fieldCaption.value = text.textContent;
  overlayToggle();
}

/*Закрыть popup: 0 - закрыть попап редактирования профиля. 1 - закрыть попап добавления нового*/
function closePopup() {
  overlayToggle();
}

/*Записать данные введенные пользователем в полях name и caption формы в соответсвующие текстовые поля в блоке profile*/
function saveForm(event) {
  event.preventDefault();
  title.textContent = fieldName.value;
  text.textContent = fieldCaption.value;
  overlayToggle();
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

function openPopupAddPlace() {
  console.log('Нажата кнопка добавить новое место');
  overlayToggle();
}


