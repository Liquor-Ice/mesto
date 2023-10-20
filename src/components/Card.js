export default class Card {
  constructor ({data, handleCardClick, handleDelClick, handleLikeClick}, template) {
    this._templateSelector = template;
    this._likes = data.likes;
    this._text = data.name;
    this._link = data.link;
    this.id = data._id;
    this.ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDelClick = handleDelClick;
    this._handleLikeClick = handleLikeClick;
  };

  //создаём элемент карточки в разметке
  _create() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  };
  
  checkLikeStatus(userId) {
    return this._likes.find(likeItem => {
      return likeItem._id === userId
    })
  }

  _setLikeCounter(data) {
    this._likes = data
    this._likeCounter.textContent = this._likes.length;
  }

  setLikeStatus() {
    this._like.classList.toggle('card__like_liked')
  }

  setLike(cardItem) {
    this.setLikeStatus();
    this._setLikeCounter(cardItem.likes);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  trashRemove() {
    this._element.querySelector('.card__delete').remove()
  }

  //добавляем слушатели событий
  _setEventListeners() {
    //добавляем слушатель лайка
    this._like.addEventListener('click', () => {
      this._handleLikeClick();
    });
    //добавляем слушатель удаления
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDelClick();
    });
    //добавляем слушатель нажатия на картинку
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._text, this._link);
    });
  };

  //генерируем готовую карточку
  generate() {
    this._element = this._create();
    this._like = this._element.querySelector('.card__like');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._image = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._text;
    this._image.src = this._link;
    this._image.alt = this._text;
    this._setLikeCounter(this._likes);

    return this._element;
  };
};