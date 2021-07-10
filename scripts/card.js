export class Card {
  constructor(data, cssClasses, handlerCardClick) {
    this._titleImage = data.titleImage;
    this._titleAlt = data.titleAlt;
    this._linkImage = data.linkImage;
    this._selectorPage = cssClasses.page;
    this._selectorElementsItemTemplate = cssClasses.elementsItemTemplate;
    this._selectorElementsItem = cssClasses.elementsItem;
    this._selectorElementImage = cssClasses.elementImage;
    this._selectorElementTitle = cssClasses.elementTitle;
    this._selectorElementDelElement = cssClasses.elementDelElement;
    this._selectorElementLike = cssClasses.elementLike;
    this._selectorElementLikeStatusActive = cssClasses.elementLikeStatusActive;
    this._selectorOverlayPopupImage = cssClasses.overlayPopupImage;
    this._selectorPopupImage = cssClasses.popupImage;
    this._selectorPopupCaption = cssClasses.popupCaption;
    this._selectorOverlayIsOpened = cssClasses.overlayIsOpened;
    this._page = document.querySelector(this._selectorPage);
    this._elementsItemTemplate = this._page.querySelector(this._selectorElementsItemTemplate).content;
    this._elementsItem = this._elementsItemTemplate.querySelector(this._selectorElementsItem).cloneNode(true);
    this._elementImage = this._elementsItem.querySelector(this._selectorElementImage);
    this._elementDelElement = this._elementsItem.querySelector(this._selectorElementDelElement);
    this._elementLike = this._elementsItem.querySelector(this._selectorElementLike);
    this._handlerCardClick = handlerCardClick;
  }

  _addEventListenerОpenPopupImage() {
    this._elementImage.addEventListener('click', openPopupImage);
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
  }
  createCard() {
    this._elementImage.src = this._linkImage;
    this._elementImage.alt = this._titleAlt;
    this._elementsItem.querySelector(this._selectorElementTitle).textContent = this._titleImage;
    this._addListenerRemoveCard();
    this._addListenerToggleLike();
    this._addListenerElementImage();
    return this._elementsItem;
  }
  _setHandlerCardClick() {
    return () => this._handlerCardClick(this._titleImage, this._titleAlt, this._linkImage);
  }
  _addListenerElementImage() {
    this._elementImage.addEventListener('click', this._setHandlerCardClick());
  }
  _setRemoveCard() {
    return (evt) => this._removeCard(evt);
  }
  _addListenerRemoveCard() {
    this._elementDelElement.addEventListener('click', this._setRemoveCard());
  }
  _setToggleLike() {
    return (evt) => this._toggleLike(evt);
  }
  _addListenerToggleLike() {
    this._elementLike.addEventListener('click', this._setToggleLike());
  }
}
