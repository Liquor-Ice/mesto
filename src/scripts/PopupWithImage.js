import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(popupSelector).querySelector('.popup__image');
    this._subtitle = document.querySelector(popupSelector).querySelector('.popup__subtitle');
  };
  
  open(evt) {
    this._image.src = evt.target.src;
    this._image.alt = evt.target.alt;
    this._subtitle.textContent = evt.target.alt;
    super.open();
  };
};