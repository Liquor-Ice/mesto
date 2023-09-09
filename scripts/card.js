import {popupImg, bigImage, imageSubt, openPopup} from './utils.js';

export class Card {
  constructor (text, link, template) {
    this._templateSelector = template;
    this._text = text;
    this._link = link;
  };

  //создаём элемент карточки в разметке
  _create() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
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
    //добавляем слушатель нажатия на картинку
    this._element.querySelector('.card__image').addEventListener('click', () => {
      imageSubt.textContent = this._text;
      bigImage.src = this._link;
      bigImage.alt = this._text;
      openPopup(popupImg);
    })
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