export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  onError(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
    }
  }

  // /users/me
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET'
    })
      .then((response) => this.onError(response))
  }

  // /users/me
  setUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((response) => this.onError(response))
  }

  // /cards
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET'
    })
      .then((response) => this.onError(response))
  }

  // /cards
  addCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((response) => this.onError(response))
  }

  // /cards/*cardID*
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then((response) => this.onError(response))
  }

  // /cards/*cardID*/likes
  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
    .then((response) => this.onError(response))
  }

  // /cards/*cardID*/likes
  unlikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then((response) => this.onError(response))
  }

  // /users/me/avatar
  changeAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((response) => this.onError(response))
  }
}