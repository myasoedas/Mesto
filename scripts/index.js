/*Использовать const при объявлении переменной, которая не меняется за все время работы со страницей index.html*/
/*Использовать let при объявлении переменной, значение которой будет изменяться во время работы со страницей index.html*/
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');
const buttonSave = document.querySelector('.form__button-save');

const title = document.querySelector('.profile__title');
const text = document.querySelector('.profile__text');

const fieldName = document.querySelector('.form__field_name');
const fieldCaption = document.querySelector('.form__field_caption');

const overlay = document.querySelector('.overlay');

/*включить: display: grid в блоке overlay*/
function overlayToggle() {
  overlay.classList.toggle('overlay_is-opened');
}

/*Открыть popup и записать в поля формы name и caption - текстовые значения из блока profile*/
function openPopup() {
  fieldName.value = title.textContent;
  fieldCaption.value = text.textContent;

  overlayToggle();
}

/*Закрыть popup*/
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

/*подключить слушатели к кнопкам*/
buttonEdit.addEventListener('click', openPopup); /*при нажатии на кнопку button-edit - выполнить функцию openPopup()*/
buttonClose.addEventListener('click', closePopup); /*при нажатии на кнопку button-close - выполнить функцию closePopup()*/
buttonSave.addEventListener('click', saveForm); /*при нажатии на кнопку button-save - выполнить функцию saveForm()*/


