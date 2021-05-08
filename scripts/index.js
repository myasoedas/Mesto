const arrPopupFormFields = [
  {
    popupTitle: 'Редактировать профиль',
    popupPlaceholderUp: 'Введите ФИО',
    popupPlaceholderDown: 'Кем вы работаете'
  },
  {
    popupTitle: 'Новое место',
    popupPlaceholderUp: 'Название места',
    popupPlaceholderDown: 'Ссылка на фото места'
  }
];

const arrCardsCaption = [
  {
    titlePlace: 'Иркутск',
    linkPlaceFoto: './images/irkutsk.jpg',
    altPlaceFoto: 'Памятник Колчаку в г. Иркутск'
  },
  {
    titlePlace: 'Ужур',
    linkPlaceFoto: './images/uzhur-love.jpg',
    altPlaceFoto: 'Мозаика - Мы любим Ужур в центре города'
  },
  {
    titlePlace: 'Сибирский',
    linkPlaceFoto: './images/sibirski.jpg',
    altPlaceFoto: 'Храм в центре г. Сибирский'
  },
  {
    titlePlace: 'Новосибирск',
    linkPlaceFoto: './images/novosibirsk.jpg',
    altPlaceFoto: 'ЖД вокзал г. Новосибирск ночью - весь в снегу'
  },
  {
    titlePlace: 'Омск',
    linkPlaceFoto: './images/omsk.jpg',
    altPlaceFoto: 'Зима - багровый закат накрывает мост уходящий в даль, справа - поворачивает дорожная пробка, церковь'
  },
  {
    titlePlace: 'Оренбург',
    linkPlaceFoto: './images/orenburg.jpg',
    altPlaceFoto: 'Памятник Гагарину, проложившему дорогу в космос всему человечеству в г. Оренбург'
  }
];

//Добавить 6 карточек мест на страницу
initialCards(); /*отображаем карточки на странице*/

function initialCards() { /*Функция к/я добавляет карточки на страницу*/
  const elementsList = document.querySelector('.elements__list'); /*Получить доступ к элементу ul*/
  const elementsItemTemplate = document.querySelector('#template__elements-item').content; /*получить доступ к template__elements-item и его содержимому*/
  /*Наполнить карточку содержимым перебрав все элементы массива*/
  arrCardsCaption.forEach((item) => {
    const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true); /*клонировать li вместе с содержимым*/
    elementsItem.querySelector('.element__image').src = item.linkPlaceFoto; /*задать значение параметру src*/
    elementsItem.querySelector('.element__image').alt = item.altPlaceFoto; /*задать значение параметру alt*/
    elementsItem.querySelector('.element__title').textContent = item.titlePlace; /*задать значение заголовку h2*/
    elementsList.append(elementsItem); /*добавить заполненныю карточку на страницу*/
  });
}

//При нажатии на кнопку удалить карточку - карточка должна удаляться
const buttonsDelElement = document.querySelectorAll('.element__del-element');
/*подключить слушатель для всех кнопок del на странице*/
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

