import { Date } from "core-js";

export default class Api {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.authorization;
    this._contentTip = options.contentTip;
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addCard(cardInfo) {
    fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip
      },
      body: JSON.stringify({
        link: cardInfo.placeSrc,
        name: cardInfo.placeName
      })
    });
  }

  delCard(cardId) {
    const id = cardId;
    console.log(`${this._url}cards/${id}`);
    fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip,
      }
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  editProfileInfo(userInfo) {
    fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    });

  }

  editProfileAvatar(userInfo) {
    fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentTip
      },
      body: JSON.stringify({
        avatar: userInfo.avatar
      })
    });

  }

}

