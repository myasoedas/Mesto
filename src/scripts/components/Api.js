import { Date } from "core-js";

export default class Api {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.authorization;
    this._contentTip = options.contentTip;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip,
      }
    })
    .then(this._getResponseData);
  }

  addCard(cardInfo) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip
      },
      body: JSON.stringify({
        link: cardInfo.placeSrc,
        name: cardInfo.placeName
      })
    })
    .then(this._getResponseData);
  }

  delCard(cardId) {
    const id = cardId;
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip,
      }
    })
    .then(this._getResponseData);
  }

  setLike(cardId) {
    const id = cardId;
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip,
      }
    })
    .then(this._getResponseData);
  }

  delLike(cardId) {
    const id = cardId;
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip,
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getProfile() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip,
      }
    })
    .then(this._getResponseData);
  }

  editProfileInfo(userInfo) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
    .then(this._getResponseData);
  }

  editProfileAvatar(userInfo) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip
      },
      body: JSON.stringify({
        avatar: userInfo.avatar
      })
    })
    .then(this._getResponseData);
  }
}

