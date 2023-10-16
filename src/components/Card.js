export default class Card {
  constructor ({data, handleCardClick}, template) {
    this._templateSelector = template;
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._handleCardClick = handleCardClick;
  };

  //создаём элемент карточки в разметке
  _create() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  };

  //добавляем слушатели событий
  _setEventListeners() {
    //добавляем слушатель лайка
    this._like.addEventListener('click', () => {
      this._like.classList.toggle('card__like_liked');
    });
    //добавляем слушатель удаления
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._element.remove();
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
    this._image = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._text;
    this._image.src = this._link;
    this._image.alt = this._text;
    this._element.querySelector('.card__like-counter').textContent = this._likes;

    return this._element;
  };
};