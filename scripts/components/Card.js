export default class Card {
  constructor({data, cardSelectors}, handleCardClick) {
    this._imageTitle = data.placeName;
    this._imageAltTitle = data.placeAlt;
    this._imageSrc = data.placeSrc;
    this._selectorElementsItemTemplate = cardSelectors.elementsItemTemplate;
    this._selectorElementsItem = cardSelectors.elementsItem;
    this._selectorElementImage = cardSelectors.elementImage;
    this._selectorElementTitle = cardSelectors.elementTitle;
    this._selectorElementDelElement = cardSelectors.elementDelElement;
    this._selectorElementLike = cardSelectors.elementLike;
    this._selectorElementLikeStatusActive = cardSelectors.elementLikeStatusActive;
    this._selectorOverlayPopupImage = cardSelectors.overlayPopupImage;
    this._selectorPopupImage = cardSelectors.popupImage;
    this._selectorPopupCaption = cardSelectors.popupCaption;
    this._selectorOverlayIsOpened = cardSelectors.overlayIsOpened;
    this._elementsItemTemplate = document.querySelector(this._selectorElementsItemTemplate).content;
    this._elementsItem = this._elementsItemTemplate.querySelector(this._selectorElementsItem).cloneNode(true);
    this._elementImage = this._elementsItem.querySelector(this._selectorElementImage);
    this._elementDelElement = this._elementsItem.querySelector(this._selectorElementDelElement);
    this._elementLike = this._elementsItem.querySelector(this._selectorElementLike);
    this._handleCardClick = handleCardClick;
    this._cardClik = () => {this._handleCardClick(this._imageTitle, this._imageAltTitle, this._imageSrc)};
    this._delCard = (evt) => {this._removeCard(evt)};
    this._togLike = (evt) => {this._toggleLike(evt)};
  }

  _toggleLike(evt) {
    const eventTarget = evt.target;
    const selectorElementLikeStatusActive = this._selectorElementLikeStatusActive;
    eventTarget.classList.toggle(selectorElementLikeStatusActive);
  }
  _removeCard(evt) {
    const eventTarget = evt.target;
    const element = eventTarget.parentElement.parentElement;
    element.remove();
    this._removeListeners();
  }
  createCard() {
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
