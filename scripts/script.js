/* Установить слушатель на событие clic по кнопке button-edit */
let buttonEdit = document.querySelector('.profile__button-edit');

let buttoneClose = document.querySelector('.edit-form__button-close');

let buttonSave = document.querySelector('.edit-form__button-save');


function displayOverlay() {
  console.log('Клик по button-edit');

  console.log('конец функции');
}

function displayOverlay2() {
  console.log('Клик по button-close');

  console.log('конец функции');
}

function saveForm() {
  evt.preventDefault();

  console.log('Клик по button-Save');

  console.log('конец функции');
}


buttonEdit.addEventListener('click', displayOverlay);

buttoneClose.addEventListener('click', displayOverlay2);

buttonSave.addEventListener('click', saveForm);


