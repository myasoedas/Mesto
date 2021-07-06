export class Card {
  constructor(data, cssClasses) {
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
    this._overlayPopupImage = this._page.querySelector(this._selectorOverlayPopupImage);
    this._popupImage = this._overlayPopupImage.querySelector(this._selectorPopupImage);
    this._popupCaption = this._overlayPopupImage.querySelector(this._selectorPopupCaption);
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
    this._removeListenerRemoveCard();
    this._removeListenerToggleLike();
  }
  _createPopupImage(evt) {
    const eventTarget = evt.target;
    this._popupImage.src = eventTarget.src;
    this._popupImage.alt = eventTarget.alt;
    this._popupCaption.textContent = eventTarget.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  }
  createCard() {
    this._elementImage.src = this._linkImage;
    this._elementImage.alt = this._titleAlt;
    this._elementsItem.querySelector(this._selectorElementTitle).textContent = this._titleImage;
    this._addListenerRemoveCard();
    this._addListenerToggleLike();
    return this._elementsItem;
  }
  //
  /*createCard(titleImage, titleAlt, linkImage) {
    this._elementImage.src = linkImage;
    this._elementImage.alt = titleAlt;
    this._elementsItem.querySelector(this._selectorElementTitle).textContent = titleImage;
    this._addListenerRemoveCard();
    this._addListenerToggleLike();
    return this._elementsItem;
  }*/

  _addListenerRemoveCard() {
    this._elementDelElement.addEventListener('click', (evt) => this._removeCard(evt));
  }
  _addListenerToggleLike() {
    this._elementLike.addEventListener('click', (evt) => this._toggleLike(evt));
  }

  _removeListenerRemoveCard() {
    this._elementDelElement.removeEventListener('click', (evt) => this._removeCard(evt));
  }
  _removeListenerToggleLike() {
    this._elementLike.removeEventListener('click', (evt) => this._toggleLike(evt));
  }
}
