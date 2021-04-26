/* Установить слушатель на событие clic по кнопке button-edit */
let buttonEdit = document.querySelector('.profile__button-edit');

/*function buttonEditClick() {
  let overlay = document.querySelector('.overlay');
  overlay.setAttribute('display', 'block');
}
*/



buttonEdit.addEventListener('click',
  function(){
    console.log('Клик по button-edit');
    let overlay = document.querySelector('.overlay');
    overlay.classList.toggle('.overlay__active');
    console.log('конец функции');
  }
);


