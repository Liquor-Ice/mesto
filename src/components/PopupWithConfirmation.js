import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {submiter}) {
    super(popupSelector);
    this._submiter = submiter;
    this._button = this.popup.querySelector('.popup__button');
  }

  open(card) {
    super.open();
    this._cardToBeDeleted = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._submiter(this._cardToBeDeleted)
    })
  }
}