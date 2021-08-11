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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }    
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {      
      return result;
    });    
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }    
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {      
      return result;
    });    
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }    
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {      
      return result;
    });      
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
    })
    .then((result) => {      
      return result;
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }    
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {      
      return result;
    });      
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }    
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {      
      return result;
    });
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }    
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {      
      return result;
    });    
  }
}

