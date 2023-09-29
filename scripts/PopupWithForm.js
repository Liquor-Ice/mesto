import Popup from "./Popup"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
    this._form = super._popup.querySelector('popup__form')
  };

  _getInputValues() {
    this.inputList = Array.from(this._form.querySelectorAll('popup__input'));
    this.valuesList = this.inputList.map(item => {
      return item.value;
    });
  };

  close() {
    super.close();
    this._form.reset();
  };

  setEventListeners() {
    super.setEventListeners();

    super._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._getInputValues();
      this._submiter();
      this.close();
    });
  };
};