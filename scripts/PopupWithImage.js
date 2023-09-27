import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = super._popup.querySelector('.popup__image');
    this._subtitle = super._popup.querySelector('.popup__subtitle');
  };
  
  open(evt) {
    this._image.src = evt.target.src;
    this._image.alt = evt.target.alt;
    this._subtitle.textContent = evt.target.alt;
    super.close();
  };
};