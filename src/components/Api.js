const onError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
  }
}

export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  // /users/me
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET'
    })
      .then((response) => onError(response))
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
      .then((response) => onError(response))
  }

  // /cards
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET'
    })
      .then((response) => onError(response))
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
    .then((response) => onError(response))
  }

  // /cards/*cardID*
  deleteCard() {}

  // /cards/*cardID*
  likeCard() {}

  // /cards/*cardID*
  unlikeCard() {}

  // /users/me/avatar
  changeAvatar() {}
}