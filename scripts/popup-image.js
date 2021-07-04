export default class {
  constructor(сard, cssClasses) {
    this._titleImage = data.titleImage;
    this._titleAlt = data.titleAlt;
    this._linkImage = data.linkImage;
    this._selectorElementsItemTemplate = cssClasses.elementsItemTemplate;
    this._selectorElementsItem = cssClasses.elementsItem;
    this._selectorElementImage = cssClasses.elementImage;
    this._selectorElementTitle = cssClasses.elementTitle;
    this._selectorElementDelElement = cssClasses.elementDelElement;
    this._selectorElementLike = cssClasses.elementLike;
    this._selectorElementLikeStatusActive = cssClasses.elementLikeStatusActive;
    this._elementsItemTemplate = document.querySelector(this._selectorElementsItemTemplate).content;
    this._elementsItem = this._elementsItemTemplate.querySelector(this._selectorElementsItem).cloneNode(true);
    this._elementImage = this._elementsItem.querySelector(this._selectorElementImage);
    this._elementDelElement = this._elementsItem.querySelector(this._selectorElementDelElement);
    this._elementLike = this._elementsItem.querySelector(this._selectorElementLike);
  }
}
