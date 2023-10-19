export default class Card {
  constructor ({data, handleCardClick, handleDelClick, handleLikeClick}, template) {
    this._templateSelector = template;
    this.likes = data.likes;
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

  //добавляем слушатели событий
  _setEventListeners() {
    //добавляем слушатель лайка
    this.like.addEventListener('click', () => {
      //this.like.classList.toggle('card__like_liked');
      this._handleLikeClick();
    });
    //добавляем слушатель удаления
    this.element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDelClick();
    });
    //добавляем слушатель нажатия на картинку
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._text, this._link);
    });
  };

  setLikeCounter(data) {
    this.likes = data
    this._likeCounter.textContent = this.likes.length;
  }

  //генерируем готовую карточку
  generate() {
    this.element = this._create();
    this.like = this.element.querySelector('.card__like');
    this._likeCounter = this.element.querySelector('.card__like-counter');
    this._image = this.element.querySelector('.card__image');
    this._setEventListeners();

    this.element.querySelector('.card__title').textContent = this._text;
    this._image.src = this._link;
    this._image.alt = this._text;
    this.setLikeCounter(this.likes);

    return this.element;
  };
};