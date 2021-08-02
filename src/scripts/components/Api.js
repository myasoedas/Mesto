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



}

