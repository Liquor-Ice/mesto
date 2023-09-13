export class Card {
  constructor (text, link, template) {
    this._templateSelector = template;
    this._text = text;
    this._link = link;
  };

  //создаём элемент карточки в разметке
  _create() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  };

  //добавляем слушатели событий
  _setEventListeners() {
    //добавляем слушатель лайка
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._element.querySelector('.card__like').classList.toggle('card__like_liked');
    });
    //добавляем слушатель удаления
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._element.remove();
    });
  };

  //генерируем готовую карточку
  generate() {
    this._element = this._create();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._text;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._text;

    return this._element;
  };
};