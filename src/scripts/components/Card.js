export default class Card {
  constructor({data, cardSelectors}, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick) {
    this._imageTitle = data.placeName; // название карточки
    this._imageAltTitle = data.placeAlt; // Alt карточки
    this._imageSrc = data.placeSrc; // URL карточки
    this._createdAt = data.placeCreatedAt; // дата создания карточки
    this._owner = data.placeOwner; //объект - пользователь, который добавил текущую карточку
    this._likes = data.placeLikes; //массив объектов пользователей, поставивших лайк
    this._id = data.placeId; // уникальный номер карточки
    this._deleteButtonState = data.deleteButtonState; // false - не выводить кнопку удаления карточки
    this._likeButtonState = data.likeButtonState;
    this._selectorElementsItemTemplate = cardSelectors.elementsItemTemplate;
    this._selectorElementsItem = cardSelectors.elementsItem;
    this._selectorElementImage = cardSelectors.elementImage;
    this._selectorElementTitle = cardSelectors.elementTitle;
    this._selectorElementDelElement = cardSelectors.elementDelElement;
    this._selectorElementDelElementIsAdd = cardSelectors.elementDelElementIsAdd;
    this._selectorElementLike = cardSelectors.elementLike;
    this._selectorElementLikeStatusActive = cardSelectors.elementLikeStatusActive;
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
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._cardClik = () => {this._handleCardClick(this._imageTitle, this._imageAltTitle, this._imageSrc)};
    this._delCard = (evt) => {this._handleDeleteButtonClick(this)};
    this._openPopupDelCard = () => {this._handleDeleteButtonClick()};
    this._likeClick = (evt) => {this._handleLikeButtonClick(this)};
  }

  setLike() {
    this._elementLike.classList.add(this._selectorElementLikeStatusActive);
    this._likeButtonState = true;
  }

  delLike() {
    this._elementLike.classList.remove(this._selectorElementLikeStatusActive);
    this._likeButtonState = false;
  }

  getLikeButtonState() {
    return this._likeButtonState;
  }

  showLikes(likes) {
    const numbersOfLikes = likes.length;
    if(numbersOfLikes > 0) {
      this._elementLikeCounter.textContent = numbersOfLikes;
    } else {
      this._elementLikeCounter.textContent = '';
    }
  }

  getNumbersOfLikes(likes) {
    return likes.length;
  }

  getOwnerId() {
    return this._owner._id;
  }

  getDeleteButtonState() {
    return this._deleteButtonState;
  }

  getCardId() {
    return this._id;
  }

  getCardData() {
    const cardData = {
      createdAt: this._createdAt,
      likes: this._likes,
      link: this._imageSrc,
      name: this._imageTitle,
      owner: this._owner,
      _id: this._id,
    }
    return cardData;
  }

  removeCard() {
    this._elementsItem.remove();
    this.removeListeners();
    this._elementsItem = '';
  }

  createCard() {
    if (this._deleteButtonState) {
      this._elementDelElement.classList.add(this._selectorElementDelElementIsAdd);
    }
    if (!(this._likes.length === 0)) {
      this._elementLikeCounter.textContent = this._likes.length;
      if (this.getLikeButtonState()) {
        this.setLike();
      } else {
        this.delLike();
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
    this._elementLike.addEventListener('click', this._likeClick);
  }
  _removeListenerToggleLike() {
    this._elementLike.removeEventListener('click', this._likeClick);
  }
  _addListeners() {
    this._addListenerRemoveCard();
    this._addListenerToggleLike();
    this._addListenerElementImage();
  }
  removeListeners() {
    this._removeListenerRemoveCard();
    this._removeListenerToggleLike();
    this._removeListenerElementImage();
  }
}
