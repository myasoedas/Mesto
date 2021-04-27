/* Установить слушатель на событие clic по кнопке button*/
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');
const buttonSave = document.querySelector('.form__button-save');

function openPopup() {
  let title = document.querySelector('.profile__title');
  let text = document.querySelector('.profile__text');

  captionEdit = document.querySelectorAll('.form__field');
  captionEdit[0].setAttribute('value', title.textContent);
  captionEdit[1].setAttribute('value', text.textContent);

  overlay = document.querySelector('.overlay');
  overlay.classList.toggle('overlay_is-opened');
}

function closePopup() {
  overlay = document.querySelector('.overlay');
  overlay.classList.toggle('overlay_is-opened');
}

function saveForm(event) {
  event.preventDefault();

  let title = document.querySelector('.profile__title');
  let text = document.querySelector('.profile__text');

  captionEdit = document.querySelectorAll('.form__field');
  title.textContent = captionEdit[0].value;
  text.textContent = captionEdit[1].value;

  overlay = document.querySelector('.overlay');
  overlay.classList.toggle('overlay_is-opened');
}


buttonEdit.addEventListener('click', openPopup);

buttonClose.addEventListener('click', closePopup);

buttonSave.addEventListener('click', saveForm);


