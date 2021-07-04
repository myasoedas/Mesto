initialCards.forEach((element) => {
  const card = new Card(element, initialCssClasses, openPopupImage); // создали объект карточки
  card.setCallbackHandlerOpenPopup(/* здесь функция открытия картинки */); // добавили колбек на открытие картинки
  const elementsItem = card.createCard(); // сгенерировали DOM-элемент и установили обработчики
  addCard(elementsItem); // вставили карточку на страницу
});
