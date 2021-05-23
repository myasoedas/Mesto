
function enableValidation() {
  //найти все формы на странице
  const formList = Array.from(page.querySelectorAll('.form'));

  //установить слушатель для каждой формы
  formList.forEach(formElement => {
    setEventListeners(formElement);
  })
}

function setEventListeners(formElement) {
  //найти все input
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));

  //найти все button submit
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
    })
  })
}

function checkInputValidity(inputElement) {
  //проверить input на валидность
  //если input валидный - скрыть ошибку,
  //если input не валидный - показать ошибку
  if (inputElement.validity.valid) {
    hideInputError(inputElement);
  } else {
    showInputError(inputElement);
  }
}

function hideInputError(inputElement) {

}

function showInputError(inputElement) {

}



