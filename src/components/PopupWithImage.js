import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this.popup.querySelector('.popup__image');
    this._subtitle = this.popup.querySelector('.popup__subtitle');
  };
  
  open(text, link) {
    this._image.src = link;
    this._image.alt = text;
    this._subtitle.textContent = text;
    super.open();
  };
};