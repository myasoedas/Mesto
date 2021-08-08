export default class Card {
  constructor({data, cardSelectors}, handleCardClick) {
    this._imageTitle = data.placeName; // название карточки
    this._imageAltTitle = data.placeAlt; // Alt карточки
    this._imageSrc = data.placeSrc; // URL карточки
    this._createdAt = data.placeCreatedAt; // дата создания карточки
    this._owner = data.placeOwner; //объект - пользователь, который добавил текущую карточку
    this._likes = data.placeLikes; //массив объектов пользователей, поставивших лайк
    this._id = data.placeId; // уникальный номер карточки
    this._deleteButtonState = data.deleteButtonState; // false - не выводить кнопку удаления карточки

    // если owner лайкнул свою карточку - она с заливкой
    this._likeButtonState = this._likes.forEach(item => {
      if (item._id === this._owner._id) {
        return true;
      }
      return false;
    });

    this._selectorElementsItemTemplate = cardSelectors.elementsItemTemplate;
    this._selectorElementsItem = cardSelectors.elementsItem;
    this._selectorElementImage = cardSelectors.elementImage;
    this._selectorElementTitle = cardSelectors.elementTitle;
    this._selectorElementDelElement = cardSelectors.elementDelElement;
    this._selectorElementDelElementIsAdd = cardSelectors.elementDelElementIsAdd;
    this._selectorElementLike = cardSelectors.elementLike;
    //
    this._selectorElementLikeStatusActive = cardSelectors.elementLikeStatusActive;
    //
    this._selectorElementLikeCounter = cardSelectors.elementLikeCounter;
    this._selectorOverlayPopupImage = cardSelectors.overlayPopupImage;
    this._selectorPopupImage = cardSelectors.popupImage;
    this._selectorPopupCaption = cardSelectors.popupCaption;
    this._selectorOverlayIsOpened = cardSelectors.overlayIsOpened;
    this._elementsItemTemplate = document.querySelector(this._selectorElementsItemTemplate).content;
    this._elementsItem = this._elementsItemTemplate.querySelector(this._selectorElementsItem).cloneNode(true);
    this._elementImage = this._elementsItem.querySelector(this._selectorElementImage);
    this._elementDelElement = this._elementsItem.querySelector(this._selectorElementDelElement);
    this._elementLike = this._elementsItem.querySelector(this._selectorElementLike);

    this._elementLikeCounter = this._elementsItem.querySelector(this._selectorElementLikeCounter);
    this._handleCardClick = handleCardClick;
    this._cardClik = () => {this._handleCardClick(this._imageTitle, this._imageAltTitle, this._imageSrc)};
    this._delCard = (evt) => {this._removeCard(evt)};
    this._togLike = (evt) => {this._toggleLike(evt)};
  }

  _toggleLike(evt) {
    const eventTarget = evt.target;
    const selectorElementLikeStatusActive = this._selectorElementLikeStatusActive;
    /*
    1.  Событие клик по сердечку:
        если сердечко уже нажато - снять лайк
          отправить промис на сервер где в массиве пользователей - удалить своего пользователя из массива
        если сердечко не нажато - поставить лайк
          отправить промис на сервер в котором добавить пользователя в массив Likes для этой карточки
          id карточки текущей известно
    */
    eventTarget.classList.toggle(selectorElementLikeStatusActive);
  }



  _removeCard(evt) {
    this._elementsItem.remove();
    this._removeListeners();
    this._elementsItem = '';
  }
  //
  createCard() {
    if (this._deleteButtonState) {
      this._elementDelElement.classList.add(this._selectorElementDelElementIsAdd);
    }
    if (!(this._likes.length === 0)) {
      this._elementLikeCounter.textContent = this._likes.length;
      if (this._likeButtonState) {
        this._elementLike.classList.add(this._selectorElementLikeStatusActive);
      }
    }
    this._elementImage.src = this._imageSrc;
    this._elementImage.alt = this._imageAltTitle;
    this._elementsItem.querySelector(this._selectorElementTitle).textContent = this._imageTitle;
    this._addListeners();
    return this._elementsItem;
  }
  _addListenerElementImage() {
    this._elementImage.addEventListener('click', this._cardClik);
  }
  _removeListenerElementImage() {
    this._elementImage.removeEventListener('click', this._cardClik);
  }
  _addListenerRemoveCard() {
    this._elementDelElement.addEventListener('click', this._delCard);
  }
  _removeListenerRemoveCard() {
    this._elementDelElement.removeEventListener('click', this._delCard);
  }
  _addListenerToggleLike() {
    this._elementLike.addEventListener('click', this._togLike);
  }
  _removeListenerToggleLike() {
    this._elementLike.removeEventListener('click', this._togLike);
  }
  _addListeners() {
    this._addListenerRemoveCard();
    this._addListenerToggleLike();
    this._addListenerElementImage();
  }
  _removeListeners() {
    this._removeListenerRemoveCard();
    this._removeListenerToggleLike();
    this._removeListenerElementImage();
  }
}
